"use client";

import { callRequestSchema, type CallRequestInput } from "@/api/enquiry.api";
import FieldError from "@/components/inputs/FiledError";
import MultiSelect from "@/components/inputs/MultiSelect";
import { Button } from "@/components/shared/Button";
import type { ServicesResponse } from "@/types/api";
import type { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const initialValues: CallRequestInput = {
  name: "",
  phone: "",
  services: [],
  slot: undefined as never,
  reason: "New project",
};

const slots = ["Morning", "Afternoon", "Evening"] as const;
const reasons = ["New project", "Support", "Pricing"] as const;
type FieldErrors = Partial<Record<keyof CallRequestInput, string>>;

export function CallRequestForm({
  callRequestMutation,
  isError,
  isLoading,
  services,
}: {
  callRequestMutation: UseMutationResult<unknown, Error, CallRequestInput>;
  isError: boolean;
  isLoading: boolean;
  services: ServicesResponse[] | undefined;
}) {
  const [values, setValues] = useState<CallRequestInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  function updateField(
    field: keyof CallRequestInput,
    value: string | number[],
  ) {
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
        toast.success("Thanks, we’ll call you at your preferred time.");
      },
      onError: (err) => {
        toast.error(
          callRequestMutation.error?.message ??
            "We could not schedule your call. Please try again.",
        );
        console.error(err);
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
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 items-center justify-between"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-5">
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
          <span className="mb-2 block font-semibold text-foreground">
            Phone
          </span>
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
        <MultiSelect<number>
          placeholder="Select services"
          value={values.services}
          label="Service"
          isError={isError}
          isLoading={isLoading}
          optionsArray={services}
          onChange={(selectedIds) => updateField("services", selectedIds)}
        />
        <label className="block text-sm text-muted">
          <span className="mb-2 block font-semibold text-foreground">
            Preferred slot
          </span>
          <select
            value={values.slot ?? ""}
            onChange={(event) => updateField("slot", event.target.value)}
            className="ui-input"
            required
          >
            <option value="">Choose a time of day</option>
            {slots.map((slot) => (
              <option key={slot}>{slot}</option>
            ))}
          </select>
          <FieldError message={errors.slot} />
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
      </div>
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
