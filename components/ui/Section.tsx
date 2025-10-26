import { PropsWithChildren } from "react";

export default function Section({ title, children, right }: PropsWithChildren<{ title?: string; right?: React.ReactNode }>) {
  return (
    <section className="mb-8">
      {(title || right) && (
        <div className="mb-3 flex items-center justify-between">
          {title ? <h1 className="text-2xl font-semibold tracking-tight">{title}</h1> : <span />}
          {right}
        </div>
      )}
      {children}
    </section>
  );
}
