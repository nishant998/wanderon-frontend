import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  LogOut,
  KeyRound,
  Sparkles,
  Fingerprint,
  Activity,
  Copy,
  Check,
  Lock,
  RefreshCw,
  Server,
  Globe,
} from "lucide-react";
import { logoutApi } from "../api/auth";
import { useAuth } from "../auth/AuthProvider";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-glow backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition before:duration-500",
        "before:bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.14),transparent_45%)]",
        hover && "hover:before:opacity-100",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function StatPill({
  icon,
  label,
  value,
  tone = "indigo",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "indigo" | "emerald" | "pink" | "amber";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-100"
      : tone === "pink"
      ? "bg-pink-500/10 border-pink-400/20 text-pink-100"
      : tone === "amber"
      ? "bg-amber-500/10 border-amber-400/20 text-amber-100"
      : "bg-indigo-500/10 border-indigo-400/20 text-indigo-100";

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl border px-3 py-2",
        toneClass
      )}
    >
      <div className="opacity-90">{icon}</div>
      <div className="leading-tight">
        <div className="text-[11px] opacity-80">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(99,102,241,0.28),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(236,72,153,0.20),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(34,197,94,0.16),transparent_45%)]" />

      {/* soft grid */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* floating blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/18 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 -right-24 h-80 w-80 rounded-full bg-pink-500/14 blur-3xl"
        animate={{ y: [0, 22, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-emerald-500/12 blur-3xl"
        animate={{ y: [0, -16, 0], x: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  );
}

function formatShortId(id?: string) {
  if (!id) return "—";
  if (id.length <= 10) return id;
  return `${id.slice(0, 6)}…${id.slice(-4)}`;
}

function safeJson(obj: any) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const payloadString = useMemo(() => safeJson(user), [user]);

  const display = useMemo(() => {
    const sub = (user as any)?.sub ?? (user as any)?.id;
    const email = (user as any)?.email;
    const username =
      (user as any)?.username ?? (email ? email.split("@")[0] : "User");
    return { sub, email, username };
  }, [user]);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await logoutApi();
    } finally {
      setUser(null);
      setLoggingOut(false);
    }
  };

  const copyPayload = async () => {
    try {
      await navigator.clipboard.writeText(payloadString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
      <AnimatedBackdrop />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs shadow-glow">
                <Sparkles size={16} className="text-indigo-300" />
                Premium Secure Session
                <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-zinc-200">
                  <ShieldCheck size={12} className="text-emerald-300" />
                  Verified
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Welcome,{" "}
                <span className="bg-gradient-to-r from-indigo-300 via-pink-200 to-emerald-200 bg-clip-text text-transparent">
                  {display.username}
                </span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-300/90">
                You’re authenticated using{" "}
                <span className="text-indigo-200">HttpOnly cookie</span> JWT
                session with{" "}
                <span className="text-zinc-100">refresh token rotation</span>.
                This dashboard demonstrates secure access, session visibility,
                and safety-first patterns.
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                disabled={loggingOut}
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm",
                  "hover:bg-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {loggingOut ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <LogOut size={16} />
                )}
                {loggingOut ? "Logging out..." : "Logout"}
              </motion.button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <StatPill
              icon={<Fingerprint size={16} />}
              label="User ID"
              value={formatShortId(display.sub)}
              tone="indigo"
            />
            <StatPill
              icon={<Globe size={16} />}
              label="Session"
              value="Cookie (HttpOnly)"
              tone="emerald"
            />
            <StatPill
              icon={<Lock size={16} />}
              label="Access Token"
              value="15 min"
              tone="amber"
            />
            <StatPill
              icon={<RefreshCw size={16} />}
              label="Refresh Token"
              value="7 days (rotates)"
              tone="pink"
            />
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-2 text-sm text-zinc-200">
                <KeyRound size={16} className="text-indigo-300" />
                Session Payload (from /auth/me)
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyPayload}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-300" />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? "Copied" : "Copy"}
              </motion.button>
            </div>

            <div className="px-6 pb-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <pre className="max-h-[380px] overflow-auto p-5 text-xs leading-relaxed text-zinc-200">
                  {payloadString}
                </pre>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <Server size={14} className="text-emerald-300" />
                    Backend Proof
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    This payload is returned only if the{" "}
                    <span className="text-zinc-100">access_token</span> cookie
                    is valid.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <ShieldCheck size={14} className="text-indigo-300" />
                    Secure by Default
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    No localStorage tokens. HttpOnly cookies reduce XSS token
                    theft risk.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard>
              <div className="px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-zinc-200">
                    <Activity size={16} className="text-emerald-300" />
                    Live Security Status
                  </div>
                  <span className="rounded-full border border-white/10 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-100">
                    Healthy
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    {
                      k: "Password Storage",
                      v: "bcrypt hash",
                      tone: "emerald",
                    },
                    { k: "Access Token", v: "HttpOnly cookie", tone: "indigo" },
                    { k: "Refresh Rotation", v: "enabled", tone: "pink" },
                    { k: "NoSQL Sanitizer", v: "active", tone: "amber" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-xs text-zinc-300">{row.k}</span>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-1 text-[10px]",
                          row.tone === "emerald" &&
                            "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
                          row.tone === "indigo" &&
                            "border-indigo-400/20 bg-indigo-500/10 text-indigo-100",
                          row.tone === "pink" &&
                            "border-pink-400/20 bg-pink-500/10 text-pink-100",
                          row.tone === "amber" &&
                            "border-amber-400/20 bg-amber-500/10 text-amber-100"
                        )}
                      >
                        {row.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 text-sm text-zinc-200">
                  <Sparkles size={16} className="text-pink-300" />
                  Quick Actions (demo)
                </div>

                <div className="mt-4 grid gap-3">
                  <ActionButton
                    title="Try Protected Call"
                    subtitle="Fetch /auth/me again"
                    onClick={() => window.location.reload()}
                  />
                </div>

                <p className="mt-4 text-xs text-zinc-400">
                  These actions are UI-only helpers to showcase a “real product”
                  feel.
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 text-sm text-zinc-200">
                  <ShieldCheck size={16} className="text-indigo-300" />
                  Activity Feed (mock)
                </div>

                <div className="mt-4 space-y-3">
                  <MiniEvent
                    tone="emerald"
                    title="Login successful"
                    meta="Session created (cookies set)"
                  />
                  <MiniEvent
                    tone="indigo"
                    title="Protected route verified"
                    meta="Access token validated"
                  />
                  <MiniEvent
                    tone="pink"
                    title="Refresh rotation ready"
                    meta="Re-issue tokens on expiry"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition",
        "hover:bg-white/10"
      )}
    >
      <div className="text-sm font-semibold text-zinc-100">{title}</div>
      <div className="text-xs text-zinc-400">{subtitle}</div>
    </motion.button>
  );
}

function MiniEvent({
  tone,
  title,
  meta,
}: {
  tone: "emerald" | "indigo" | "pink";
  title: string;
  meta: string;
}) {
  const dot =
    tone === "emerald"
      ? "bg-emerald-400/90"
      : tone === "pink"
      ? "bg-pink-400/90"
      : "bg-indigo-400/90";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
    >
      <span className={cn("mt-1.5 h-2 w-2 rounded-full", dot)} />
      <div>
        <div className="text-sm font-semibold text-zinc-100">{title}</div>
        <div className="text-xs text-zinc-400">{meta}</div>
      </div>
    </motion.div>
  );
}
