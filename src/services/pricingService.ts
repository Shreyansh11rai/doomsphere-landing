import { httpClient } from "@/lib/httpClient";
import type {
  ApiResponse,
  PricingInterestPayload,
  RequestEnvelope,
  SubmissionResponse,
} from "@/types/api";

export async function createPricingRequest(
  payload: PricingInterestPayload,
): Promise<ApiResponse<SubmissionResponse>> {
  const envelope: RequestEnvelope<PricingInterestPayload> = {
    source: "pricing-card",
    timestamp: new Date().toISOString(),
    payload,
  };

  return httpClient.post<
    SubmissionResponse,
    RequestEnvelope<PricingInterestPayload>
  >("/pricing-interests", envelope);
}
