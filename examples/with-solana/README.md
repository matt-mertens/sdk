# Example: `with-solana`

This example walks through the following:

- Creation of a new Turnkey wallet with a new Solana account
- Monitoring of devnet tokens landing on that address
- Construction of a transaction sending the funds out with the `@turnkey/solana` signer

## Getting started

### 1/ Cloning the example

Make sure you have `Node.js` installed locally; we recommend using Node v16+.

```bash
$ git clone https://github.com/tkhq/sdk
$ cd sdk/
$ corepack enable  # Install `pnpm`
$ pnpm install -r  # Install dependencies
$ pnpm run build-all  # Compile source code
$ cd examples/with-solana/
```

### 2/ Setting up Turnkey

The first step is to set up your Turnkey organization. By following the [Quickstart](https://docs.turnkey.com/getting-started/quickstart) guide, you should have:

- A public/private API key pair for Turnkey
- An organization ID

Once you've gathered these values, add them to a new `.env.local` file. Notice that your private key should be securely managed and **_never_** be committed to git.

```bash
$ cp .env.local.example .env.local
```

Now open `.env.local` and add the missing environment variables:

- `API_PUBLIC_KEY`
- `API_PRIVATE_KEY`
- `BASE_URL`
- `ORGANIZATION_ID`

You can specify an existing Turnkey Solana address if you have one already:

```
SOLANA_ADDRESS=<your Turnkey Solana address>
```

Note that this is optional: the script gives you a fresh one if you don't specify one in your `.env.local` file

### 3/ Running the script

```bash
$ pnpm start
```

You should see output similar to the following:

```
creating a new Solana wallet in your Turnkey organization...

New Solana wallet created!
- Name: Solana Wallet 6527
- Wallet ID: 7f0f7d49-22e3-5b34-8192-db3df83a0759
- Solana address: G6fEj2pt4YYAxLS8JAsY5BL6hea7Fpe8Xyqscg2e7pgp

Your new Solana address: "G6fEj2pt4YYAxLS8JAsY5BL6hea7Fpe8Xyqscg2e7pgp"

💸 Your onchain balance is at 0! To continue this demo you'll need devnet funds! You can use:
- The faucet in this example: `pnpm run faucet`
- The official Solana CLI: `solana airdrop 1 G6fEj2pt4YYAxLS8JAsY5BL6hea7Fpe8Xyqscg2e7pgp`
- Any online faucet (e.g. https://faucet.triangleplatform.com/solana/devnet)

To check your balance: https://explorer.solana.com/address/G6fEj2pt4YYAxLS8JAsY5BL6hea7Fpe8Xyqscg2e7pgp?cluster=devnet

--------
Using existing Solana address from ENV: "G6fEj2pt4YYAxLS8JAsY5BL6hea7Fpe8Xyqscg2e7pgp"
? Destination address: tkhqC9QX2gkqJtUFk2QKhBmQfFyyqZXSpr73VFRi35C
? Amount (in Lamports) to send to tkhqC9QX2gkqJtUFk2QKhBmQfFyyqZXSpr73VFRi35C: 100

Turnkey-powered signature:
        4W4X5wVzpPhCHQ8LeR18icfUYs7FdHQ6uTfkQ7E6jciuv9NQ6pZnyYj2veaeZoD5co3nz1gzBdZ2v6c4LXLjiTBm

Transaction broadcast and confirmed! 🎉
        https://explorer.solana.com/tx/3Wr1vmSwqf7jPJXzgqA3fGfELdTfiR8v86sRiTJxNYT4KYEcadQjceFsN8BoHQZqb6mnuqsJsgHdk6i8Sj8YtmVr?cluster=devnet
```

Enjoy!
