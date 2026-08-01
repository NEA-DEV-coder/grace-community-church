const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export function getSermons(category) {
  const params =
    category && category !== "All"
      ? `?category=${encodeURIComponent(category)}`
      : "";
  return request(`/sermons${params}`);
}

export function getEvents() {
  return request("/events");
}

export function getPosts() {
  return request("/posts");
}

export function getStaff() {
  return request("/staff");
}

export function submitPrayerRequest(data) {
  return request("/prayer-requests", { method: "POST", body: data });
}

export function submitContactMessage(data) {
  return request("/messages", { method: "POST", body: data });
}
