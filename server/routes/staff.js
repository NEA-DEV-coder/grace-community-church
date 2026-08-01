import { Router } from "express";
import { getAll, getById, createItem, updateItem, deleteItem } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/staff  (public)
router.get("/", (req, res) => {
  res.json(getAll("staff"));
});

// GET /api/staff/:id  (public)
router.get("/:id", (req, res) => {
  const item = getById("staff", req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/staff  (admin)
router.post("/", requireAuth, (req, res) => {
  const { name, role, bio, img } = req.body || {};
  if (!name || !role) {
    return res.status(400).json({ error: "name and role are required" });
  }
  const item = createItem("staff", {
    name,
    role,
    bio: bio || "",
    img: img || "",
  });
  res.status(201).json(item);
});

// PUT /api/staff/:id  (admin)
router.put("/:id", requireAuth, (req, res) => {
  const item = updateItem("staff", req.params.id, req.body || {});
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// DELETE /api/staff/:id  (admin)
router.delete("/:id", requireAuth, (req, res) => {
  const ok = deleteItem("staff", req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
