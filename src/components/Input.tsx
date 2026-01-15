import React from "react";
import clsx from "clsx";

export default function Input({
  label,
  error,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-200/90">{label}</label>
      <div
        className={clsx(
          "group flex items-center gap-2 rounded-2xl border bg-black/20 px-4 py-3",
          "border-white/10 focus-within:border-indigo-400/40 focus-within:ring-2 focus-within:ring-indigo-500/20",
          error && "border-rose-400/40 ring-2 ring-rose-500/10"
        )}
      >
        {icon ? <span className="text-zinc-400 group-focus-within:text-indigo-300">{icon}</span> : null}
        <input
          {...props}
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
        />
      </div>
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
