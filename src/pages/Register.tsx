import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, Lock } from "lucide-react";

import AuthShell from "../components/AuthShell";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { registerApi } from "../api/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  username: z.string().min(2, "Min 2 characters").max(40, "Max 40 characters"),
  password: z
    .string()
    .min(8, "Min 8 characters")
    .max(72, "Max 72 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Must include uppercase, lowercase, and a number"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const nav = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", username: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      await registerApi(data);
      nav("/login");
    } catch (e: any) {
      setServerError(e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Secure sign-up with password hashing and cookie-based sessions."
      footer={
        <div className="flex items-center justify-between text-sm text-zinc-300">
          <span>Already have an account?</span>
          <Link className="text-indigo-300 hover:text-indigo-200" to="/login">
            Login →
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
          label="Username"
          placeholder="Nishant"
          icon={<User size={18} />}
          error={errors.username?.message}
          {...register("username")}
        />

        <Input
          label="Password"
          placeholder="StrongPass1"
          type="password"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          {...register("password")}
        />

        <PrimaryButton loading={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Account"}
        </PrimaryButton>

        <p className="text-xs text-zinc-400">
          By signing up, you accept secure cookie sessions (HttpOnly) and token rotation.
        </p>
      </form>
    </AuthShell>
  );
}
