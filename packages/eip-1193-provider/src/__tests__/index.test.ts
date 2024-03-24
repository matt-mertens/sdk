import 'dotenv/config';

import {
  type Address,
  type Index,
  type Quantity,
  type TransactionRequestEIP1559,
  getAddress,
  numberToHex,
  parseEther,
  parseGwei,
  recoverAddress,
  stringToHex,
  verifyTypedData,
  type EIP1474Methods,
  toHex,
  ProviderDisconnectedError,
  MethodNotSupportedRpcError,
} from 'viem';
import { sepolia } from 'viem/chains';
import { beforeEach, describe, it, expect, jest } from '@jest/globals';
import { createEIP1193Provider } from '../';
import { TurnkeyClient } from '@turnkey/http';
import type { UUID } from 'crypto';
import type { TurnkeyEIP1193Provider } from '../types';
import { ApiKeyStamper } from '@turnkey/api-key-stamper';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WALLET_ID: UUID;
      ORGANIZATION_ID: UUID;
      TURNKEY_API_PUBLIC_KEY: string;
      TURNKEY_API_PRIVATE_KEY: string;
      PUBLIC_RPC_URL: string;
      EXPECTED_WALLET_ADDRESS: Address;
    }
  }
}

const ORG_ID = process.env.ORGANIZATION_ID;
const WALLET_ID = process.env.WALLET_ID;
const TURNKEY_API_PUBLIC_KEY = process.env.API_PUBLIC_KEY ?? '';
const TURNKEY_API_PRIVATE_KEY = process.env.API_PRIVATE_KEY ?? '';
const EXPECTED_WALLET_ADDRESS: Address =
  process.env.EXPECTED_WALLET_ADDRESS ?? '';
const RPC_URL = process.env.PUBLIC_RPC_URL;
const RECEIVER_ADDRESS: Address = '0x6f85Eb534E14D605d4e82bF97ddF59c18F686699';

describe('Test Turnkey EIP-1193 Provider', () => {
  let turnkeyClient: TurnkeyClient;
  let eip1193Provider: TurnkeyEIP1193Provider;

  beforeEach(async () => {
    turnkeyClient = new TurnkeyClient(
      { baseUrl: 'https://api.turnkey.com' },
      new ApiKeyStamper({
        apiPublicKey: TURNKEY_API_PUBLIC_KEY,
        apiPrivateKey: TURNKEY_API_PRIVATE_KEY,
      })
    );
  });
  let defaultChain = {
    chainName: sepolia.name,
    chainId: toHex(sepolia.id),
    rpcUrls: [RPC_URL],
  };
  const getEIP1193Provider = (chain = defaultChain) =>
    createEIP1193Provider({
      walletId: WALLET_ID,
      organizationId: ORG_ID,
      turnkeyClient,
      chains: [chain],
    });
  describe('Connectivity Logic', () => {
    it('should emit connected when successfully connected', async () => {
      const provider = await getEIP1193Provider();
      const onConnected = jest.fn();
      provider.on('connect', (connectionInfo) => {
        expect(connectionInfo.chainId).toEqual(defaultChain.chainId);
        onConnected();
      });

      await provider.request({ method: 'eth_blockNumber' });

      expect(onConnected).toHaveBeenCalled();
    });

    it('should emit disconnected when connectivity is lost', async () => {
      // Define a chain configuration with a valid RPC URL initially
      const chain = {
        chainName: sepolia.name,
        chainId: toHex(sepolia.id),
        rpcUrls: [RPC_URL],
      };
      // Create an EIP1193 provider instance configured for the specified chain
      const provider = await getEIP1193Provider(chain);

      // Setup a mock function to track the 'disconnect' event
      const onDisconnected = jest.fn();
      provider.on('disconnect', (error) => {
        expect(error).toBeInstanceOf(ProviderDisconnectedError); // Assert that the error is an instance of ProviderDisconnectedError
        onDisconnected(); // Record the disconnect event occurrence
      });

      // Change the RPC URL to an invalid one to simulate connectivity loss
      chain.rpcUrls[0] = 'https://invalid.rpc.url';

      // Attempt to make a request which should fail due to the invalid RPC URL
      await provider.request({ method: 'eth_blockNumber' }).catch(() => {});
    });

    it('should not emit connected if already connected', async () => {
      const provider = await getEIP1193Provider();
      const onConnected = jest.fn();
      provider.on('connect', onConnected);

      // Assuming the provider is already connected from previous tests
      await provider.request({ method: 'eth_blockNumber' });

      // The connected event should not be called again since it's already connected
      expect(onConnected).not.toHaveBeenCalledTimes(2);
    });

    it('should not emit disconnected if already disconnected', async () => {
      const chain = {
        chainName: sepolia.name,
        chainId: toHex(sepolia.id),
        rpcUrls: [RPC_URL],
      };
      // Create an EIP1193 provider instance configured for the specified chain
      const provider = await getEIP1193Provider(chain);

      // Setup a mock function to track the 'disconnect' event
      const onDisconnected = jest.fn();
      provider.on('disconnect', (error) => {
        expect(error).toBeInstanceOf(ProviderDisconnectedError); // Assert that the error is an instance of ProviderDisconnectedError
        onDisconnected(); // Record the disconnect event occurrence
      });

      // Change the RPC URL to an invalid one to simulate connectivity loss
      chain.rpcUrls[0] = 'https://invalid.rpc.url';

      // First call to simulate initial connectivity loss
      await provider.request({ method: 'eth_blockNumber' }).catch(() => {});

      // Second call to simulate subsequent check while already disconnected
      await provider.request({ method: 'eth_blockNumber' }).catch(() => {});

      // The disconnected event should not be called again since it's already disconnected
      expect(onDisconnected).toHaveBeenCalledTimes(1);
    });
  });

  // This section of tests is dedicated to verifying the functionality of the Turnkey EIP-1193 Provider.
  // It includes tests for supported wallet methods such as account retrieval and signing,
  // as well as public RPC methods like retrieving the current block number and chain ID.
  // Additionally, it tests for the proper handling of unsupported methods, ensuring they throw the expected errors.
  describe('Test EIP-1193 Provider Methods', () => {
    beforeEach(async () => {
      eip1193Provider = await createEIP1193Provider({
        walletId: WALLET_ID,
        organizationId: ORG_ID,
        turnkeyClient,
        chains: [
          {
            chainName: sepolia.name,
            chainId: toHex(sepolia.id),
            rpcUrls: [RPC_URL],
          },
        ],
      });
    });
    describe('Supported Methods', () => {
      describe('EIP-1193 Wallet Methods', () => {
        describe('eth_requestAccounts', () => {
          it("should request accounts associated with the user's wallet", async () => {
            const accounts = await eip1193Provider.request({
              method: 'eth_requestAccounts',
            });
            expect(Array.isArray(accounts)).toBeTruthy();
            expect(accounts).toHaveLength(1);
            expect(accounts).toContain(EXPECTED_WALLET_ADDRESS);
          });
        });
        describe('eth_accounts', () => {
          it("get accounts should be empty if 'eth_requestAccounts' has not been called", async () => {
            const accounts = await eip1193Provider?.request({
              method: 'eth_accounts',
            });
            expect(accounts).not.toBeUndefined();
            expect(Array.isArray(accounts)).toBeTruthy();
            expect(accounts.length).toBe(0);
          });
          it("should get accounts associated with the user's wallet", async () => {
            await eip1193Provider.request({
              method: 'eth_requestAccounts',
            });
            const accounts = await eip1193Provider?.request({
              method: 'eth_accounts',
            });
            expect(accounts).not.toBeUndefined();
            expect(Array.isArray(accounts)).toBeTruthy();
            expect(accounts.length).toBeGreaterThan(0);
            expect(accounts).toContain(EXPECTED_WALLET_ADDRESS);
          });
        });
        describe('eth_sign/person_sign', () => {
          it('should sign a message', async () => {
            const messageDigest = stringToHex('A man, a plan, a canal, Panama');
            const signerAddress = EXPECTED_WALLET_ADDRESS;
            const signature = await eip1193Provider?.request({
              method: 'personal_sign',
              params: [signerAddress, messageDigest],
            });
            expect(signature).not.toBeUndefined();
            expect(signature).not.toBe('');
            const address = await recoverAddress({
              hash: messageDigest,
              signature: signature!,
            });
            expect(getAddress(address)).toBe(getAddress(signerAddress));
            expect(signature).toMatch(/^0x.*$/);
          });
        });
        describe('eth_signTypedData_v4', () => {
          it('should sign typed data according to EIP-712', async () => {
            const address = EXPECTED_WALLET_ADDRESS;
            // Test typed data signing (EIP-712)
            // All properties on a domain are optional
            const domain = {
              name: 'Ether Mail',
              version: '1',
              chainId: 1,
              verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            } as const;

            // The named list of all type definitions
            const types = {
              Person: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
              ],
              Mail: [
                { name: 'from', type: 'Person' },
                { name: 'to', type: 'Person' },
                { name: 'contents', type: 'string' },
              ],
            } as const;
            const primaryType = 'Mail';
            const message = {
              from: {
                name: 'Cow',
                wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
              },
              to: {
                name: 'Bob',
                wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              },
              contents: 'Hello, Bob!',
            } as const;
            const typedData = {
              address,
              domain,
              types,
              primaryType,
              message,
            } as const;

            const signature = await eip1193Provider?.request({
              method: 'eth_signTypedData_v4',
              params: [EXPECTED_WALLET_ADDRESS, typedData],
            });

            const valid = await verifyTypedData({
              address: EXPECTED_WALLET_ADDRESS,
              domain,
              types,
              primaryType,
              message,
              signature,
            });

            expect(valid).toBeTruthy();
            expect(signature).not.toBeNull();
            expect(signature).not.toBe('');
            expect(signature).toMatch(/^0x[a-fA-F0-9]+$/);
          });
        });
        describe('eth_signTransaction', () => {
          it('should sign a transaction', async () => {
            const from = EXPECTED_WALLET_ADDRESS;
            const to = RECEIVER_ADDRESS;

            const signature = await eip1193Provider?.request({
              method: 'eth_signTransaction',
              params: [
                {
                  from,
                  to,
                  value: numberToHex(parseEther('0.001')),
                  chainId: numberToHex(sepolia.id),
                  nonce: numberToHex(0),
                  gas: numberToHex(21000n),
                  maxFeePerGas: numberToHex(parseGwei('20')),
                  maxPriorityFeePerGas: numberToHex(parseGwei('2')),
                  type: '0x2',
                } as TransactionRequestEIP1559<Quantity, Index, '0x2'>,
              ],
            });
            expect(signature).toBeDefined();
            expect(signature).not.toBe('');
            expect(signature).toMatch(/^0x[a-fA-F0-9]+$/);
          });
        });
        describe('eth_getBlockByNumber', () => {
          it('should get blocknumber using the underlying RPC provider', async () => {
            const blockNumber = await eip1193Provider?.request({
              method: 'eth_blockNumber',
            });
            expect(blockNumber).not.toBeUndefined();
            expect(blockNumber).not.toBe('');
            expect(blockNumber).toMatch(/^0x.*$/);
          });
        });
        describe('web3_clientVersion', () => {
          it('should return the version of the client matching package.json version', async () => {
            const pkg = await import('./../../package.json');
            const version = await eip1193Provider?.request({
              method: 'web3_clientVersion',
            });
            const expectedVersion = `${pkg.name}@${pkg.version}`;
            expect(version).toBeDefined();
            expect(version).toBe(expectedVersion);
          });
        });
      });

      describe('Public RPC Methods', () => {
        describe('eth_chainId', () => {
          it('should get the correct chain id using the underlying RPC provider', async () => {
            const chainId = await eip1193Provider?.request({
              method: 'eth_chainId',
            });
            expect(chainId).not.toBeUndefined();
            expect(chainId).toMatch(/^0x.*$/);
            expect(parseInt(chainId!, 16)).toBe(sepolia.id);
          });
        });
      });
    });
    describe('Unsupported Methods', () => {
      const unsupportedMethods = [
        'wallet_getPermissions',
        'wallet_requestPermissions',
        'wallet_revokePermissions',
        'wallet_registerOnboarding',
        'wallet_watchAsset',
        'wallet_scanQRCode',
        'wallet_getSnaps',
        'wallet_requestSnaps',
        'wallet_snap',
        'wallet_invokeSnap',
        'eth_decrypt',
        'eth_getEncryptionPublicKey',
      ];

      unsupportedMethods.forEach((method) => {
        it(`should throw a Method not supported error for ${method}`, async () => {
          await expect(
            eip1193Provider?.request({
              method: method as EIP1474Methods[0]['Method'],
            })
          ).rejects.toThrow(MethodNotSupportedRpcError);
        });
      });
    });
  });
});
