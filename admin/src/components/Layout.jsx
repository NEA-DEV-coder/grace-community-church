import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../auth";

const navItems = [
  { to: "/", label: "Dashboard", icon: "📊", end: true },
  { to: "/sermons", label: "Sermons", icon: "🎙️" },
  { to: "/events", label: "Events", icon: "📅" },
  { to: "/posts", label: "Blog Posts", icon: "📝" },
  { to: "/staff", label: "Staff", icon: "👥" },
  { to: "/prayer-requests", label: "Prayer Requests", icon: "🙏" },
  { to: "/messages", label: "Messages", icon: "✉️" },
  { to: "/donations", label: "Donations", icon: "💳" },
];

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-navy-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 text-white">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-serif text-base font-bold text-navy-900">
            GC
          </span>
          <div>
            <p className="font-serif text-sm font-semibold leading-tight">
              Grace Community
            </p>
            <p className="text-[11px] uppercase tracking-widest text-gold-400">
              Admin Panel
            </p>
          </div>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-gold-500 text-navy-900"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-gold-300">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <p className="truncate text-xs text-white/55">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-navy-100 bg-white px-8">
          <div>
            <h1 className="font-serif text-lg font-semibold text-navy-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="https://nea-dev-coder.github.io/grace-community-church/"
              target="_blank"
              className="rounded-full border border-navy-200 px-4 py-1.5 text-xs font-semibold text-navy-700 transition hover:bg-navy-900 hover:text-white"
            >
              View Public Site ↗
            </Link>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
