import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from `.env.local`
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { TurnkeySigner } from "@turnkey/ethers";
import { ethers } from "ethers";
import { TurnkeyClient } from "@turnkey/http";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { createNewEthereumPrivateKey } from "./createNewEthereumPrivateKey";
import { print } from "./util";

async function main() {
  if (!process.env.PRIVATE_KEY_ID) {
    // If you don't specify a `PRIVATE_KEY_ID`, we'll create one for you via calling the Turnkey API.
    await createNewEthereumPrivateKey();
    return;
  }

  const turnkeyClient = new TurnkeyClient(
    {
      baseUrl: process.env.BASE_URL!,
    },
    new ApiKeyStamper({
      apiPublicKey: process.env.API_PUBLIC_KEY!,
      apiPrivateKey: process.env.API_PRIVATE_KEY!,
    })
  );

  // Initialize a Turnkey Signer
  const turnkeySigner = new TurnkeySigner({
    client: turnkeyClient,
    organizationId: process.env.ORGANIZATION_ID!,
    privateKeyId: process.env.PRIVATE_KEY_ID!,
  });

  // Bring your own provider (such as Alchemy or Infura: https://docs.ethers.org/v6/api/providers/)
  const network = "goerli";
  const provider = new ethers.InfuraProvider(network);
  const connectedSigner = turnkeySigner.connect(provider);
  const connectedNetwork = await provider.getNetwork();

  const chainId = connectedNetwork.chainId;
  const address = await connectedSigner.getAddress();
  const balance = await provider.getBalance(address);
  const transactionCount = await connectedSigner.getNonce();

  print("Network:", `${network} (chain ID ${chainId})`);
  print("Address:", address);
  print("Balance:", `${ethers.formatEther(balance)} Ether`);
  print("Transaction count:", `${transactionCount}`);

  if (balance === 0n) {
    let warningMessage =
      "The transactions won't be broadcasted because your account balance is zero.\n";
    if (network === "goerli") {
      warningMessage +=
        "Use https://goerlifaucet.com/ to request funds on Goerli, then run the script again.\n";
    }

    console.warn(warningMessage);
    return;
  }

  // Create 5 simple send transactions sequentially in a blocking manner
  for (let i = 0; i < 5; i++) {
    const transactionAmount = "0";
    const destinationAddress = "0x2Ad9eA1E677949a536A270CEC812D6e868C88108";
    const transactionRequest = {
      to: destinationAddress,
      value: ethers.parseEther(transactionAmount),
      type: 2,
      nonce: transactionCount + i, // manually specify the nonce
    };

    const sendTx = await connectedSigner.sendTransaction(transactionRequest);

    print(
      `Sent ${ethers.formatEther(sendTx.value)} Ether to ${sendTx.to}:`,
      `https://${network}.etherscan.io/tx/${sendTx.hash}`
    );

    // Wait for a block confirmation before proceeding
    await connectedSigner.provider?.waitForTransaction(sendTx.hash, 1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
