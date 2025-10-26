import {
  Pagination as UiPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    <UiPagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={makeHref(prev)}
            aria-disabled={current === 1}
            className={current === 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {/* First page shortcut when far from start */}
        {current > 2 && (
          <>
            <PaginationItem>
              <PaginationLink href={makeHref(1)}>1</PaginationLink>
            </PaginationItem>
            {current > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Previous number */}
        {current > 1 && (
          <PaginationItem>
            <PaginationLink href={makeHref(current - 1)}>{current - 1}</PaginationLink>
          </PaginationItem>
        )}

        {/* Current page indicator */}
        <PaginationItem>
          <PaginationLink href={makeHref(current)} isActive>
            {current}
          </PaginationLink>
        </PaginationItem>

        {/* Next number */}
        {hasNext && (
          <PaginationItem>
            <PaginationLink href={makeHref(current + 1)}>{current + 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={makeHref(next)}
            aria-disabled={!hasNext}
            className={!hasNext ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </UiPagination>
  );
}
