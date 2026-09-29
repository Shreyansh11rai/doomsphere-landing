import { httpClient } from "@/lib/httpClient";
import type {
  ApiResponse,
  BookingFormPayload,
  EnquiryFormPayload,
  PricingInterestPayload,
  RequestEnvelope,
  SubmissionResponse,
} from "@/types/api";

const buildEnvelope = <TPayload extends object>(
  source: string,
  payload: TPayload,
): RequestEnvelope<TPayload> => ({
  source,
  timestamp: new Date().toISOString(),
  payload,
});

export async function submitEnquiry(
  payload: EnquiryFormPayload,
): Promise<ApiResponse<SubmissionResponse>> {
  return httpClient.post<
    SubmissionResponse,
    RequestEnvelope<EnquiryFormPayload>
  >("/enquiries", buildEnvelope("global-enquiry-widget", payload));
}

export async function submitBookingRequest(
  payload: BookingFormPayload,
): Promise<ApiResponse<SubmissionResponse>> {
  return httpClient.post<
    SubmissionResponse,
    RequestEnvelope<BookingFormPayload>
  >("/bookings", buildEnvelope("contact-page", payload));
}

export async function submitPricingInterest(
  payload: PricingInterestPayload,
): Promise<ApiResponse<SubmissionResponse>> {
  return httpClient.post<
    SubmissionResponse,
    RequestEnvelope<PricingInterestPayload>
  >("/pricing-interests", buildEnvelope("pricing-card", payload));
}
