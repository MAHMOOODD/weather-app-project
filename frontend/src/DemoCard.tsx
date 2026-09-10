export default function DemoCard() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border border-border bg-card p-6 shadow-lg transition-all">
        <h1 className="text-3xl font-bold text-foreground">
          Tailwind + shadcn
        </h1>

        <p className="mt-3 text-muted-foreground">
          This card changes automatically when Dark Mode changes.
        </p>

        <input
          placeholder="Your name"
          className="mt-6 w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-ring"
        />

        <button className="mt-6 w-full rounded-lg bg-primary py-3 text-primary-foreground">
          Login
        </button>

        <div className="mt-6 rounded-lg bg-secondary p-4">
          <p className="text-secondary-foreground">
            Secondary Background
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-accent p-4">
          <p className="text-accent-foreground">
            Accent Background
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-destructive p-4 text-white">
          Destructive Color
        </div>
      </div>
    </div>
  );
}