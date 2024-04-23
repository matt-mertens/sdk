import type { User, SigningSession } from "./models";

export enum StorageKeys {
  CurrentUser = "@turnkey/current_user",
  CurrentSigningSession = "@turnkey/current_signing_session",
}

interface StorageValue {
  [StorageKeys.CurrentUser]: User;
  [StorageKeys.CurrentSigningSession]: SigningSession;
}

enum StorageLocation {
  Local = "local",
  Secure = "secure",
  Session = "session",
}

const STORAGE_VALUE_LOCATIONS: Record<StorageKeys, StorageLocation> = {
  [StorageKeys.CurrentUser]: StorageLocation.Local,
  [StorageKeys.CurrentSigningSession]: StorageLocation.Secure,
};

const STORAGE_LOCATIONS = {
  [StorageLocation.Local]: localStorage,
  [StorageLocation.Secure]: localStorage,
  [StorageLocation.Session]: localStorage,
};

export const getStorageValue = async <K extends StorageKeys>(
  storageKey: K
): Promise<StorageValue[K] | undefined> => {
  const storageLocation: StorageLocation = STORAGE_VALUE_LOCATIONS[storageKey];
  const browserStorageLocation: Storage = STORAGE_LOCATIONS[storageLocation];
  const storageItem = browserStorageLocation.getItem(storageKey);
  return storageItem ? JSON.parse(storageItem) : undefined;
};

export const setStorageValue = async <K extends StorageKeys>(
  storageKey: K,
  storageValue: StorageValue[K]
): Promise<any> => {
  const storageLocation: StorageLocation = STORAGE_VALUE_LOCATIONS[storageKey];
  const browserStorageLocation: Storage = STORAGE_LOCATIONS[storageLocation];
  browserStorageLocation.setItem(storageKey, JSON.stringify(storageValue));
};

export const removeStorageValue = async <K extends StorageKeys>(
  storageKey: K
): Promise<void> => {
  const storageLocation: StorageLocation = STORAGE_VALUE_LOCATIONS[storageKey];
  const browserStorageLocation: Storage = STORAGE_LOCATIONS[storageLocation];
  browserStorageLocation.removeItem(storageKey);
};
