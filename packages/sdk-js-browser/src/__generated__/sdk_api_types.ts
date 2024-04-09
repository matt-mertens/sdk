/* @generated by codegen. DO NOT EDIT BY HAND */

import type { operations } from "../__inputs__/public_api.types";

import type { queryOverrideParams, commandOverrideParams } from "../__types__/base";

export type TGetActivityResponse = operations["PublicApiService_GetActivity"]["responses"]["200"]["schema"];

export type TGetActivityInput = { body: TGetActivityBody };

export type TGetActivityBody = Omit<operations["PublicApiService_GetActivity"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetApiKeyResponse = operations["PublicApiService_GetApiKey"]["responses"]["200"]["schema"];

export type TGetApiKeyInput = { body: TGetApiKeyBody };

export type TGetApiKeyBody = Omit<operations["PublicApiService_GetApiKey"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetApiKeysResponse = operations["PublicApiService_GetApiKeys"]["responses"]["200"]["schema"];

export type TGetApiKeysInput = { body: TGetApiKeysBody };

export type TGetApiKeysBody = Omit<operations["PublicApiService_GetApiKeys"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetAuthenticatorResponse = operations["PublicApiService_GetAuthenticator"]["responses"]["200"]["schema"];

export type TGetAuthenticatorInput = { body: TGetAuthenticatorBody };

export type TGetAuthenticatorBody = Omit<operations["PublicApiService_GetAuthenticator"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetAuthenticatorsResponse = operations["PublicApiService_GetAuthenticators"]["responses"]["200"]["schema"];

export type TGetAuthenticatorsInput = { body: TGetAuthenticatorsBody };

export type TGetAuthenticatorsBody = Omit<operations["PublicApiService_GetAuthenticators"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetOrganizationResponse = operations["PublicApiService_GetOrganization"]["responses"]["200"]["schema"];

export type TGetOrganizationInput = { body: TGetOrganizationBody };

export type TGetOrganizationBody = Omit<operations["PublicApiService_GetOrganization"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetPolicyResponse = operations["PublicApiService_GetPolicy"]["responses"]["200"]["schema"];

export type TGetPolicyInput = { body: TGetPolicyBody };

export type TGetPolicyBody = Omit<operations["PublicApiService_GetPolicy"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetPrivateKeyResponse = operations["PublicApiService_GetPrivateKey"]["responses"]["200"]["schema"];

export type TGetPrivateKeyInput = { body: TGetPrivateKeyBody };

export type TGetPrivateKeyBody = Omit<operations["PublicApiService_GetPrivateKey"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetUserResponse = operations["PublicApiService_GetUser"]["responses"]["200"]["schema"];

export type TGetUserInput = { body: TGetUserBody };

export type TGetUserBody = Omit<operations["PublicApiService_GetUser"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetWalletResponse = operations["PublicApiService_GetWallet"]["responses"]["200"]["schema"];

export type TGetWalletInput = { body: TGetWalletBody };

export type TGetWalletBody = Omit<operations["PublicApiService_GetWallet"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetActivitiesResponse = operations["PublicApiService_GetActivities"]["responses"]["200"]["schema"];

export type TGetActivitiesInput = { body: TGetActivitiesBody };

export type TGetActivitiesBody = Omit<operations["PublicApiService_GetActivities"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetPoliciesResponse = operations["PublicApiService_GetPolicies"]["responses"]["200"]["schema"];

export type TGetPoliciesInput = { body: TGetPoliciesBody };

export type TGetPoliciesBody = Omit<operations["PublicApiService_GetPolicies"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TListPrivateKeyTagsResponse = operations["PublicApiService_ListPrivateKeyTags"]["responses"]["200"]["schema"];

export type TListPrivateKeyTagsInput = { body: TListPrivateKeyTagsBody };

export type TListPrivateKeyTagsBody = Omit<operations["PublicApiService_ListPrivateKeyTags"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetPrivateKeysResponse = operations["PublicApiService_GetPrivateKeys"]["responses"]["200"]["schema"];

export type TGetPrivateKeysInput = { body: TGetPrivateKeysBody };

export type TGetPrivateKeysBody = Omit<operations["PublicApiService_GetPrivateKeys"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetSubOrgIdsResponse = operations["PublicApiService_GetSubOrgIds"]["responses"]["200"]["schema"];

export type TGetSubOrgIdsInput = { body: TGetSubOrgIdsBody };

export type TGetSubOrgIdsBody = Omit<operations["PublicApiService_GetSubOrgIds"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TListUserTagsResponse = operations["PublicApiService_ListUserTags"]["responses"]["200"]["schema"];

export type TListUserTagsInput = { body: TListUserTagsBody };

export type TListUserTagsBody = Omit<operations["PublicApiService_ListUserTags"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetUsersResponse = operations["PublicApiService_GetUsers"]["responses"]["200"]["schema"];

export type TGetUsersInput = { body: TGetUsersBody };

export type TGetUsersBody = Omit<operations["PublicApiService_GetUsers"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetWalletAccountsResponse = operations["PublicApiService_GetWalletAccounts"]["responses"]["200"]["schema"];

export type TGetWalletAccountsInput = { body: TGetWalletAccountsBody };

export type TGetWalletAccountsBody = Omit<operations["PublicApiService_GetWalletAccounts"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetWalletsResponse = operations["PublicApiService_GetWallets"]["responses"]["200"]["schema"];

export type TGetWalletsInput = { body: TGetWalletsBody };

export type TGetWalletsBody = Omit<operations["PublicApiService_GetWallets"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetLoginSessionResponse = operations["PublicApiService_GetLoginSession"]["responses"]["200"]["schema"];

export type TGetLoginSessionInput = { body: TGetLoginSessionBody };

export type TGetLoginSessionBody = Omit<operations["PublicApiService_GetLoginSession"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TGetWhoamiResponse = operations["PublicApiService_GetWhoami"]["responses"]["200"]["schema"];

export type TGetWhoamiInput = { body: TGetWhoamiBody };

export type TGetWhoamiBody = Omit<operations["PublicApiService_GetWhoami"]["parameters"]["body"]["body"], "organizationId"> & queryOverrideParams;

export type TApproveActivityResponse = operations["PublicApiService_ApproveActivity"]["responses"]["200"]["schema"]["activity"]["result"];

export type TApproveActivityInput = { body: TApproveActivityBody };

export type TApproveActivityBody = operations["PublicApiService_ApproveActivity"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateApiKeysResponse = operations["PublicApiService_CreateApiKeys"]["responses"]["200"]["schema"]["activity"]["result"]["createApiKeysResult"];

export type TCreateApiKeysInput = { body: TCreateApiKeysBody };

export type TCreateApiKeysBody = operations["PublicApiService_CreateApiKeys"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateApiOnlyUsersResponse = operations["PublicApiService_CreateApiOnlyUsers"]["responses"]["200"]["schema"]["activity"]["result"]["createApiOnlyUsersResult"];

export type TCreateApiOnlyUsersInput = { body: TCreateApiOnlyUsersBody };

export type TCreateApiOnlyUsersBody = operations["PublicApiService_CreateApiOnlyUsers"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateAuthenticatorsResponse = operations["PublicApiService_CreateAuthenticators"]["responses"]["200"]["schema"]["activity"]["result"]["createAuthenticatorsResult"];

export type TCreateAuthenticatorsInput = { body: TCreateAuthenticatorsBody };

export type TCreateAuthenticatorsBody = operations["PublicApiService_CreateAuthenticators"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateInvitationsResponse = operations["PublicApiService_CreateInvitations"]["responses"]["200"]["schema"]["activity"]["result"]["createInvitationsResult"];

export type TCreateInvitationsInput = { body: TCreateInvitationsBody };

export type TCreateInvitationsBody = operations["PublicApiService_CreateInvitations"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreatePoliciesResponse = operations["PublicApiService_CreatePolicies"]["responses"]["200"]["schema"]["activity"]["result"]["createPoliciesResult"];

export type TCreatePoliciesInput = { body: TCreatePoliciesBody };

export type TCreatePoliciesBody = operations["PublicApiService_CreatePolicies"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreatePolicyResponse = operations["PublicApiService_CreatePolicy"]["responses"]["200"]["schema"]["activity"]["result"]["createPolicyResult"];

export type TCreatePolicyInput = { body: TCreatePolicyBody };

export type TCreatePolicyBody = operations["PublicApiService_CreatePolicy"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreatePrivateKeyTagResponse = operations["PublicApiService_CreatePrivateKeyTag"]["responses"]["200"]["schema"]["activity"]["result"]["createPrivateKeyTagResult"];

export type TCreatePrivateKeyTagInput = { body: TCreatePrivateKeyTagBody };

export type TCreatePrivateKeyTagBody = operations["PublicApiService_CreatePrivateKeyTag"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreatePrivateKeysResponse = operations["PublicApiService_CreatePrivateKeys"]["responses"]["200"]["schema"]["activity"]["result"]["createPrivateKeysResult"];

export type TCreatePrivateKeysInput = { body: TCreatePrivateKeysBody };

export type TCreatePrivateKeysBody = operations["PublicApiService_CreatePrivateKeys"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateSubOrganizationResponse = operations["PublicApiService_CreateSubOrganization"]["responses"]["200"]["schema"]["activity"]["result"]["createSubOrganizationResult"];

export type TCreateSubOrganizationInput = { body: TCreateSubOrganizationBody };

export type TCreateSubOrganizationBody = operations["PublicApiService_CreateSubOrganization"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateUserTagResponse = operations["PublicApiService_CreateUserTag"]["responses"]["200"]["schema"]["activity"]["result"]["createUserTagResult"];

export type TCreateUserTagInput = { body: TCreateUserTagBody };

export type TCreateUserTagBody = operations["PublicApiService_CreateUserTag"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateUsersResponse = operations["PublicApiService_CreateUsers"]["responses"]["200"]["schema"]["activity"]["result"]["createUsersResult"];

export type TCreateUsersInput = { body: TCreateUsersBody };

export type TCreateUsersBody = operations["PublicApiService_CreateUsers"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateWalletResponse = operations["PublicApiService_CreateWallet"]["responses"]["200"]["schema"]["activity"]["result"]["createWalletResult"];

export type TCreateWalletInput = { body: TCreateWalletBody };

export type TCreateWalletBody = operations["PublicApiService_CreateWallet"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TCreateWalletAccountsResponse = operations["PublicApiService_CreateWalletAccounts"]["responses"]["200"]["schema"]["activity"]["result"]["createWalletAccountsResult"];

export type TCreateWalletAccountsInput = { body: TCreateWalletAccountsBody };

export type TCreateWalletAccountsBody = operations["PublicApiService_CreateWalletAccounts"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TDeleteApiKeysResponse = operations["PublicApiService_DeleteApiKeys"]["responses"]["200"]["schema"]["activity"]["result"]["deleteApiKeysResult"];

export type TDeleteApiKeysInput = { body: TDeleteApiKeysBody };

export type TDeleteApiKeysBody = operations["PublicApiService_DeleteApiKeys"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TDeleteAuthenticatorsResponse = operations["PublicApiService_DeleteAuthenticators"]["responses"]["200"]["schema"]["activity"]["result"]["deleteAuthenticatorsResult"];

export type TDeleteAuthenticatorsInput = { body: TDeleteAuthenticatorsBody };

export type TDeleteAuthenticatorsBody = operations["PublicApiService_DeleteAuthenticators"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TDeleteInvitationResponse = operations["PublicApiService_DeleteInvitation"]["responses"]["200"]["schema"]["activity"]["result"]["deleteInvitationResult"];

export type TDeleteInvitationInput = { body: TDeleteInvitationBody };

export type TDeleteInvitationBody = operations["PublicApiService_DeleteInvitation"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TDeletePolicyResponse = operations["PublicApiService_DeletePolicy"]["responses"]["200"]["schema"]["activity"]["result"]["deletePolicyResult"];

export type TDeletePolicyInput = { body: TDeletePolicyBody };

export type TDeletePolicyBody = operations["PublicApiService_DeletePolicy"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TDeletePrivateKeyTagsResponse = operations["PublicApiService_DeletePrivateKeyTags"]["responses"]["200"]["schema"]["activity"]["result"]["deletePrivateKeyTagsResult"];

export type TDeletePrivateKeyTagsInput = { body: TDeletePrivateKeyTagsBody };

export type TDeletePrivateKeyTagsBody = operations["PublicApiService_DeletePrivateKeyTags"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TDeleteUserTagsResponse = operations["PublicApiService_DeleteUserTags"]["responses"]["200"]["schema"]["activity"]["result"]["deleteUserTagsResult"];

export type TDeleteUserTagsInput = { body: TDeleteUserTagsBody };

export type TDeleteUserTagsBody = operations["PublicApiService_DeleteUserTags"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TDeleteUsersResponse = operations["PublicApiService_DeleteUsers"]["responses"]["200"]["schema"]["activity"]["result"]["deleteUsersResult"];

export type TDeleteUsersInput = { body: TDeleteUsersBody };

export type TDeleteUsersBody = operations["PublicApiService_DeleteUsers"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TEmailAuthResponse = operations["PublicApiService_EmailAuth"]["responses"]["200"]["schema"]["activity"]["result"]["emailAuthResult"];

export type TEmailAuthInput = { body: TEmailAuthBody };

export type TEmailAuthBody = operations["PublicApiService_EmailAuth"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TExportPrivateKeyResponse = operations["PublicApiService_ExportPrivateKey"]["responses"]["200"]["schema"]["activity"]["result"]["exportPrivateKeyResult"];

export type TExportPrivateKeyInput = { body: TExportPrivateKeyBody };

export type TExportPrivateKeyBody = operations["PublicApiService_ExportPrivateKey"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TExportWalletResponse = operations["PublicApiService_ExportWallet"]["responses"]["200"]["schema"]["activity"]["result"]["exportWalletResult"];

export type TExportWalletInput = { body: TExportWalletBody };

export type TExportWalletBody = operations["PublicApiService_ExportWallet"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TExportWalletAccountResponse = operations["PublicApiService_ExportWalletAccount"]["responses"]["200"]["schema"]["activity"]["result"]["exportWalletAccountResult"];

export type TExportWalletAccountInput = { body: TExportWalletAccountBody };

export type TExportWalletAccountBody = operations["PublicApiService_ExportWalletAccount"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TImportPrivateKeyResponse = operations["PublicApiService_ImportPrivateKey"]["responses"]["200"]["schema"]["activity"]["result"]["importPrivateKeyResult"];

export type TImportPrivateKeyInput = { body: TImportPrivateKeyBody };

export type TImportPrivateKeyBody = operations["PublicApiService_ImportPrivateKey"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TImportWalletResponse = operations["PublicApiService_ImportWallet"]["responses"]["200"]["schema"]["activity"]["result"]["importWalletResult"];

export type TImportWalletInput = { body: TImportWalletBody };

export type TImportWalletBody = operations["PublicApiService_ImportWallet"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TInitImportPrivateKeyResponse = operations["PublicApiService_InitImportPrivateKey"]["responses"]["200"]["schema"]["activity"]["result"]["initImportPrivateKeyResult"];

export type TInitImportPrivateKeyInput = { body: TInitImportPrivateKeyBody };

export type TInitImportPrivateKeyBody = operations["PublicApiService_InitImportPrivateKey"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TInitImportWalletResponse = operations["PublicApiService_InitImportWallet"]["responses"]["200"]["schema"]["activity"]["result"]["initImportWalletResult"];

export type TInitImportWalletInput = { body: TInitImportWalletBody };

export type TInitImportWalletBody = operations["PublicApiService_InitImportWallet"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TInitUserEmailRecoveryResponse = operations["PublicApiService_InitUserEmailRecovery"]["responses"]["200"]["schema"]["activity"]["result"]["initUserEmailRecoveryResult"];

export type TInitUserEmailRecoveryInput = { body: TInitUserEmailRecoveryBody };

export type TInitUserEmailRecoveryBody = operations["PublicApiService_InitUserEmailRecovery"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TRecoverUserResponse = operations["PublicApiService_RecoverUser"]["responses"]["200"]["schema"]["activity"]["result"]["recoverUserResult"];

export type TRecoverUserInput = { body: TRecoverUserBody };

export type TRecoverUserBody = operations["PublicApiService_RecoverUser"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TRejectActivityResponse = operations["PublicApiService_RejectActivity"]["responses"]["200"]["schema"]["activity"]["result"];

export type TRejectActivityInput = { body: TRejectActivityBody };

export type TRejectActivityBody = operations["PublicApiService_RejectActivity"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TRemoveOrganizationFeatureResponse = operations["PublicApiService_RemoveOrganizationFeature"]["responses"]["200"]["schema"]["activity"]["result"]["removeOrganizationFeatureResult"];

export type TRemoveOrganizationFeatureInput = { body: TRemoveOrganizationFeatureBody };

export type TRemoveOrganizationFeatureBody = operations["PublicApiService_RemoveOrganizationFeature"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TSetOrganizationFeatureResponse = operations["PublicApiService_SetOrganizationFeature"]["responses"]["200"]["schema"]["activity"]["result"]["setOrganizationFeatureResult"];

export type TSetOrganizationFeatureInput = { body: TSetOrganizationFeatureBody };

export type TSetOrganizationFeatureBody = operations["PublicApiService_SetOrganizationFeature"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TSignRawPayloadResponse = operations["PublicApiService_SignRawPayload"]["responses"]["200"]["schema"]["activity"]["result"]["signRawPayloadResult"];

export type TSignRawPayloadInput = { body: TSignRawPayloadBody };

export type TSignRawPayloadBody = operations["PublicApiService_SignRawPayload"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TSignRawPayloadsResponse = operations["PublicApiService_SignRawPayloads"]["responses"]["200"]["schema"]["activity"]["result"]["signRawPayloadsResult"];

export type TSignRawPayloadsInput = { body: TSignRawPayloadsBody };

export type TSignRawPayloadsBody = operations["PublicApiService_SignRawPayloads"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TSignTransactionResponse = operations["PublicApiService_SignTransaction"]["responses"]["200"]["schema"]["activity"]["result"]["signTransactionResult"];

export type TSignTransactionInput = { body: TSignTransactionBody };

export type TSignTransactionBody = operations["PublicApiService_SignTransaction"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TUpdatePolicyResponse = operations["PublicApiService_UpdatePolicy"]["responses"]["200"]["schema"]["activity"]["result"]["updatePolicyResult"];

export type TUpdatePolicyInput = { body: TUpdatePolicyBody };

export type TUpdatePolicyBody = operations["PublicApiService_UpdatePolicy"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TUpdatePrivateKeyTagResponse = operations["PublicApiService_UpdatePrivateKeyTag"]["responses"]["200"]["schema"]["activity"]["result"]["updatePrivateKeyTagResult"];

export type TUpdatePrivateKeyTagInput = { body: TUpdatePrivateKeyTagBody };

export type TUpdatePrivateKeyTagBody = operations["PublicApiService_UpdatePrivateKeyTag"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TUpdateRootQuorumResponse = operations["PublicApiService_UpdateRootQuorum"]["responses"]["200"]["schema"]["activity"]["result"]["updateRootQuorumResult"];

export type TUpdateRootQuorumInput = { body: TUpdateRootQuorumBody };

export type TUpdateRootQuorumBody = operations["PublicApiService_UpdateRootQuorum"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TUpdateUserResponse = operations["PublicApiService_UpdateUser"]["responses"]["200"]["schema"]["activity"]["result"]["updateUserResult"];

export type TUpdateUserInput = { body: TUpdateUserBody };

export type TUpdateUserBody = operations["PublicApiService_UpdateUser"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TUpdateUserTagResponse = operations["PublicApiService_UpdateUserTag"]["responses"]["200"]["schema"]["activity"]["result"]["updateUserTagResult"];

export type TUpdateUserTagInput = { body: TUpdateUserTagBody };

export type TUpdateUserTagBody = operations["PublicApiService_UpdateUserTag"]["parameters"]["body"]["body"]["parameters"] & commandOverrideParams;

export type TNOOPCodegenAnchorResponse = operations["PublicApiService_NOOPCodegenAnchor"]["responses"]["200"]["schema"];