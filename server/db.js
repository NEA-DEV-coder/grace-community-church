import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DATA_FILE = path.join(__dirname, "data.json");

let db = null;

export function loadDb() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error("data.json not found. Run `npm run seed` first.");
  }
  db = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  return db;
}

export function getDb() {
  if (!db) loadDb();
  return db;
}

export function saveDb() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

export function resetDb(data) {
  db = data;
  saveDb();
}

// --- Collection helpers -------------------------------------------------

export function getAll(collection) {
  return getDb()[collection] || [];
}

export function getById(collection, id) {
  return (getDb()[collection] || []).find(
    (item) => String(item.id) === String(id),
  );
}

export function createItem(collection, item) {
  const items = getDb()[collection] || [];
  const nextId = items.length
    ? Math.max(...items.map((i) => Number(i.id) || 0)) + 1
    : 1;
  const newItem = { id: nextId, ...item };
  getDb()[collection] = [...items, newItem];
  saveDb();
  return newItem;
}

export function updateItem(collection, id, updates) {
  const items = getDb()[collection] || [];
  const idx = items.findIndex((i) => String(i.id) === String(id));
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates, id: items[idx].id };
  saveDb();
  return items[idx];
}

export function deleteItem(collection, id) {
  const items = getDb()[collection] || [];
  const filtered = items.filter((i) => String(i.id) !== String(id));
  getDb()[collection] = filtered;
  saveDb();
  return filtered.length !== items.length;
}
