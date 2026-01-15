import React from "react";
import { motion } from "framer-motion";
import AnimatedBackdrop from "./AnimatedBackdrop";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackdrop />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200 shadow-glow">
              Secure Auth • JWT Cookie • MongoDB
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-1 text-sm text-zinc-300/90">{subtitle}</p>
            </div>

            {children}

            {footer ? <div className="mt-6 border-t border-white/10 pt-4">{footer}</div> : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
