# Deployment Guide

> **Important:** This project requires a **Node.js host** because the public site, admin dashboard, and API are all served from a single Express server. Static hosts (GitHub Pages, Netlify, etc.) **cannot** serve the API routes.

## Option 1: Render (Recommended — Free)

[Render](https://render.com) is the easiest way to deploy.

1. Push this repo to GitHub.
2. In Render dashboard, click **New +** → **Web Service**.
3. Connect your GitHub repo.
4. Render will auto-detect the `render.yaml` config. Or manually set:
   - **Root Directory:** `/` (repo root)
   - **Build Command:** `npm install && npm run build:all`
   - **Start Command:** `npm start`
   - **Health Check:** `/api/health`
5. Render injects a `PORT` env var automatically. The server listens on it.
6. Click **Deploy**.

After deploy:

- **Public site:** `https://your-app.onrender.com/grace-community-church/`
- **Admin dashboard:** `https://your-app.onrender.com/admin`
- **API:** `https://your-app.onrender.com/api/health`

## Option 2: Railway

[Railway](https://railway.app) works similarly:

1. Connect repo.
2. Set **Start Command** to `npm start` (runs from repo root).
3. Railway auto-injects `PORT`.

## Option 3: Fly.io

```bash
fly launch
fly deploy
```

## Option 4: VPS (manual)

```bash
git clone https://github.com/YOUR_USER/grace-community-church.git
cd grace-community-church
npm install
npm run build:all
npm start
```

Use a process manager like `pm2` in production:

```bash
npm install -g pm2
pm2 start server/server.js --name church
```

## Environment Variables

| Variable         | Required                    | Description                  |
| ---------------- | --------------------------- | ---------------------------- |
| `PORT`           | Yes (auto-injected by host) | Server port                  |
| `JWT_SECRET`     | Yes                         | Secret for admin auth tokens |
| `ADMIN_USERNAME` | Yes                         | Admin login username         |
| `ADMIN_PASSWORD` | Yes                         | Admin login password         |

## Local Development

```bash
# Terminal 1: Start the API server
npm run dev:server

# Terminal 2: Start the public site dev server
npm run dev

# Terminal 3: Start the admin dashboard dev server
npm run dev:admin
```

Then visit:

- Public site: http://localhost:5173
- Admin: http://localhost:5174
- API: http://localhost:5000/api/health
