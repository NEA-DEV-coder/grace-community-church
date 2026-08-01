import { useEffect, useState } from "react";
import { getMessages, updateMessage, deleteMessage } from "../api";
import Spinner from "../components/Spinner";

export default function Messages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const load = () =>
    getMessages()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateMessage(id, { status });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      setSelected(null);
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
          ✉️ Contact Messages
        </h2>
        <p className="text-sm text-navy-500">
          {items.length} total ·{" "}
          {items.filter((m) => m.status === "new").length} unread
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-navy-100 bg-white p-10 text-center text-navy-400">
          No messages yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* List */}
          <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto">
            {items.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`w-full rounded-xl border p-4 text-left transition ${selected?.id === m.id ? "border-gold-500 bg-gold-50" : "border-navy-100 bg-white hover:bg-navy-25"} ${m.status === "new" ? "border-l-4 border-l-gold-500" : ""}`}
              >
                <p className="truncate text-sm font-semibold text-navy-800">
                  {m.name}
                </p>
                <p className="truncate text-xs text-navy-400">
                  {m.subject || m.email}
                </p>
                <p className="mt-1 text-xs text-navy-300">
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy-900">
                      {selected.name}
                    </h3>
                    <p className="text-sm text-navy-500">{selected.email}</p>
                    <p className="text-sm font-medium text-navy-700 mt-1">
                      {selected.subject}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {selected.status === "new" && (
                      <button
                        onClick={() => handleStatus(selected.id, "read")}
                        className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-50"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-navy-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-navy-800">
                    {selected.message}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-navy-400">
                  <span>
                    Received: {new Date(selected.createdAt).toLocaleString()}
                  </span>
                  <span>Status: {selected.status}</span>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-navy-100 bg-white text-navy-400">
                Select a message to view
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
