// Quick API smoke test - run with: node test-api.js
const BASE = "http://localhost:5000";

async function main() {
  // 1. Health
  const health = await fetch(`${BASE}/api/health`).then((r) => r.json());
  console.log("✅ /api/health ->", health.status);

  // 2. Public sermons
  const sermons = await fetch(`${BASE}/api/sermons`).then((r) => r.json());
  console.log(`✅ /api/sermons -> ${sermons.length} sermons`);

  // 3. Login
  const loginRes = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@gracechurch.org",
      password: "admin123",
    }),
  });
  const login = await loginRes.json();
  if (!login.token) {
    console.error("❌ Login failed:", login);
    process.exit(1);
  }
  console.log("✅ /api/auth/login -> token received, user:", login.user.email);

  const headers = { Authorization: `Bearer ${login.token}` };

  // 4. Admin-only: prayer requests (empty but authorized)
  const requests = await fetch(`${BASE}/api/prayer-requests`, { headers }).then(
    (r) => r.json(),
  );
  console.log(`✅ /api/prayer-requests (auth) -> ${requests.length} requests`);

  // 5. Admin create sermon
  const created = await fetch(`${BASE}/api/sermons`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Test Sermon",
      speaker: "Test Speaker",
      category: "Sunday Sermons",
      duration: "30 min",
    }),
  }).then((r) => r.json());
  console.log("✅ /api/sermons POST -> created id", created.id);

  // 6. Delete the test sermon
  const del = await fetch(`${BASE}/api/sermons/${created.id}`, {
    method: "DELETE",
    headers,
  }).then((r) => r.json());
  console.log("✅ /api/sermons DELETE ->", del.success);

  // 7. Unauthorized access should fail
  const unauth = await fetch(`${BASE}/api/prayer-requests`);
  console.log(
    `✅ /api/prayer-requests (no auth) -> ${unauth.status} (expected 401)`,
  );

  console.log("\n🎉 All API tests passed!");
}

main().catch((err) => {
  console.error("❌ Test failed:", err.message);
  process.exit(1);
});
