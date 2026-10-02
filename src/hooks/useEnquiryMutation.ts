"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getServiceOptions,
  postCallRequest,
  postEnquiry,
  type CallRequestInput,
  type EnquiryInput,
} from "@/api/enquiry.api";

export function useEnquiry() {
  const enquiryMutation = useMutation({
    mutationFn: (data: EnquiryInput) => postEnquiry(data),
  });

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: getServiceOptions,
  });

  const callRequestMutation = useMutation({
    mutationFn: (data: CallRequestInput) => postCallRequest(data),
  });

  return { enquiryMutation, callRequestMutation, servicesQuery };
}
