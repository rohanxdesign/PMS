import { WeekCalendar } from "@/app/components/calendar/Calendar";

export default function MarketingCalendar({ params }: { params: { id: string } }) {
  const calendarName = decodeURIComponent(params.id ?? "Calendar");
  const items = [
    { day: 0, title: "Post: Client Reel" },
    { day: 2, title: "Design: Carousel" },
    { day: 4, title: "Publish: Blog" },
  ];
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Marketing – Calendar: {calendarName}</h1>
      <WeekCalendar items={items} />
    </main>
  );
}



