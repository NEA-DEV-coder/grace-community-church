import { useEffect, useState } from "react";
import {
  getPrayerRequests,
  updatePrayerRequest,
  deletePrayerRequest,
} from "../api";
import Spinner from "../components/Spinner";

export default function PrayerRequests() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () =>
    getPrayerRequests()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updatePrayerRequest(id, { status });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this prayer request?")) return;
    try {
      await deletePrayerRequest(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-navy-900">
          🙏 Prayer Requests
        </h2>
        <p className="text-sm text-navy-500">
          {items.length} total ·{" "}
          {items.filter((r) => r.status === "new").length} new
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-navy-100 bg-white p-10 text-center text-navy-400">
          No prayer requests yet.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((r) => (
            <div
              key={r.id}
              className={`rounded-2xl border p-5 shadow-sm ${r.status === "new" ? "border-gold-200 bg-gold-50" : "border-navy-100 bg-white"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold text-navy-900">
                      {r.name}
                    </h3>
                    {r.status === "new" && (
                      <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                        New
                      </span>
                    )}
                    {r.status === "prayed" && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 uppercase">
                        Prayed
                      </span>
                    )}
                  </div>
                  {r.email && (
                    <p className="text-xs text-navy-400">{r.email}</p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">
                    {r.request}
                  </p>
                  <p className="mt-2 text-xs text-navy-400">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {r.status === "new" && (
                    <button
                      onClick={() => handleStatus(r.id, "prayed")}
                      className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-50"
                    >
                      Mark Prayed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
