export interface RequestEnvelope<TPayload extends object> {
  source: string;
  timestamp: string;
  payload: TPayload;
}

export interface ApiResponse<TData> {
  success: boolean;
  message: string;
  data: TData;
}

export interface EnquiryFormPayload {
  name: string;
  email: string;
  mobileNumber: string;
  companyName: string;
  message: string;
  serviceId: string;
  messageTemplate?: string;
}

export interface BookingFormPayload {
  name: string;
  companyName: string;
  contactNumber: string;
  scheduleDate: string;
  scheduleTime: string;
  serviceId: string;
}

export interface PricingInterestPayload {
  name: string;
  company: string;
  contact: string;
  serviceId: string;
  source: string;
  tier?: string;
}

export interface SubmissionResponse {
  id: string;
  status: string;
  reference: string;
}

export interface ServicesResponse {
  id: number;
  name: string;
}
