import { z } from "zod";
import { httpClient } from "@/http/httpClient";
import type { ApiResponse, SubmissionResponse } from "@/types/api";
import { SERVICE_NAMES } from "@/data/services_data";

const optionalText = z.string().trim().max(200).optional().or(z.literal(""));

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Too long name, please keep it short."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s().-]{7,18}$/, "Enter a valid phone number."),
  companyName: optionalText,
  service: z.enum(SERVICE_NAMES, {
    message: "Choose a service.",
  }),
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
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s().-]{7,18}$/, "Enter a valid phone number."),
  preferredSlot: z.enum(["Morning", "Afternoon", "Evening"], {
    message: "Choose a preferred slot.",
  }),
  reason: z
    .enum(["New project", "Support", "Pricing", "Not mentioned"])
    .optional()
    .or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type CallRequestInput = z.infer<typeof callRequestSchema>;

type EnquiryPayload = EnquiryInput & { type: "enquiry" };
type CallRequestPayload = CallRequestInput & { type: "call_request" };

export function postEnquiry(
  data: EnquiryInput,
): Promise<ApiResponse<SubmissionResponse>> {
  const payload: EnquiryPayload = { ...data, type: "enquiry" };
  return httpClient.post<SubmissionResponse, EnquiryPayload>(
    "/api/enquiries",
    payload,
  );
}

export function postCallRequest(
  data: CallRequestInput,
): Promise<ApiResponse<SubmissionResponse>> {
  const payload: CallRequestPayload = { ...data, type: "call_request" };
  return httpClient.post<SubmissionResponse, CallRequestPayload>(
    "/api/enquiries",
    payload,
  );
}
