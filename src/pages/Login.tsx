import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";

import AuthShell from "../components/AuthShell";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { loginApi } from "../api/auth";
import { useAuth } from "../auth/AuthProvider";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Min 8 characters").max(72, "Max 72 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await loginApi(data);
      setUser(res.user);
      nav("/dashboard");
    } catch (e: any) {
      setServerError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to access protected pages using secure HttpOnly cookies."
      footer={
        <div className="flex items-center justify-between text-sm text-zinc-300">
          <span>New to the platform?</span>
          <Link className="text-indigo-300 hover:text-indigo-200" to="/register">
            Create account →
          </Link>
        </div>
      }
    >
      {serverError ? (
        <div className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {serverError}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          placeholder="you@company.com"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          placeholder="••••••••"
          type="password"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          {...register("password")}
        />

        <PrimaryButton loading={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </PrimaryButton>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Tip: refresh tokens rotate automatically.</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Secure</span>
        </div>
      </form>
    </AuthShell>
  );
}
