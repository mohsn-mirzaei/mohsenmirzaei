"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const pathname = usePathname();
  // Lazy initializer: read once on mount, not recomputed on every render.
  const [formStartedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  async function onSubmit(values: ContactFormValues, event?: React.BaseSyntheticEvent) {
    setStatus("submitting");
    setErrorMessage(null);
    // Read the honeypot straight off the native form element (submitted via
    // `event`) rather than a ref, since real users never touch this field.
    const form = event?.target as HTMLFormElement | undefined;
    const company = (form?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company,
          formStartedAt,
          sourcePath: pathname,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong — please try again.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="max-w-md rounded-2xl border border-line bg-line/10 px-6 py-5 text-lg text-fg">
        Thanks — your message is in. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-md flex-col gap-5">
      {/* Honeypot — hidden from real users, absorbed by bots that fill every field. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="eyebrow">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className="border-b border-line bg-transparent py-3 text-lg text-fg outline-none transition-colors focus:border-accent"
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-accent">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="eyebrow">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className="border-b border-line bg-transparent py-3 text-lg text-fg outline-none transition-colors focus:border-accent"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-accent">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="eyebrow">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className="resize-none border-b border-line bg-transparent py-3 text-lg text-fg outline-none transition-colors focus:border-accent"
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-accent">{errors.message.message}</p>}
      </div>

      {status === "error" && errorMessage && <p className="text-sm text-accent">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        data-cursor
        className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-accent px-6 py-4 text-lg font-semibold text-black transition-colors hover:bg-[#e4ff6e] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
