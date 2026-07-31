import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthDays = [
  { day: 1, events: [] },
  { day: 2, events: [] },
  {
    day: 3,
    events: [{ title: "Bible Study", time: "7:00 PM", color: "bg-gold-500" }],
  },
  { day: 4, events: [] },
  { day: 5, events: [] },
  { day: 6, events: [] },
  { day: 7, events: [] },
  {
    day: 8,
    events: [
      {
        title: "Sunday Worship",
        time: "9:00 & 11:00 AM",
        color: "bg-navy-700",
      },
    ],
  },
  { day: 9, events: [] },
  {
    day: 10,
    events: [{ title: "Bible Study", time: "7:00 PM", color: "bg-gold-500" }],
  },
  { day: 11, events: [] },
  { day: 12, events: [] },
  { day: 13, events: [] },
  { day: 14, events: [] },
  {
    day: 15,
    events: [
      {
        title: "Sunday Worship",
        time: "9:00 & 11:00 AM",
        color: "bg-navy-700",
      },
      { title: "Kids' Fun Fair", time: "12:00 PM", color: "bg-gold-500" },
    ],
  },
  { day: 16, events: [] },
  {
    day: 17,
    events: [{ title: "Bible Study", time: "7:00 PM", color: "bg-gold-500" }],
  },
  { day: 18, events: [] },
  { day: 19, events: [] },
  { day: 20, events: [] },
  { day: 21, events: [] },
  {
    day: 22,
    events: [
      {
        title: "Sunday Worship",
        time: "9:00 & 11:00 AM",
        color: "bg-navy-700",
      },
    ],
  },
  { day: 23, events: [] },
  {
    day: 24,
    events: [{ title: "Bible Study", time: "7:00 PM", color: "bg-gold-500" }],
  },
  { day: 25, events: [] },
  {
    day: 26,
    events: [
      { title: "Summer Picnic", time: "11:00 AM", color: "bg-gold-500" },
    ],
  },
  { day: 27, events: [] },
  { day: 28, events: [] },
  {
    day: 29,
    events: [
      {
        title: "Sunday Worship",
        time: "9:00 & 11:00 AM",
        color: "bg-navy-700",
      },
    ],
  },
  {
    day: 30,
    events: [{ title: "Prayer Night", time: "7:30 PM", color: "bg-gold-500" }],
  },
];

const upcomingEvents = [
  {
    title: "Sunday Worship Gathering",
    date: "Every Sunday",
    time: "9:00 & 11:00 AM",
    location: "Main Sanctuary",
    tag: "Weekly",
  },
  {
    title: "Wednesday Bible Study",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Fellowship Hall",
    tag: "Weekly",
  },
  {
    title: "Kids' Fun Fair",
    date: "June 15, 2025",
    time: "12:00 PM – 4:00 PM",
    location: "Church Grounds",
    tag: "Family",
  },
  {
    title: "Community Summer Picnic",
    date: "June 26, 2025",
    time: "11:00 AM – 3:00 PM",
    location: "Riverside Park",
    tag: "Outreach",
  },
  {
    title: "Prayer Night",
    date: "June 30, 2025",
    time: "7:30 PM",
    location: "Prayer Chapel",
    tag: "Prayer",
  },
];

export default function Events() {
  const [month, setMonth] = useState("June 2025");

  return (
    <section id="events" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-600">
            Event Calendar
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
            What's Happening
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            From worship gatherings to community outreach, there's always a
            place for you to connect.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Calendar card */}
          <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-semibold text-navy-900">
                {month}
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMonth("May 2025")}
                  className="rounded-lg bg-white p-2 text-navy-700 shadow-sm transition hover:bg-navy-100"
                  aria-label="Previous month"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setMonth("June 2025")}
                  className="rounded-lg bg-white p-2 text-navy-700 shadow-sm transition hover:bg-navy-100"
                  aria-label="Next month"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Weekday header */}
            <div className="mt-6 grid grid-cols-7 gap-1 text-center">
              {weekDays.map((d) => (
                <span
                  key={d}
                  className="py-2 text-xs font-bold uppercase tracking-wider text-navy-500"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map(({ day, events }, i) => (
                <div
                  key={i}
                  className="relative flex min-h-[4rem] flex-col items-center rounded-lg bg-white p-1.5 shadow-sm"
                >
                  <span className="text-sm font-medium text-navy-700">
                    {day}
                  </span>
                  {events.map((ev, idx) => (
                    <span
                      key={idx}
                      className={`mt-1 hidden w-full rounded-full ${ev.color} px-1 py-0.5 text-center text-[10px] font-semibold text-white sm:block`}
                      title={`${ev.title} · ${ev.time}`}
                    >
                      {ev.title.split(" ")[0]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming events list */}
          <div className="flex flex-col gap-4">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.title}
                className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Date badge */}
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 text-white">
                  <span className="text-lg font-bold leading-none">
                    {ev.date.split(" ").pop().replace(",", "")}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-wider text-gold-400">
                    {ev.date.includes("Every")
                      ? "Weekly"
                      : ev.date.split(" ")[0]}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-800">
                    {ev.tag}
                  </span>
                  <h3 className="mt-1 truncate font-serif text-lg font-semibold text-navy-900">
                    {ev.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-navy-600">
                    {ev.time} · {ev.location}
                  </p>
                </div>
                <button
                  type="button"
                  className="hidden shrink-0 rounded-full border border-navy-200 px-4 py-1.5 text-xs font-semibold text-navy-700 transition hover:bg-navy-900 hover:text-white sm:block"
                >
                  RSVP
                </button>
              </div>
            ))}
            <a
              href="#events"
              className="mt-2 text-center text-sm font-semibold text-gold-700 transition hover:text-gold-600"
            >
              View Full Calendar →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
