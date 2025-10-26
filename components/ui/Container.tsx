import { PropsWithChildren } from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">{children}</div>;
}
