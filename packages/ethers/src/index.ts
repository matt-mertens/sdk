import { ethers } from "ethers";
import { TurnkeyActivityError, TurnkeyRequestError } from "@turnkey/http";
import type { TurnkeyClient } from "@turnkey/http";
import type {
  BytesLike,
  TypedDataDomain,
  TypedDataField,
} from "ethers";

type TConfig = {
  /**
   * Turnkey client
   */
  client: TurnkeyClient;
  /**
   * Turnkey organization ID
   */
  organizationId: string;
  /**
   * Turnkey private key ID
   */
  privateKeyId: string;
};

export class TurnkeySigner extends ethers.AbstractSigner implements ethers.Signer {
  private readonly client: TurnkeyClient;

  public readonly organizationId: string;
  public readonly privateKeyId: string;

  constructor(config: TConfig, provider?: ethers.Provider) {
    super();

    if (provider != null) {
      ethers.defineProperties(this, { provider: provider } as { [K in keyof this]?: this[K]; });
    }

    this.client = config.client;

    this.organizationId = config.organizationId;
    this.privateKeyId = config.privateKeyId;
  }

  connect(provider: ethers.Provider): TurnkeySigner {
    return new TurnkeySigner(
      {
        client: this.client,
        organizationId: this.organizationId,
        privateKeyId: this.privateKeyId,
      },
      provider
    );
  }

  async getAddress(): Promise<string> {
    const data = await this.client.getPrivateKey({
      privateKeyId: this.privateKeyId,
      organizationId: this.organizationId,
    });

    const maybeAddress = data.privateKey.addresses.find(
      (item) => item.format === "ADDRESS_FORMAT_ETHEREUM"
    )?.address;

    if (typeof maybeAddress !== "string" || !maybeAddress) {
      throw new TurnkeyActivityError({
        message: `Unable to find Ethereum address for key ${this.privateKeyId} under organization ${this.organizationId}`,
      });
    }

    return maybeAddress;
  }

  private async _signTransactionImpl(message: string): Promise<string> {
    const { activity } = await this.client.signTransaction({
      type: "ACTIVITY_TYPE_SIGN_TRANSACTION",
      organizationId: this.organizationId,
      parameters: {
        privateKeyId: this.privateKeyId,
        type: "TRANSACTION_TYPE_ETHEREUM",
        unsignedTransaction: message,
      },
      timestampMs: String(Date.now()), // millisecond timestamp
    });

    const { id, status, type } = activity;

    if (activity.status === "ACTIVITY_STATUS_COMPLETED") {
      return assertNonNull(
        activity?.result?.signTransactionResult?.signedTransaction
      );
    }

    throw new TurnkeyActivityError({
      message: `Invalid activity status: ${activity.status}`,
      activityId: id,
      activityStatus: status,
      activityType: type,
    });
  }

  private async _signTransactionWithErrorWrapping(
    message: string
  ): Promise<string> {
    let signedTx: string;
    try {
      signedTx = await this._signTransactionImpl(message);
    } catch (error) {
      if (error instanceof TurnkeyActivityError) {
        throw error;
      }

      throw new TurnkeyActivityError({
        message: `Failed to sign: ${(error as Error).message}`,
        cause: error as Error,
      });
    }

    return signedTx;
  }

  async signTransaction(
    transaction: ethers.TransactionRequest
  ): Promise<string> {
    const unsignedTx = (await ethers.resolveProperties(
      transaction
    ));

    // Mimic the behavior of ethers' `Wallet`:
    // - You don't need to pass in `tx.from`
    // - However if you do provide `tx.from`, verify and drop it before serialization
    //
    // https://github.com/ethers-io/ethers.js/blob/e454afb2fa3612c273a09b154c36b35fafab17b1/lib.esm/wallet/base-wallet.js#L65-L66
    if (unsignedTx.from != null) {
      const selfAddress = await this.getAddress();
      if (ethers.getAddress(unsignedTx.from.toString()) !== selfAddress) {
        throw new Error(
          `Transaction \`tx.from\` address mismatch. Self address: ${selfAddress}; \`tx.from\` address: ${unsignedTx.from}`
        );
      }

      delete unsignedTx.from;
    }

    const serializedTx = ethers.Transaction.from(unsignedTx as ethers.Transaction).unsignedSerialized;
    const nonHexPrefixedSerializedTx = serializedTx.replace(/^0x/, "");
    const signedTx = await this._signTransactionWithErrorWrapping(
      nonHexPrefixedSerializedTx
    );
    return `0x${signedTx}`;
  }

  // Returns the signed prefixed-message. Per Ethers spec, this method treats:
  // - Bytes as a binary message
  // - string as a UTF8-message
  // i.e. "0x1234" is a SIX (6) byte string, NOT 2 bytes of data
  async signMessage(message: string | BytesLike): Promise<string> {
    const hashedMessage = ethers.hashMessage(message);
    const signedMessage = await this._signMessageWithErrorWrapping(
      hashedMessage
    );
    return `${signedMessage}`;
  }

  async _signMessageWithErrorWrapping(message: string): Promise<string> {
    let signedMessage: string;
    try {
      signedMessage = await this._signMessageImpl(message);
    } catch (error) {
      if (error instanceof TurnkeyActivityError) {
        throw error;
      }

      throw new TurnkeyActivityError({
        message: `Failed to sign: ${(error as Error).message}`,
        cause: error as Error,
      });
    }

    return signedMessage;
  }

  async _signMessageImpl(message: string): Promise<string> {
    const { activity } = await this.client.signRawPayload({
      type: "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD",
      organizationId: this.organizationId,
      parameters: {
        privateKeyId: this.privateKeyId,
        payload: message,
        encoding: "PAYLOAD_ENCODING_HEXADECIMAL",
        hashFunction: "HASH_FUNCTION_NO_OP",
      },
      timestampMs: String(Date.now()), // millisecond timestamp
    });

    const { id, status, type } = activity;

    if (activity.status === "ACTIVITY_STATUS_COMPLETED") {
      let result = assertNonNull(activity?.result?.signRawPayloadResult);

      let assembled = ethers.Signature.from({
        r: `0x${result.r}`,
        s: `0x${result.s}`,
        v: parseInt(result.v) + 27,
      }).serialized;

      // Assemble the hex
      return assertNonNull(assembled);
    }

    throw new TurnkeyActivityError({
      message: `Invalid activity status: ${activity.status}`,
      activityId: id,
      activityStatus: status,
      activityType: type,
    });
  }

  async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    // Populate any ENS names
    const populated = await ethers.TypedDataEncoder.resolveNames(
      domain,
      types,
      value,
      async (name: string) => {
        assertNonNull(this.provider);

        const address = await this.provider?.resolveName(name);
        assertNonNull(address);

        return address ?? "";
      }
    );

    return this._signMessageWithErrorWrapping(
      ethers.TypedDataEncoder.hash(populated.domain, types, populated.value)
    );
  }

  _signTypedData = this.signTypedData.bind(this);
}

export { TurnkeyActivityError, TurnkeyRequestError };

function assertNonNull<T>(input: T | null | undefined): T {
  if (input == null) {
    throw new Error(`Got unexpected ${JSON.stringify(input)}`);
  }

  return input;
}
