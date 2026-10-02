import { z } from "zod";
import { api } from "@/lib/httpClient";
import type {
  ApiResponse,
  ServicesResponse,
  SubmissionResponse,
} from "@/types/api";
import { requestData } from "@/utils/api.utils";
import { phoneValidator } from "@/utils/validator.utils";

const optionalText = z
  .string()
  .trim()
  .min(2)
  .max(200)
  .optional()
  .or(z.literal(""));

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Too long name, please keep it short."),
  companyName: optionalText,
  email: z.email("Enter a valid email address.").optional().or(z.literal("")),
  phone: phoneValidator,
  services: z.array(z.number()).min(1, "Select at least one service."),
  budgetRange: z.enum(
    [
      "Under ₹25,000",
      "₹25,000-₹50,000",
      "₹50,000-₹1,00,000",
      "Above ₹1,00,000",
    ],
    {
      message: "Choose a budget range.",
    },
  ),
  timeline: z.enum(
    ["As soon as possible", "Within 1 month", "1-3 months", "Just exploring"],
    {
      message: "Choose a timeline.",
    },
  ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your project requirement."),
  source: optionalText,
});

export const callRequestSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  phone: phoneValidator,
  services: z.array(z.number()).min(1, "Select at least one service."),
  slot: z.enum(["Morning", "Afternoon", "Evening"], {
    message: "Choose a preferred slot.",
  }),
  reason: z.enum(["New project", "Support", "Pricing", "Not mentioned"]),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type CallRequestInput = z.infer<typeof callRequestSchema>;

type InquiryBackendPayload = {
  name: string;
  companyName: string | null;
  services: number[];
  message: string;
  budgetRange: string;
  timeline: string;
  email: string | null;
  phone: string;
  type: "inquiry";
  source: string | null;
};

function toInquiryBackendPayload(data: EnquiryInput): InquiryBackendPayload {
  return {
    name: data.name.trim(),
    companyName: data.companyName?.trim() || null,
    services: data.services,
    budgetRange: data.budgetRange,
    timeline: data.timeline,
    email: data.email || null,
    phone: data.phone,
    message: data.message,
    type: "inquiry",
    source: data.source || null,
  };
}

export function postEnquiry(
  data: EnquiryInput,
): Promise<ApiResponse<SubmissionResponse>> {
  return requestData(
    api.post<SubmissionResponse, InquiryBackendPayload>(
      "/enquiries",
      toInquiryBackendPayload(data),
    ),
  );
}

export function getServiceOptions(): Promise<ServicesResponse[]> {
  return requestData(api.get<ServicesResponse[]>("/enquiries/services"));
}

export function postCallRequest(
  data: CallRequestInput,
): Promise<ApiResponse<SubmissionResponse>> {
  return requestData(
    api.post<SubmissionResponse, Record<string, unknown>>("/enquiries", {
      name: data.name.trim(),
      services: data.services,
      phone: data.phone,
      type: "callback",
      reason: data.reason,
      slot: data.slot,
    }),
  );
}
