import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSermons,
  getEvents,
  getPosts,
  getStaff,
  getPrayerRequests,
  getMessages,
  getDonations,
} from "../api";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getSermons(),
      getEvents(),
      getPosts(),
      getStaff(),
      getPrayerRequests(),
      getMessages(),
      getDonations(),
    ])
      .then(
        ([
          sermons,
          events,
          posts,
          staff,
          prayerRequests,
          messages,
          donations,
        ]) => {
          setData({
            sermons,
            events,
            posts,
            staff,
            prayerRequests,
            messages,
            donations,
          });
        },
      )
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-700">
        Failed to load dashboard: {error}
      </div>
    );
  }

  if (!data) return <Spinner />;

  const totalDonations = data.donations.reduce(
    (sum, d) => sum + Number(d.amount || 0),
    0,
  );
  const newRequests = data.prayerRequests.filter(
    (r) => r.status === "new",
  ).length;
  const newMessages = data.messages.filter((m) => m.status === "new").length;

  const stats = [
    {
      label: "Sermons",
      value: data.sermons.length,
      to: "/sermons",
      color: "bg-navy-900",
    },
    {
      label: "Events",
      value: data.events.length,
      to: "/events",
      color: "bg-gold-600",
    },
    {
      label: "Blog Posts",
      value: data.posts.length,
      to: "/posts",
      color: "bg-navy-600",
    },
    {
      label: "Staff",
      value: data.staff.length,
      to: "/staff",
      color: "bg-gold-500",
    },
    {
      label: "Prayer Requests",
      value: data.prayerRequests.length,
      to: "/prayer-requests",
      color: "bg-navy-800",
    },
    {
      label: "Messages",
      value: data.messages.length,
      to: "/messages",
      color: "bg-navy-500",
    },
    {
      label: "Donations",
      value: `$${totalDonations.toLocaleString()}`,
      to: "/donations",
      color: "bg-gold-700",
    },
  ];

  const recent = [
    ...data.messages.map((m) => ({
      type: "Message",
      title: m.name,
      sub: m.subject,
      time: m.createdAt,
    })),
    ...data.prayerRequests.map((r) => ({
      type: "Prayer",
      title: r.name,
      sub: r.request,
      time: r.createdAt,
    })),
    ...data.donations.map((d) => ({
      type: "Donation",
      title: d.name,
      sub: `$${d.amount} · ${d.fund}`,
      time: d.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 8);

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-navy-900">
          Welcome back 👋
        </h2>
        <p className="mt-1 text-navy-500">
          Here's what's happening across your church site today.
        </p>
      </div>

      {(newRequests > 0 || newMessages > 0) && (
        <div className="mb-6 flex flex-wrap gap-3 rounded-xl border border-gold-200 bg-gold-50 p-4">
          {newRequests > 0 && (
            <Link
              to="/prayer-requests"
              className="text-sm font-semibold text-gold-800 hover:underline"
            >
              🙏 {newRequests} new prayer{" "}
              {newRequests === 1 ? "request" : "requests"}
            </Link>
          )}
          {newMessages > 0 && (
            <Link
              to="/messages"
              className="text-sm font-semibold text-gold-800 hover:underline"
            >
              ✉️ {newMessages} new {newMessages === 1 ? "message" : "messages"}
            </Link>
          )}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="group rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              {s.label}
            </p>
            <p
              className={`mt-2 inline-block rounded-lg ${s.color} px-3 py-1 font-serif text-2xl font-bold text-white`}
            >
              {s.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-navy-900">
          Recent Activity
        </h3>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-navy-400">
            No activity yet. New messages, prayer requests, and donations will
            appear here.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-navy-50">
            {recent.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-base">
                  {item.type === "Message"
                    ? "✉️"
                    : item.type === "Prayer"
                      ? "🙏"
                      : "💳"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-800">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-navy-400">{item.sub}</p>
                </div>
                <span className="shrink-0 text-xs text-navy-300">
                  {new Date(item.time).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
