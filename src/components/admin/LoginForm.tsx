"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, type AdminLoginValues } from "@/lib/admin/schemas";

type Status = "idle" | "submitting" | "error";

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginValues>({ resolver: zodResolver(adminLoginSchema) });

  async function onSubmit(values: AdminLoginValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong — please try again.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="admin-email" className="eyebrow">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          className="border-b border-line bg-transparent py-3 text-lg text-fg outline-none transition-colors focus:border-accent"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-accent">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="admin-password" className="eyebrow">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          className="border-b border-line bg-transparent py-3 text-lg text-fg outline-none transition-colors focus:border-accent"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-accent">{errors.password.message}</p>}
      </div>

      {status === "error" && errorMessage && <p className="text-sm text-accent">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-accent px-6 py-4 text-lg font-semibold text-black transition-colors hover:bg-[#e4ff6e] disabled:opacity-60"
      >
        {status === "submitting" ? "Signing in…" : "Sign in"}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
