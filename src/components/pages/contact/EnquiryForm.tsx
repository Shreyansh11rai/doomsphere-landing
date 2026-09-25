"use client";

import { useState } from "react";
import { enquirySchema, type EnquiryInput } from "@/api/enquiry.api";
import { Button } from "@/components/shared/Button";
import { useEnquiryMutation } from "@/hooks/useEnquiryMutation";
import { SERVICE_NAMES } from "@/data/services_data";

const initialValues: EnquiryInput = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  service: undefined as never,
  budgetRange: undefined as never,
  timeline: undefined as never,
  message: "",
  source: "",
};

const services = SERVICE_NAMES.map((n) => n);

const budgetRanges = [
  "Under ₹25,000",
  "₹25,000-₹50,000",
  "₹50,000-₹1,00,000",
  "Above ₹1,00,000",
] as const;

const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1-3 months",
  "Just exploring",
] as const;

const sources = ["Google search", "Social media", "Referral", "Other"] as const;

type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

function FieldError({ message }: { message?: string }) {
  return message ? (
    <span className="mt-1 block text-xs font-medium text-red-600">
      {message}
    </span>
  ) : null;
}

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { enquiryMutation } = useEnquiryMutation();

  function updateField(field: keyof EnquiryInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateField(field: "email" | "phone") {
    const result = enquirySchema.shape[field].safeParse(values[field]);
    setErrors((current) => ({
      ...current,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  }

  function submit(data: EnquiryInput) {
    enquiryMutation.mutate(data, {
      onSuccess: () => {
        setValues(initialValues);
        setErrors({});
      },
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = enquirySchema.safeParse(values);
    if (!result.success) {
      const nextErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EnquiryInput;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }
    submit(result.data);
  }

  const errorMessage =
    enquiryMutation.error?.message ?? "We could not send your enquiry.";
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-muted">
          <span className="mb-2 block font-semibold text-foreground">Name</span>
          <input
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="ui-input"
            required
          />
          <FieldError message={errors.name} />
        </label>
        <label className="text-sm text-muted">
          <span className="mb-2 block font-semibold text-foreground">
            Email
          </span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() => validateField("email")}
            className="ui-input"
            required
          />
          <FieldError message={errors.email} />
        </label>
        <label className="text-sm text-muted">
          <span className="mb-2 block font-semibold text-foreground">
            Phone
          </span>
          <input
            type="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            onBlur={() => validateField("phone")}
            className="ui-input"
            required
          />
          <FieldError message={errors.phone} />
        </label>
        <label className="text-sm text-muted">
          <span className="mb-2 block font-semibold text-foreground">
            Company <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            value={values.companyName}
            onChange={(event) => updateField("companyName", event.target.value)}
            className="ui-input"
          />
          <FieldError message={errors.companyName} />
        </label>
      </div>

      <label className="block text-sm text-muted">
        <span className="mb-2 block font-semibold text-foreground">
          Service
        </span>
        <select
          value={values.service ?? ""}
          onChange={(event) => updateField("service", event.target.value)}
          className="ui-input"
          required
        >
          <option value="">Choose a service</option>
          {services.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <FieldError message={errors.service} />
      </label>

      {values.service && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">
              Budget range
            </span>
            <select
              value={values.budgetRange ?? ""}
              onChange={(event) =>
                updateField("budgetRange", event.target.value)
              }
              className="ui-input"
              required
            >
              <option value="">Choose a budget</option>
              {budgetRanges.map((range) => (
                <option key={range}>{range}</option>
              ))}
            </select>
            <FieldError message={errors.budgetRange} />
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">
              Timeline
            </span>
            <select
              value={values.timeline ?? ""}
              onChange={(event) => updateField("timeline", event.target.value)}
              className="ui-input"
              required
            >
              <option value="">Choose a timeline</option>
              {timelines.map((timeline) => (
                <option key={timeline}>{timeline}</option>
              ))}
            </select>
            <FieldError message={errors.timeline} />
          </label>
        </div>
      )}

      <label className="block text-sm text-muted">
        <span className="mb-2 block font-semibold text-foreground">
          Tell us about the project
        </span>
        <textarea
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="ui-input min-h-32 resize-y"
          required
        />
        <FieldError message={errors.message} />
      </label>
      <label className="block text-sm text-muted">
        <span className="mb-2 block font-semibold text-foreground">
          How did you find us?{" "}
          <span className="font-normal text-muted">(optional)</span>
        </span>
        <select
          value={values.source}
          onChange={(event) => updateField("source", event.target.value)}
          className="ui-input"
        >
          <option value="">Choose a source</option>
          {sources.map((source) => (
            <option key={source}>{source}</option>
          ))}
        </select>
        <FieldError message={errors.source} />
      </label>

      {enquiryMutation.isSuccess && (
        <p className="text-sm font-semibold text-success">
          Thanks, we&apos;ll get back to you soon.
        </p>
      )}
      {enquiryMutation.isError && (
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-red-600">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => submit(values)}
            className="underline"
            disabled={enquiryMutation.isPending}
          >
            Retry
          </button>
        </div>
      )}
      <Button
        type="submit"
        size="lg"
        radius="xl"
        disabled={enquiryMutation.isPending || hasErrors}
      >
        {enquiryMutation.isPending ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
