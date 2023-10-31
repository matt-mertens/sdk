import {
    TurnkeyClient,
    createActivityPoller,
    TurnkeyActivityError,
  } from "@turnkey/http";
  import { ApiKeyStamper } from "@turnkey/api-key-stamper";
  import * as crypto from "crypto";
  import { refineNonNull } from "./util";
  
  export async function createNewWallet() {
    console.log("creating a new wallet on Turnkey...\n");
  
    const walletName = `Wallet ${crypto.randomBytes(2).toString("hex")}`;
  
    try {
      const turnkeyClient = new TurnkeyClient(
        { baseUrl: process.env.BASE_URL! },
        new ApiKeyStamper({
          apiPublicKey: process.env.API_PUBLIC_KEY!,
          apiPrivateKey: process.env.API_PRIVATE_KEY!,
        })
      );
  
      const activityPoller = createActivityPoller({
        client: turnkeyClient,
        requestFn: turnkeyClient.createWallet,
      });
  
      const completedActivity = await activityPoller({
        type: "ACTIVITY_TYPE_CREATE_WALLET",
        timestampMs: String(Date.now()),
        organizationId: process.env.ORGANIZATION_ID!,
        parameters: {
          walletName,
          accounts: [
            {
              curve: "CURVE_SECP256K1",
              pathFormat: "PATH_FORMAT_BIP32",
              path: "m/44'/118'/0'/0/0",
              addressFormat: "ADDRESS_FORMAT_COSMOS",
            },
            {
                curve: "CURVE_SECP256K1",
                pathFormat: "PATH_FORMAT_BIP32",
                path: "m/44'/118'/0'/0/0",
                addressFormat: "ADDRESS_FORMAT_COMPRESSED",
              },
          ],
        },
      });
  
      const wallet = refineNonNull(completedActivity.result.createWalletResult);
      const walletId = refineNonNull(wallet.walletId);
      const address = refineNonNull(wallet.addresses[0]);
      const pubKey = refineNonNull(wallet.addresses[1]);
  
      // Success!
      console.log(
        [
          `New Cosmos address created!`,
          `- Name: ${walletName}`,
          `- Wallet ID: ${walletId}`,
          `- Address: ${address}`,
          `- Pubkey: ${pubKey}`,
          ``,
          "Now you can take the address and pubkey, put them in `.env.local`, then re-run the script.",
        ].join("\n")
      );
    } catch (error) {
      // If needed, you can read from `TurnkeyActivityError` to find out why the activity didn't succeed
      if (error instanceof TurnkeyActivityError) {
        throw error;
      }
  
      throw new TurnkeyActivityError({
        message: "Failed to create a new Ethereum wallet",
        cause: error as Error,
      });
    }
  }
  