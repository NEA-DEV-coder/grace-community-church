const API_BASE = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// Auth
export const login = (email, password) =>
  request("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
export const me = () => request("/auth/me");

// Sermons
export const getSermons = () => request("/sermons");
export const createSermon = (data) =>
  request("/sermons", { method: "POST", body: data });
export const updateSermon = (id, data) =>
  request(`/sermons/${id}`, { method: "PUT", body: data });
export const deleteSermon = (id) =>
  request(`/sermons/${id}`, { method: "DELETE" });

// Events
export const getEvents = () => request("/events");
export const createEvent = (data) =>
  request("/events", { method: "POST", body: data });
export const updateEvent = (id, data) =>
  request(`/events/${id}`, { method: "PUT", body: data });
export const deleteEvent = (id) =>
  request(`/events/${id}`, { method: "DELETE" });

// Posts
export const getPosts = () => request("/posts");
export const createPost = (data) =>
  request("/posts", { method: "POST", body: data });
export const updatePost = (id, data) =>
  request(`/posts/${id}`, { method: "PUT", body: data });
export const deletePost = (id) => request(`/posts/${id}`, { method: "DELETE" });

// Staff
export const getStaff = () => request("/staff");
export const createStaff = (data) =>
  request("/staff", { method: "POST", body: data });
export const updateStaff = (id, data) =>
  request(`/staff/${id}`, { method: "PUT", body: data });
export const deleteStaff = (id) =>
  request(`/staff/${id}`, { method: "DELETE" });

// Prayer requests
export const getPrayerRequests = () => request("/prayer-requests");
export const createPrayerRequest = (data) =>
  request("/prayer-requests", { method: "POST", body: data, auth: false });
export const updatePrayerRequest = (id, data) =>
  request(`/prayer-requests/${id}`, { method: "PUT", body: data });
export const deletePrayerRequest = (id) =>
  request(`/prayer-requests/${id}`, { method: "DELETE" });

// Messages
export const getMessages = () => request("/messages");
export const createMessage = (data) =>
  request("/messages", { method: "POST", body: data, auth: false });
export const updateMessage = (id, data) =>
  request(`/messages/${id}`, { method: "PUT", body: data });
export const deleteMessage = (id) =>
  request(`/messages/${id}`, { method: "DELETE" });

// Donations
export const getDonations = () => request("/donations");
export const createDonation = (data) =>
  request("/donations", { method: "POST", body: data, auth: false });
export const deleteDonation = (id) =>
  request(`/donations/${id}`, { method: "DELETE" });
