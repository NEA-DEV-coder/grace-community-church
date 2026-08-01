import { Router } from "express";
import { getAll, getById, createItem, updateItem, deleteItem } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/sermons  (public)
router.get("/", (req, res) => {
  const items = getAll("sermons");
  const { category } = req.query;
  const filtered =
    category && category !== "All"
      ? items.filter((s) => s.category === category)
      : items;
  res.json(filtered);
});

// GET /api/sermons/:id  (public)
router.get("/:id", (req, res) => {
  const item = getById("sermons", req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/sermons  (admin)
router.post("/", requireAuth, (req, res) => {
  const {
    title,
    passage,
    speaker,
    date,
    category,
    duration,
    img,
    videoUrl,
    audioUrl,
  } = req.body || {};
  if (!title || !speaker) {
    return res.status(400).json({ error: "title and speaker are required" });
  }
  const item = createItem("sermons", {
    title,
    passage: passage || "",
    speaker,
    date: date || new Date().toISOString().slice(0, 10),
    category: category || "Sunday Sermons",
    duration: duration || "",
    img: img || "",
    videoUrl: videoUrl || "",
    audioUrl: audioUrl || "",
  });
  res.status(201).json(item);
});

// PUT /api/sermons/:id  (admin)
router.put("/:id", requireAuth, (req, res) => {
  const item = updateItem("sermons", req.params.id, req.body || {});
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// DELETE /api/sermons/:id  (admin)
router.delete("/:id", requireAuth, (req, res) => {
  const ok = deleteItem("sermons", req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
