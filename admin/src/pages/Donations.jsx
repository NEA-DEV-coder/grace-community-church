import { useEffect, useState } from "react";
import { getDonations, deleteDonation } from "../api";
import Spinner from "../components/Spinner";

export default function Donations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () =>
    getDonations()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donation record?")) return;
    try {
      await deleteDonation(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const totalAmount = items.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const monthlyTotal = items
    .filter((d) => d.frequency === "monthly")
    .reduce((sum, d) => sum + Number(d.amount || 0), 0);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-navy-900">
          💳 Donations
        </h2>
        <p className="text-sm text-navy-500">
          {items.length} donations recorded
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Total Received
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-navy-900">
            ${totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Monthly Recurring
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-gold-600">
            ${monthlyTotal.toLocaleString()}/mo
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Avg Gift
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-navy-900">
            $
            {items.length
              ? Math.round(totalAmount / items.length).toLocaleString()
              : 0}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-navy-100 bg-white p-10 text-center text-navy-400">
          No donations yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs font-semibold uppercase tracking-wider text-navy-500">
              <tr>
                <th className="px-5 py-3">Donor</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Frequency</th>
                <th className="px-5 py-3">Fund</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {items.map((d) => (
                <tr key={d.id} className="transition hover:bg-navy-25">
                  <td className="px-5 py-3 font-medium text-navy-800">
                    {d.name}
                  </td>
                  <td className="px-5 py-3 text-navy-600">{d.email}</td>
                  <td className="px-5 py-3 font-bold text-navy-900">
                    ${Number(d.amount).toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${d.frequency === "monthly" ? "bg-gold-100 text-gold-800" : "bg-navy-100 text-navy-700"}`}
                    >
                      {d.frequency}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-navy-600">{d.fund}</td>
                  <td className="px-5 py-3 text-navy-600">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
