import Container from "@/components/ui/Container";
import { api } from "@/lib/api";
import Link from "next/link";
import { collectSchedule } from "@/lib/parser";
import SearchBar from "@/components/SearchBar";

async function getSchedule() {
  return api<any>(`/anime/schedule`);
}

export default async function Page() {
  const data = await getSchedule();
  const buckets = collectSchedule(data);
  const days = Object.keys(buckets || {});
  return (
    <Container>
      <SearchBar />
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Schedule</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.length === 0 && (
          <div className="rounded-md border p-4 text-sm opacity-70">No schedule</div>
        )}
        {days.map((day) => (
          <div key={day} className="rounded-lg border p-4">
            <h2 className="mb-2 text-lg font-medium">{day}</h2>
            <ul className="space-y-1 text-sm">
              {(Array.isArray(buckets[day]) ? buckets[day] : []).map((it: any, i: number) => (
                <li key={(it?.slug || it?.title || i).toString()}>
                  <Link href={`/anime/${it?.slug || "#"}`} className="hover:underline">
                    {it?.title || it?.name || "Untitled"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
