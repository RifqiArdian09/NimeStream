import Link from "next/link";

export default function Pagination({
  basePath,
  current,
  hasNext = true,
  mode = "segment",
  paramName = "page",
}: {
  basePath: string;
  current: number;
  hasNext?: boolean;
  mode?: "segment" | "query";
  paramName?: string;
}) {
  const prev = current > 1 ? current - 1 : 1;
  const next = current + 1;
  const makeHref = (n: number) =>
    mode === "query" ? `${basePath}?${paramName}=${n}` : `${basePath}/${n}`;
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Link
        href={makeHref(prev)}
        className={`rounded-md border px-3 py-1.5 text-sm ${
          current === 1 ? "pointer-events-none opacity-50" : ""
        }`}
        aria-disabled={current === 1}
      >
        Prev
      </Link>
      <span className="text-sm opacity-70">Page {current}</span>
      <Link
        href={makeHref(next)}
        className={`rounded-md border px-3 py-1.5 text-sm ${
          hasNext ? "" : "pointer-events-none opacity-50"
        }`}
        aria-disabled={!hasNext}
      >
        Next
      </Link>
    </div>
  );
}
