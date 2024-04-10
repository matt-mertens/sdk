export interface User {
  userId: string;
  username: string;
  organization: SubOrganization;
  readOnlySession?: ReadOnlySession;
}

export interface SubOrganization {
  organizationId: string;
  organizationName: string;
}

export interface ReadOnlySession {
  session: string;
  sessionExpiry: number;
}

export interface SigningSession {
  publicKey: string;
  privateKey: string;
  expiration: number;
}
