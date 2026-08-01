import { Router } from "express";
import { getAll, getById, createItem, updateItem, deleteItem } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/messages  (admin only)
router.get("/", requireAuth, (req, res) => {
  res.json(getAll("messages"));
});

// GET /api/messages/:id  (admin only)
router.get("/:id", requireAuth, (req, res) => {
  const item = getById("messages", req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/messages  (public)
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "name, email and message are required" });
  }
  const item = createItem("messages", {
    name,
    email,
    subject: subject || "General",
    message,
    status: "new",
    createdAt: new Date().toISOString(),
  });
  res.status(201).json(item);
});

// PUT /api/messages/:id  (admin only)
router.put("/:id", requireAuth, (req, res) => {
  const item = updateItem("messages", req.params.id, req.body || {});
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// DELETE /api/messages/:id  (admin only)
router.delete("/:id", requireAuth, (req, res) => {
  const ok = deleteItem("messages", req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
