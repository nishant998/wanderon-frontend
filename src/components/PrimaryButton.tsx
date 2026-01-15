import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type PrimaryButtonProps = HTMLMotionProps<"button"> & {
  loading?: boolean;
  children?: React.ReactNode;
};

export default function PrimaryButton({
  loading,
  children,
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      disabled={loading || disabled}
      {...props}
      className={clsx(
        "relative w-full overflow-hidden rounded-2xl px-4 py-3 text-sm font-semibold",
        "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400",
        "shadow-[0_18px_60px_rgba(99,102,241,0.25)]",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 opacity-30 [background-size:200%_200%] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.25)_25%,transparent_50%)] animate-shimmer" />

      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : null}
        {children}
      </span>
    </motion.button>
  );
}
