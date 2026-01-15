export default function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.18),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.14),transparent_45%)]" />

      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl animate-float" />
      <div className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl animate-float [animation-delay:1.2s]" />
      <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl animate-float [animation-delay:2.2s]" />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
