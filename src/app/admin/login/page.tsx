import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="section-px flex min-h-dvh items-center justify-center">
      <div className="w-full max-w-sm">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-fg">Sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
