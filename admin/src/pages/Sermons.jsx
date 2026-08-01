import { useEffect, useState } from "react";
import { getSermons, createSermon, updateSermon, deleteSermon } from "../api";
import Spinner from "../components/Spinner";

const emptyForm = {
  title: "",
  passage: "",
  speaker: "",
  date: "",
  category: "Sunday Sermons",
  duration: "",
  img: "",
  videoUrl: "",
  audioUrl: "",
};

export default function Sermons() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    getSermons()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await updateSermon(editingId, form);
      } else {
        await createSermon(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sermon?")) return;
    try {
      await deleteSermon(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">
            Sermons
          </h2>
          <p className="text-sm text-navy-500">
            {items.length} sermons on file
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setForm(emptyForm);
            setEditingId(null);
          }}
          className="rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          {showForm ? "Cancel" : "+ Add Sermon"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 font-serif text-lg font-semibold text-navy-900">
            {editingId ? "Edit Sermon" : "New Sermon"}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "title",
              "passage",
              "speaker",
              "date",
              "duration",
              "img",
              "videoUrl",
              "audioUrl",
            ].map((f) => (
              <div key={f}>
                <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  {f.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={f === "date" ? "date" : "text"}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  required={f === "title" || f === "speaker"}
                  className="mt-1 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              >
                {["Sunday Sermons", "Bible Study", "Special Series"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-900 transition hover:bg-gold-400"
          >
            {editingId ? "Update Sermon" : "Add Sermon"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 text-xs font-semibold uppercase tracking-wider text-navy-500">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Speaker</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {items.map((item) => (
              <tr key={item.id} className="transition hover:bg-navy-25">
                <td className="px-5 py-3 font-medium text-navy-800">
                  {item.title}
                </td>
                <td className="px-5 py-3 text-navy-600">{item.speaker}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-5 py-3 text-navy-600">{item.date}</td>
                <td className="px-5 py-3 text-navy-600">{item.duration}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-lg border border-navy-200 px-3 py-1 text-xs font-semibold text-navy-700 transition hover:bg-navy-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-10 text-center text-navy-400"
                >
                  No sermons yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
