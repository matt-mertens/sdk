/* @generated by codegen. DO NOT EDIT BY HAND */

import { GrpcStatus, TurnkeyRequestError, ActivityResponse, TurnkeySDKClientConfig } from "../__types__/base";

import { VERSION } from "../__generated__/version";

import type * as SdkApiTypes from "./sdk_api_types";

import { StorageKeys, getStorageValue } from "../storage";


export class TurnkeySDKClientBase {
  config: TurnkeySDKClientConfig;

  constructor(config: TurnkeySDKClientConfig) {
    this.config = config;
  }

  async request<TBodyType, TResponseType>(
    url: string,
    body: TBodyType
  ): Promise<TResponseType> {
    const fullUrl = this.config.apiBaseUrl + url;
    const stringifiedBody = JSON.stringify(body);
    const stamp = await this.config.stamper.stamp(stringifiedBody);

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        [stamp.stampHeaderName]: stamp.stampHeaderValue,
        "X-Client-Version": VERSION
      },
      body: stringifiedBody,
      redirect: "follow"
    });

    if (!response.ok) {
      let res: GrpcStatus;
      try {
        res = await response.json();
      } catch (_) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      throw new TurnkeyRequestError(res);
    }

    const data = await response.json();
    return data as TResponseType;
  }

  async command<TBodyType, TResponseType>(
    url: string,
    body: TBodyType
  ): Promise<TResponseType> {
    const POLLING_DURATION = this.config.activityPoller?.duration ?? 1000;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const initialData = await this.request<TBodyType, TResponseType>(url, body) as ActivityResponse;
    const activityId = initialData["activity"]["id"];
    let activityStatus = initialData["activity"]["status"];

    if (activityStatus !== "ACTIVITY_STATUS_PENDING") {
      return initialData as TResponseType;
      // TODO: return initialData["activity"]["result"][`${methodName}Result`];
    }

    const pollStatus = async (): Promise<TResponseType> => {
      const pollBody = { activityId: activityId };
      const pollData = await this.getActivity(pollBody) as ActivityResponse;
      const activityStatus = pollData["activity"]["status"];

      if (activityStatus === "ACTIVITY_STATUS_PENDING") {
        await delay(POLLING_DURATION);
        return await pollStatus();
      } else {
        return pollData as TResponseType;
        // TODO: return pollData["activity"]["result"][`${methodName}Result`];
      }
    }

    return await pollStatus();
  }

  async activityDecision<TBodyType, TResponseType>(
    url: string,
    body: TBodyType
  ): Promise<TResponseType> {
    const data: TResponseType = await this.request(url, body);
    return data;
    // TODO: return data["activity"]["result"];
  }

  


	getActivity = async (input: SdkApiTypes.TGetActivityBody): Promise<SdkApiTypes.TGetActivityResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_activity", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getApiKey = async (input: SdkApiTypes.TGetApiKeyBody): Promise<SdkApiTypes.TGetApiKeyResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_api_key", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getApiKeys = async (input: SdkApiTypes.TGetApiKeysBody = {}): Promise<SdkApiTypes.TGetApiKeysResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_api_keys", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getAuthenticator = async (input: SdkApiTypes.TGetAuthenticatorBody): Promise<SdkApiTypes.TGetAuthenticatorResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_authenticator", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getAuthenticators = async (input: SdkApiTypes.TGetAuthenticatorsBody): Promise<SdkApiTypes.TGetAuthenticatorsResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_authenticators", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getOrganization = async (input: SdkApiTypes.TGetOrganizationBody = {}): Promise<SdkApiTypes.TGetOrganizationResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_organization", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getPolicy = async (input: SdkApiTypes.TGetPolicyBody): Promise<SdkApiTypes.TGetPolicyResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_policy", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getPrivateKey = async (input: SdkApiTypes.TGetPrivateKeyBody): Promise<SdkApiTypes.TGetPrivateKeyResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_private_key", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getUser = async (input: SdkApiTypes.TGetUserBody): Promise<SdkApiTypes.TGetUserResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_user", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getWallet = async (input: SdkApiTypes.TGetWalletBody): Promise<SdkApiTypes.TGetWalletResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/get_wallet", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getActivities = async (input: SdkApiTypes.TGetActivitiesBody = {}): Promise<SdkApiTypes.TGetActivitiesResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_activities", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getPolicies = async (input: SdkApiTypes.TGetPoliciesBody = {}): Promise<SdkApiTypes.TGetPoliciesResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_policies", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	listPrivateKeyTags = async (input: SdkApiTypes.TListPrivateKeyTagsBody): Promise<SdkApiTypes.TListPrivateKeyTagsResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_private_key_tags", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getPrivateKeys = async (input: SdkApiTypes.TGetPrivateKeysBody = {}): Promise<SdkApiTypes.TGetPrivateKeysResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_private_keys", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getSubOrgIds = async (input: SdkApiTypes.TGetSubOrgIdsBody = {}): Promise<SdkApiTypes.TGetSubOrgIdsResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_suborgs", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	listUserTags = async (input: SdkApiTypes.TListUserTagsBody = {}): Promise<SdkApiTypes.TListUserTagsResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_user_tags", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getUsers = async (input: SdkApiTypes.TGetUsersBody = {}): Promise<SdkApiTypes.TGetUsersResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_users", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getWalletAccounts = async (input: SdkApiTypes.TGetWalletAccountsBody): Promise<SdkApiTypes.TGetWalletAccountsResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_wallet_accounts", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getWallets = async (input: SdkApiTypes.TGetWalletsBody = {}): Promise<SdkApiTypes.TGetWalletsResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/list_wallets", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	getWhoami = async (input: SdkApiTypes.TGetWhoamiBody = {}): Promise<SdkApiTypes.TGetWhoamiResponse> => {
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.request("/public/v1/query/whoami", {
      ...input,
      organizationId: input.organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId)
    });
  }


	approveActivity = async (input: SdkApiTypes.TApproveActivityBody): Promise<SdkApiTypes.TApproveActivityResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.activityDecision("/public/v1/submit/approve_activity", {
        parameters: rest,
        organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
        timestampMs: timestampMs ?? String(Date.now()),
        type: type ?? "ACTIVITY_TYPE_APPROVE_ACTIVITY"
      });
  }


	createApiKeys = async (input: SdkApiTypes.TCreateApiKeysBody): Promise<SdkApiTypes.TCreateApiKeysResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_api_keys", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_API_KEYS"
    });
  }


	createApiOnlyUsers = async (input: SdkApiTypes.TCreateApiOnlyUsersBody): Promise<SdkApiTypes.TCreateApiOnlyUsersResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_api_only_users", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_API_ONLY_USERS"
    });
  }


	createAuthenticators = async (input: SdkApiTypes.TCreateAuthenticatorsBody): Promise<SdkApiTypes.TCreateAuthenticatorsResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_authenticators", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_AUTHENTICATORS_V2"
    });
  }


	createInvitations = async (input: SdkApiTypes.TCreateInvitationsBody): Promise<SdkApiTypes.TCreateInvitationsResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_invitations", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_INVITATIONS"
    });
  }


	createPolicy = async (input: SdkApiTypes.TCreatePolicyBody): Promise<SdkApiTypes.TCreatePolicyResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_policy", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_POLICY_V3"
    });
  }


	createPrivateKeyTag = async (input: SdkApiTypes.TCreatePrivateKeyTagBody): Promise<SdkApiTypes.TCreatePrivateKeyTagResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_private_key_tag", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_PRIVATE_KEY_TAG"
    });
  }


	createPrivateKeys = async (input: SdkApiTypes.TCreatePrivateKeysBody): Promise<SdkApiTypes.TCreatePrivateKeysResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_private_keys", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_PRIVATE_KEYS_V2"
    });
  }


	createSubOrganization = async (input: SdkApiTypes.TCreateSubOrganizationBody): Promise<SdkApiTypes.TCreateSubOrganizationResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_sub_organization", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V4"
    });
  }


	createUserTag = async (input: SdkApiTypes.TCreateUserTagBody): Promise<SdkApiTypes.TCreateUserTagResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_user_tag", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_USER_TAG"
    });
  }


	createUsers = async (input: SdkApiTypes.TCreateUsersBody): Promise<SdkApiTypes.TCreateUsersResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_users", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_USERS_V2"
    });
  }


	createWallet = async (input: SdkApiTypes.TCreateWalletBody): Promise<SdkApiTypes.TCreateWalletResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_wallet", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_WALLET"
    });
  }


	createWalletAccounts = async (input: SdkApiTypes.TCreateWalletAccountsBody): Promise<SdkApiTypes.TCreateWalletAccountsResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/create_wallet_accounts", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_CREATE_WALLET_ACCOUNTS"
    });
  }


	deleteApiKeys = async (input: SdkApiTypes.TDeleteApiKeysBody): Promise<SdkApiTypes.TDeleteApiKeysResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/delete_api_keys", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_DELETE_API_KEYS"
    });
  }


	deleteAuthenticators = async (input: SdkApiTypes.TDeleteAuthenticatorsBody): Promise<SdkApiTypes.TDeleteAuthenticatorsResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/delete_authenticators", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_DELETE_AUTHENTICATORS"
    });
  }


	deleteInvitation = async (input: SdkApiTypes.TDeleteInvitationBody): Promise<SdkApiTypes.TDeleteInvitationResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/delete_invitation", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_DELETE_INVITATION"
    });
  }


	deletePolicy = async (input: SdkApiTypes.TDeletePolicyBody): Promise<SdkApiTypes.TDeletePolicyResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/delete_policy", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_DELETE_POLICY"
    });
  }


	deletePrivateKeyTags = async (input: SdkApiTypes.TDeletePrivateKeyTagsBody): Promise<SdkApiTypes.TDeletePrivateKeyTagsResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/delete_private_key_tags", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_DELETE_PRIVATE_KEY_TAGS"
    });
  }


	deleteUserTags = async (input: SdkApiTypes.TDeleteUserTagsBody): Promise<SdkApiTypes.TDeleteUserTagsResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/delete_user_tags", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_DELETE_USER_TAGS"
    });
  }


	deleteUsers = async (input: SdkApiTypes.TDeleteUsersBody): Promise<SdkApiTypes.TDeleteUsersResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/delete_users", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_DELETE_USERS"
    });
  }


	emailAuth = async (input: SdkApiTypes.TEmailAuthBody): Promise<SdkApiTypes.TEmailAuthResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/email_auth", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_EMAIL_AUTH"
    });
  }


	exportPrivateKey = async (input: SdkApiTypes.TExportPrivateKeyBody): Promise<SdkApiTypes.TExportPrivateKeyResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/export_private_key", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_EXPORT_PRIVATE_KEY"
    });
  }


	exportWallet = async (input: SdkApiTypes.TExportWalletBody): Promise<SdkApiTypes.TExportWalletResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/export_wallet", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_EXPORT_WALLET"
    });
  }


	exportWalletAccount = async (input: SdkApiTypes.TExportWalletAccountBody): Promise<SdkApiTypes.TExportWalletAccountResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/export_wallet_account", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_EXPORT_WALLET_ACCOUNT"
    });
  }


	importWallet = async (input: SdkApiTypes.TImportWalletBody): Promise<SdkApiTypes.TImportWalletResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/import_wallet", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_IMPORT_WALLET"
    });
  }


	initImportPrivateKey = async (input: SdkApiTypes.TInitImportPrivateKeyBody): Promise<SdkApiTypes.TInitImportPrivateKeyResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/init_import_private_key", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_INIT_IMPORT_PRIVATE_KEY"
    });
  }


	initImportWallet = async (input: SdkApiTypes.TInitImportWalletBody): Promise<SdkApiTypes.TInitImportWalletResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/init_import_wallet", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_INIT_IMPORT_WALLET"
    });
  }


	initUserEmailRecovery = async (input: SdkApiTypes.TInitUserEmailRecoveryBody): Promise<SdkApiTypes.TInitUserEmailRecoveryResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/init_user_email_recovery", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_INIT_USER_EMAIL_RECOVERY"
    });
  }


	recoverUser = async (input: SdkApiTypes.TRecoverUserBody): Promise<SdkApiTypes.TRecoverUserResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/recover_user", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_RECOVER_USER"
    });
  }


	rejectActivity = async (input: SdkApiTypes.TRejectActivityBody): Promise<SdkApiTypes.TRejectActivityResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.activityDecision("/public/v1/submit/reject_activity", {
        parameters: rest,
        organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
        timestampMs: timestampMs ?? String(Date.now()),
        type: type ?? "ACTIVITY_TYPE_REJECT_ACTIVITY"
      });
  }


	removeOrganizationFeature = async (input: SdkApiTypes.TRemoveOrganizationFeatureBody): Promise<SdkApiTypes.TRemoveOrganizationFeatureResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/remove_organization_feature", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_REMOVE_ORGANIZATION_FEATURE"
    });
  }


	setOrganizationFeature = async (input: SdkApiTypes.TSetOrganizationFeatureBody): Promise<SdkApiTypes.TSetOrganizationFeatureResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/set_organization_feature", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_SET_ORGANIZATION_FEATURE"
    });
  }


	signRawPayload = async (input: SdkApiTypes.TSignRawPayloadBody): Promise<SdkApiTypes.TSignRawPayloadResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/sign_raw_payload", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD_V2"
    });
  }


	signTransaction = async (input: SdkApiTypes.TSignTransactionBody): Promise<SdkApiTypes.TSignTransactionResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/sign_transaction", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_SIGN_TRANSACTION_V2"
    });
  }


	updatePolicy = async (input: SdkApiTypes.TUpdatePolicyBody): Promise<SdkApiTypes.TUpdatePolicyResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/update_policy", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_UPDATE_POLICY"
    });
  }


	updatePrivateKeyTag = async (input: SdkApiTypes.TUpdatePrivateKeyTagBody): Promise<SdkApiTypes.TUpdatePrivateKeyTagResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/update_private_key_tag", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_UPDATE_PRIVATE_KEY_TAG"
    });
  }


	updateRootQuorum = async (input: SdkApiTypes.TUpdateRootQuorumBody): Promise<SdkApiTypes.TUpdateRootQuorumResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/update_root_quorum", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_UPDATE_ROOT_QUORUM"
    });
  }


	updateUser = async (input: SdkApiTypes.TUpdateUserBody): Promise<SdkApiTypes.TUpdateUserResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/update_user", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_UPDATE_USER"
    });
  }


	updateUserTag = async (input: SdkApiTypes.TUpdateUserTagBody): Promise<SdkApiTypes.TUpdateUserTagResponse> => {
    const { organizationId, timestampMs, type, ...rest } = input;
    const currentSubOrganization = await getStorageValue(StorageKeys.CurrentSubOrganization);
    return this.command("/public/v1/submit/update_user_tag", {
      parameters: rest,
      organizationId: organizationId ?? (currentSubOrganization?.organizationId ?? this.config.organizationId),
      timestampMs: timestampMs ?? String(Date.now()),
      type: type ?? "ACTIVITY_TYPE_UPDATE_USER_TAG"
    });
  }

}