import express from "express";
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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/prayer-requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/donations", donationRoutes);

// 404 handler
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
    `🚀 Grace Community Church API running at http://localhost:${PORT}`,
  );
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
