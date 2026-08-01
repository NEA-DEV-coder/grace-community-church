import { Router } from "express";
import { getAll, getById, createItem, updateItem, deleteItem } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/prayer-requests  (admin only)
router.get("/", requireAuth, (req, res) => {
  res.json(getAll("prayerRequests"));
});

// GET /api/prayer-requests/:id  (admin only)
router.get("/:id", requireAuth, (req, res) => {
  const item = getById("prayerRequests", req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/prayer-requests  (public)
router.post("/", (req, res) => {
  const { name, email, request, isPrivate } = req.body || {};
  if (!name || !request) {
    return res.status(400).json({ error: "name and request are required" });
  }
  const item = createItem("prayerRequests", {
    name,
    email: email || "",
    request,
    isPrivate: !!isPrivate,
    status: "new",
    createdAt: new Date().toISOString(),
  });
  res.status(201).json(item);
});

// PUT /api/prayer-requests/:id  (admin only)
router.put("/:id", requireAuth, (req, res) => {
  const item = updateItem("prayer-requests", req.params.id, req.body || {});
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// DELETE /api/prayer-requests/:id  (admin only)
router.delete("/:id", requireAuth, (req, res) => {
  const ok = deleteItem("prayer-requests", req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
