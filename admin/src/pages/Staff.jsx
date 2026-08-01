import { useEffect, useState } from "react";
import { getStaff, createStaff, updateStaff, deleteStaff } from "../api";
import Spinner from "../components/Spinner";

const emptyForm = { name: "", role: "", bio: "", img: "" };

export default function Staff() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    getStaff()
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
        await updateStaff(editingId, form);
      } else {
        await createStaff(form);
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
    if (!window.confirm("Delete this staff member?")) return;
    try {
      await deleteStaff(id);
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
            Staff & Leadership
          </h2>
          <p className="text-sm text-navy-500">{items.length} team members</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setForm(emptyForm);
            setEditingId(null);
          }}
          className="rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          {showForm ? "Cancel" : "+ Add Member"}
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
            {editingId ? "Edit Staff" : "New Staff"}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-1 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Role *
              </label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
                className="mt-1 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="mt-1 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Photo URL
              </label>
              <input
                type="text"
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                className="mt-1 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-900 transition hover:bg-gold-400"
          >
            {editingId ? "Update Member" : "Add Member"}
          </button>
        </form>
      )}

      {/* Staff cards view */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-48 overflow-hidden bg-navy-100">
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl text-navy-300">
                  {item.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-gold-400">
                  {item.role}
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed text-navy-600 line-clamp-3">
                {item.bio}
              </p>
              <div className="mt-3 flex gap-2">
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
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-16 text-center text-navy-400">
            No staff members yet.
          </div>
        )}
      </div>
    </div>
  );
}
