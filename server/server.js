import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { loadDb } from "./db.js";

import authRoutes from "./routes/auth.js";
import sermonRoutes from "./routes/sermons.js";
import eventRoutes from "./routes/events.js";
import postRoutes from "./routes/posts.js";
import staffRoutes from "./routes/staff.js";
import requestRoutes from "./routes/requests.js";
import messageRoutes from "./routes/messages.js";
import donationRoutes from "./routes/donations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/prayer-requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/donations", donationRoutes);

// --- Static sites -----------------------------------------------------
// Public site (built from ../dist, base "/grace-community-church/")
const publicDist = path.join(__dirname, "..", "dist");
app.use("/grace-community-church", express.static(publicDist));

// Admin dashboard (built from ../admin/dist, base "/admin/")
const adminDist = path.join(__dirname, "..", "admin", "dist");
app.use("/admin", express.static(adminDist));

// SPA fallback for admin routes
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(adminDist, "index.html"), (err) => {
    if (err)
      res
        .status(404)
        .send("Admin build not found. Run `cd admin && npm run build`.");
  });
});

// SPA fallback for public site
app.get("/grace-community-church/*", (req, res) => {
  res.sendFile(path.join(publicDist, "index.html"), (err) => {
    if (err)
      res.status(404).send("Public build not found. Run `npm run build`.");
  });
});

// Root redirect -> public site
app.get("/", (req, res) => {
  res.redirect("/grace-community-church/");
});

// 404 for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

try {
  loadDb();
  console.log("📦 Data store loaded");
} catch (err) {
  console.warn(`⚠️  ${err.message}`);
  console.warn(
    "Run `npm run seed` in the server directory to initialize data.",
  );
}

app.listen(PORT, () => {
  console.log(
    `🚀 Grace Community Church server running at http://localhost:${PORT}`,
  );
  console.log(
    `   Public site:     http://localhost:${PORT}/grace-community-church/`,
  );
  console.log(`   Admin dashboard: http://localhost:${PORT}/admin`);
  console.log(`   Health check:    http://localhost:${PORT}/api/health`);
});
