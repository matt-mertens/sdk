import type { NextApiRequest, NextApiResponse } from "next";
import { TurnkeyApiTypes, TurnkeyClient } from "@turnkey/http";
import { createActivityPoller } from "@turnkey/http";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";

type TAttestation = TurnkeyApiTypes["v1Attestation"];

type CreateSubOrgRequest = {
  subOrgName: string;
  challenge: string;
  attestation: TAttestation;
};

type CreateSubOrgResponse = {
  subOrgId: string;
};

type ErrorMessage = {
  message: string;
};

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<CreateSubOrgResponse | ErrorMessage>
) {
  const createSubOrgRequest = req.body as CreateSubOrgRequest;

  try {
    const turnkeyClient = new TurnkeyClient(
      { baseUrl: process.env.NEXT_PUBLIC_TURNKEY_API_BASE_URL! },
      new ApiKeyStamper({
        apiPublicKey: process.env.API_PUBLIC_KEY!,
        apiPrivateKey: process.env.API_PRIVATE_KEY!,
      })
    );

    const activityPoller = createActivityPoller({
      client: turnkeyClient,
      requestFn: turnkeyClient.createSubOrganization,
    });

    const completedActivity = await activityPoller({
      type: "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V3",
      timestampMs: String(Date.now()),
      organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
      parameters: {
        subOrganizationName: createSubOrgRequest.subOrgName,
        rootQuorumThreshold: 1,
        rootUsers: [
          {
            userName: "New user",
            apiKeys: [],
            authenticators: [
              {
                authenticatorName: "Passkey",
                challenge: createSubOrgRequest.challenge,
                attestation: createSubOrgRequest.attestation,
              },
            ],
          },
        ],
        privateKeys: [],
      },
    });

    const subOrgId = refineNonNull(
      completedActivity.result.createSubOrganizationResult?.subOrganizationId
    );

    res.status(200).json({
      subOrgId,
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

function refineNonNull<T>(
  input: T | null | undefined,
  errorMessage?: string
): T {
  if (input == null) {
    throw new Error(errorMessage ?? `Unexpected ${JSON.stringify(input)}`);
  }

  return input;
}
