"use client";

import { useState } from "react";
import { callRequestSchema, type CallRequestInput } from "@/api/enquiry.api";
import { Button } from "@/components/shared/Button";
import { useEnquiryMutation } from "@/hooks/useEnquiryMutation";

const initialValues: CallRequestInput = {
  name: "",
  phone: "",
  preferredSlot: undefined as never,
  reason: "",
};

const slots = ["Morning", "Afternoon", "Evening"] as const;
const reasons = ["New project", "Support", "Pricing"] as const;
type FieldErrors = Partial<Record<keyof CallRequestInput, string>>;

function FieldError({ message }: { message?: string }) {
  return message ? (
    <span className="mt-1 block text-xs font-medium text-red-600">
      {message}
    </span>
  ) : null;
}

export function CallRequestForm() {
  const [values, setValues] = useState<CallRequestInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { callRequestMutation } = useEnquiryMutation();

  function updateField(field: keyof CallRequestInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validatePhone() {
    const result = callRequestSchema.shape.phone.safeParse(values.phone);
    setErrors((current) => ({
      ...current,
      phone: result.success ? undefined : result.error.issues[0]?.message,
    }));
  }

  function submit(data: CallRequestInput) {
    callRequestMutation.mutate(data, {
      onSuccess: () => {
        setValues(initialValues);
        setErrors({});
      },
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = callRequestSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof CallRequestInput;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }
    submit(result.data);
  }

  const hasErrors = Object.values(errors).some(Boolean);
  const errorMessage =
    callRequestMutation.error?.message ?? "We could not request your call.";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <label className="block text-sm text-muted">
        <span className="mb-2 block font-semibold text-foreground">Name</span>
        <input
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="ui-input"
          required
        />
        <FieldError message={errors.name} />
      </label>
      <label className="block text-sm text-muted">
        <span className="mb-2 block font-semibold text-foreground">Phone</span>
        <input
          type="tel"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          onBlur={validatePhone}
          className="ui-input"
          required
        />
        <FieldError message={errors.phone} />
      </label>
      <label className="block text-sm text-muted">
        <span className="mb-2 block font-semibold text-foreground">
          Preferred slot
        </span>
        <select
          value={values.preferredSlot ?? ""}
          onChange={(event) => updateField("preferredSlot", event.target.value)}
          className="ui-input"
          required
        >
          <option value="">Choose a time of day</option>
          {slots.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>
        <FieldError message={errors.preferredSlot} />
      </label>
      <label className="block text-sm text-muted">
        <span className="mb-2 block font-semibold text-foreground">
          Reason <span className="font-normal text-muted">(optional)</span>
        </span>
        <select
          value={values.reason}
          onChange={(event) => updateField("reason", event.target.value)}
          className="ui-input"
        >
          <option value="">Choose a reason</option>
          {reasons.map((reason) => (
            <option key={reason}>{reason}</option>
          ))}
        </select>
        <FieldError message={errors.reason} />
      </label>

      {callRequestMutation.isSuccess && (
        <p className="text-sm font-semibold text-success">
          Thanks, we&apos;ll get back to you soon.
        </p>
      )}
      {callRequestMutation.isError && (
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-red-600">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => submit(values)}
            className="underline"
            disabled={callRequestMutation.isPending}
          >
            Retry
          </button>
        </div>
      )}
      <Button
        type="submit"
        size="lg"
        radius="xl"
        disabled={callRequestMutation.isPending || hasErrors}
      >
        {callRequestMutation.isPending ? "Requesting..." : "Request a Call"}
      </Button>
    </form>
  );
}
