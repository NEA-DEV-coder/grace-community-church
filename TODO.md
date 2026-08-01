# Church Website - Task Progress

## Completed

- [x] Create project structure (Vite + React + Tailwind)
- [x] Configure Tailwind CSS v4
- [x] Build Navbar component
- [x] Build Hero component (church name)
- [x] Build Plan Your Visit section
- [x] Build What We Believe section
- [x] Build Staff & Leadership profiles
- [x] Build Sermons & Media library
- [x] Build Event Calendar
- [x] Build Online Donation integration
- [x] Build Blog section
- [x] Build Photo & Video Galleries
- [x] Build Prayer Request & Contact form + Map
- [x] Build Footer
- [x] Install dependencies
- [x] Verify site runs with dev server

## API Wiring (Public Site → Express Backend)

- [x] Create src/api.js REST client
- [x] Convert Sermons.jsx to fetch from /api/sermons
- [x] Convert Events.jsx to fetch from /api/events
- [x] Convert Blog.jsx to fetch from /api/posts
- [x] Convert Leadership.jsx to fetch from /api/staff
- [x] Wire Contact.jsx form to POST /api/prayer-requests & /api/messages
- [x] Add vite dev proxy (/api → localhost:5000)
- [x] Verify public site builds cleanly
- [x] Verify admin dashboard builds cleanly
- [x] Run API smoke test (all passed)

## Deploy Fix: Same-Origin Public Site + API + Admin

- [x] Update server.js to serve public site & admin from Express
- [x] Rebuild public site with base `/grace-community-church/`
- [x] Rebuild admin with base `/admin/`
- [x] Verify public site returns 200
- [x] Verify admin dashboard returns 200
- [x] Verify API returns 200 with sermon data
- [x] Confirm admin-added sermons appear in API response
- [x] Commit and push to GitHub
