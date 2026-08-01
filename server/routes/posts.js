import { Router } from "express";
import { getAll, getById, createItem, updateItem, deleteItem } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/posts  (public)
router.get("/", (req, res) => {
  res.json(getAll("posts"));
});

// GET /api/posts/:id  (public)
router.get("/:id", (req, res) => {
  const item = getById("posts", req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/posts  (admin)
router.post("/", requireAuth, (req, res) => {
  const { title, excerpt, content, author, date, category, image, tags } =
    req.body || {};
  if (!title) return res.status(400).json({ error: "title is required" });
  const item = createItem("posts", {
    title,
    excerpt: excerpt || "",
    content: content || "",
    author: author || "Grace Community Church",
    date: date || new Date().toISOString().slice(0, 10),
    category: category || "General",
    image: image || "",
    tags: Array.isArray(tags) ? tags : [],
  });
  res.status(201).json(item);
});

// PUT /api/posts/:id  (admin)
router.put("/:id", requireAuth, (req, res) => {
  const item = updateItem("posts", req.params.id, req.body || {});
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// DELETE /api/posts/:id  (admin)
router.delete("/:id", requireAuth, (req, res) => {
  const ok = deleteItem("posts", req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
