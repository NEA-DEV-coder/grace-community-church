import { Router } from "express";
import { getAll, getById, createItem, updateItem, deleteItem } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/events  (public)
router.get("/", (req, res) => {
  res.json(getAll("events"));
});

// GET /api/events/:id  (public)
router.get("/:id", (req, res) => {
  const item = getById("events", req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/events  (admin)
router.post("/", requireAuth, (req, res) => {
  const { title, date, time, location, tag, description } = req.body || {};
  if (!title || !date) {
    return res.status(400).json({ error: "title and date are required" });
  }
  const item = createItem("events", {
    title,
    date: date,
    time: time || "",
    location: location || "",
    tag: tag || "General",
    description: description || "",
  });
  res.status(201).json(item);
});

// PUT /api/events/:id  (admin)
router.put("/:id", requireAuth, (req, res) => {
  const item = updateItem("events", req.params.id, req.body || {});
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// DELETE /api/events/:id  (admin)
router.delete("/:id", requireAuth, (req, res) => {
  const ok = deleteItem("events", req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
