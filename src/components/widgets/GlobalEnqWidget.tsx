"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/shared/Button";
import { SERVICES_DATA } from "@/data/services_data";
import { submitEnquiry } from "@/services/enquiryService";
import { brand } from "@/config/brand";
import { IoCall } from "react-icons/io5";

const MESSAGE_TEMPLATES = {
  "custom-websites":
    "I want a professional website that makes our business easier to trust and easier to contact.",
  "whatsapp-automation":
    "I want to answer customer questions faster and automate routine WhatsApp follow-ups.",
  "business-automation":
    "I want to reduce repeat manual work and keep our team more organised.",
};

export function GlobalEnquiryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(
    SERVICES_DATA[0]?.slug ?? "custom-websites",
  );
  const [statusMessage, setStatusMessage] = useState("");

  const messageTemplate = useMemo(
    () =>
      MESSAGE_TEMPLATES[selectedService as keyof typeof MESSAGE_TEMPLATES] ??
      "",
    [selectedService],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      mobileNumber: String(form.get("mobileNumber") ?? ""),
      companyName: String(form.get("companyName") ?? ""),
      message: String(form.get("message") ?? ""),
      serviceId: selectedService,
      messageTemplate,
    };

    const result = await submitEnquiry(payload);
    setStatusMessage(result.message);
    setIsOpen(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex items-center gap-2">
      <Button href={`tel:${brand.contactNumber}`} variant="secondary">
        <IoCall /> {brand.contactNumber}
      </Button>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Enquiry
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/40 py-10 px-4 backdrop-blur-sm">
          <div className="ui-modal max-h-[90vh] max-w-2xl overflow-y-auto p-6">
            <div className=" w-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Global enquiry
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">
                    Tell us where you need help.
                  </h3>
                </div>
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                >
                  Close
                </Button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <label className="text-sm text-muted sm:col-span-1">
                <span className="mb-2 block font-semibold text-foreground">
                  Name
                </span>
                <input name="name" required className="ui-input" />
              </label>
              <label className="text-sm text-muted sm:col-span-1">
                <span className="mb-2 block font-semibold text-foreground">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="ui-input"
                />
              </label>
              <label className="text-sm text-muted sm:col-span-1">
                <span className="mb-2 block font-semibold text-foreground">
                  Mobile number
                </span>
                <input name="mobileNumber" required className="ui-input" />
              </label>
              <label className="text-sm text-muted sm:col-span-1">
                <span className="mb-2 block font-semibold text-foreground">
                  Company name
                </span>
                <input name="companyName" required className="ui-input" />
              </label>
              <div className="sm:col-span-2">
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Choose service
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SERVICES_DATA.map((service) => (
                    <Button
                      key={service.slug}
                      type="button"
                      onClick={() => setSelectedService(service.slug)}
                      variant={
                        selectedService === service.slug
                          ? "primary"
                          : "secondary"
                      }
                      radius="xl"
                      className={`justify-start text-left ${selectedService === service.slug ? "bg-primary/10 text-foreground" : ""}`}
                    >
                      <span className="block text-sm font-semibold text-foreground">
                        {service.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {service.summary}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
              <label className="text-sm text-muted sm:col-span-2">
                <span className="mb-2 block font-semibold text-foreground">
                  Message
                </span>
                <textarea
                  name="message"
                  defaultValue={messageTemplate}
                  rows={4}
                  className="ui-input"
                />
              </label>
              <Button type="submit" className="sm:col-span-2">
                Send enquiry
              </Button>
            </form>

            {statusMessage && (
              <p className="mt-4 text-sm font-semibold text-success">
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
