# CampusRide — Thursday Build (Class Project)

This is the **Thursday scope only**, per the project brief:

- `User` / `Ride` / `Booking` Prisma models + migration
- Backend: `POST /auth/register`, `POST /auth/login`, the reused `authenticate` middleware
- Backend: `GET /rides` (public)
- Backend: `GET /auth/me` (protected) — **added on top of the original endpoint table**
  specifically so there's a real protected route to prove the token round-trips
  correctly today, before Friday adds the bigger protected routes.
- Frontend: `LoginPage`, `RegisterPage`, `AuthContext`, `ProtectedRoute`, and a minimal
  `DashboardPage` whose only job is to prove that round trip.

**Not built yet (Friday):** `POST /bookings`, `GET /bookings/me`, `GET /dashboard/summary`,
`BookRidePage`, `MyTripsPage`, and the real dashboard summary cards.

---

## 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- Set `DATABASE_URL` to point at your local Postgres (adjust user/password/db name)
- Set `JWT_SECRET` to any long random string

Create the database and run the migration:
```bash
npx prisma migrate dev --name init
```

Seed a few sample rides so `GET /rides` has data to return:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```
You should see: `CampusRide API listening on http://localhost:3000`

**Quick sanity check with curl:**
```bash
curl http://localhost:3000/rides
```
You should get back the three seeded rides as JSON.

---

## 2. Frontend Setup

In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Vite will print a local URL, typically `http://localhost:5173`.

---

## 3. The Thursday Walkthrough (do this together with the student)

1. Open the frontend URL — you'll be redirected to `/login` because `ProtectedRoute`
   blocks `/dashboard` without a token.
2. Click **Register**, create an account, and submit. You're sent back to `/login`.
3. Log in with the same credentials.
4. You should land on `/dashboard` and see: *"Logged in as [name] ([email]). This came
   back from a protected route using the token issued at login — the round trip works."*
5. **Prove it's real, not just trusted blindly:** open DevTools → Application →
   Local Storage, and show the student the raw token sitting under
   `campusride_token`. Then refresh the dashboard page — it re-fetches `/auth/me`
   using that stored token and still works, proving the token (not just React state)
   is what's carrying their identity.
6. Click **Sign Out**, confirm you're bounced back to `/login`, and confirm visiting
   `/dashboard` directly in the URL bar also redirects to `/login` — `ProtectedRoute`
   is doing its job.

That live loop — register → login → protected fetch → refresh survives → logout blocks
access — **is** "the integrated login/registration ecosystem" the curriculum names for
Thursday. Stop here for the day.

---

## 4. Common Issues

- **CORS error in the browser console:** confirm the backend is running on port 3000
  and `cors()` is enabled in `server.js` (it is, by default, in this build).
- **`/dashboard` immediately bounces to `/login` after a successful login:** check that
  `login()` in `AuthContext.jsx` is actually resolving before `navigate('/dashboard')`
  runs — a common bug is calling `navigate` before the `await` finishes.
- **`GET /rides` returns an empty array:** the seed script wasn't run, or was run
  against a different database than the one the server is connected to — double-check
  `DATABASE_URL` in `.env`.
