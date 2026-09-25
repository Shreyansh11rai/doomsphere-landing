"use client";

import { useMutation } from "@tanstack/react-query";
import {
  postCallRequest,
  postEnquiry,
  type CallRequestInput,
  type EnquiryInput,
} from "@/api/enquiry.api";

export function useEnquiryMutation() {
  const enquiryMutation = useMutation({
    mutationFn: (data: EnquiryInput) => postEnquiry(data),
  });
  const callRequestMutation = useMutation({
    mutationFn: (data: CallRequestInput) => postCallRequest(data),
  });

  return { enquiryMutation, callRequestMutation };
}
