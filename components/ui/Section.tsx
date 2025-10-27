import { PropsWithChildren } from "react";

export default function Section({ title, children, right }: PropsWithChildren<{ title?: string; right?: React.ReactNode }>) {
  return (
    <section className="mb-12">
      <div className={(title || right) ? "mb-6 flex items-center justify-between" : "mb-6 flex items-center justify-between sr-only"}>
        {title ? (
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent max-w-20" />
          </div>
        ) : <span />}
        {right}
      </div>
      <div className="relative">
        {children}
      </div>
    </section>
  );
}
