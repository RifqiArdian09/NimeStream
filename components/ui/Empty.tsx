export default function Empty({ children = "No data" }: { children?: React.ReactNode }) {
  return <div className="rounded-lg border p-4 text-sm opacity-70">{children}</div>;
}
