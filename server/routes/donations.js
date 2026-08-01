import { Router } from "express";
import { getAll, getById, createItem, deleteItem } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/donations  (admin only)
router.get("/", requireAuth, (req, res) => {
  res.json(getAll("donations"));
});

// GET /api/donations/:id  (admin only)
router.get("/:id", requireAuth, (req, res) => {
  const item = getById("donations", req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/donations  (public)
router.post("/", (req, res) => {
  const { name, email, amount, frequency, fund } = req.body || {};
  const amt = Number(amount);
  if (!name || !email || !amt || amt <= 0) {
    return res
      .status(400)
      .json({ error: "name, email and a valid amount are required" });
  }
  const item = createItem("donations", {
    name,
    email,
    amount: amt,
    frequency: frequency || "one-time",
    fund: fund || "General Fund",
    status: "received",
    createdAt: new Date().toISOString(),
  });
  res.status(201).json(item);
});

// DELETE /api/donations/:id  (admin only)
router.delete("/:id", requireAuth, (req, res) => {
  const ok = deleteItem("donations", req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
