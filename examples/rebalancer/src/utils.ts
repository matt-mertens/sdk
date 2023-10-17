import { BigNumberish, ethers } from "ethers";

// Environment
export enum Environment {
  GOERLI = "goerli",
  SEPOLIA = "sepolia",
  MAINNET = "mainnet",
}

const MAX_DECIMALS = 4;

export function findPrivateKeys(organization: any, tagName: string) {
  const tag = organization.tags?.find((tag: any) => {
    const isPrivateKeyTag = tag.tagType === "TAG_TYPE_PRIVATE_KEY";
    const isMatchingTag = tag.tagName === tagName;
    return isPrivateKeyTag && isMatchingTag;
  });

  const privateKeys = organization.privateKeys?.filter((privateKey: any) => {
    return privateKey.privateKeyTags.includes(tag!.tagId);
  });

  return privateKeys;
}

// fromReadableAmount converts whole amounts to atomic amounts
export function fromReadableAmount(
  amount: number,
  decimals: number
): BigNumberish {
  return ethers.parseUnits(amount.toString(), decimals);
}

// toReadableAmount converts atomic amounts to whole amounts
export function toReadableAmount(
  rawAmount: number | string,
  decimals: number,
  maxDecimals = MAX_DECIMALS
): string {
  return ethers.formatUnits(rawAmount, decimals).slice(0, maxDecimals);
}

// isKeyOfObject checks if a key exists within an object
export function isKeyOfObject<T>(
  key: string | number | symbol | undefined,
  obj: any
): key is keyof T {
  if (!key) return false;

  return key in obj;
}

export function print(header: string, body: string): void {
  console.log(`${header}\n\t${body}\n`);
}
