# WanderOn Secure Authentication System (Node.js + MongoDB + React)

A secure user authentication system built for the WanderOn technical assessment.
It supports registration, login, protected routes, and a cookie-based JWT session with refresh-token rotation.

---

## ✨ Features

- **User Registration** with server-side validation (Zod)
- **User Login** with bcrypt password verification
- **JWT Auth** using:
  - **Access Token** (short-lived)
  - **Refresh Token** (rotated, stored as hash in DB)
- **Session via HttpOnly Cookies** (no localStorage tokens)
- **Protected Route** `/auth/me`
- **Swagger Docs** at `/docs`
- Security hardening:
  - Input sanitization (XSS cleaning)
  - NoSQL injection sanitization (blocks `$` and `.` keys)
  - Rate limiting
  - Helmet security headers

---

## 🧱 Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Zod for validation
- bcrypt for password hashing
- jsonwebtoken for JWT
- Swagger (OpenAPI) via JSDoc annotations

**Frontend**
- React + TypeScript + Vite
- Tailwind CSS
- Framer Motion (animations)

---

## 🔐 Authentication Flow (How it works)

1. **Register**
   - Input is sanitized + validated
   - Password is stored as `bcrypt hash`

2. **Login**
   - Credentials verified using bcrypt
   - Server sets **HttpOnly cookies**:
     - `access_token` (15 min)
     - `refresh_token` (7 days)

3. **Access protected route**
   - `/auth/me` reads `access_token` from cookie
   - If valid → returns user payload

4. **Refresh tokens**
   - `/auth/refresh` verifies `refresh_token`
   - Refresh token is **rotated** and its hash is stored in DB

5. **Logout**
   - Clears cookies and invalidates refresh token hash

---

## ✅ API Endpoints

Base URL: `http://localhost:4000`

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `POST /auth/refresh`
- `POST /auth/logout` (protected)

Swagger docs:
- `GET /docs`

---

## 🧪 Local Setup

### 1) Backend Environment

Create `backend/.env`:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/wanderon_auth

CLIENT_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=replace-with-strong-secret
REFRESH_TOKEN_SECRET=replace-with-strong-secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

COOKIE_SECURE=false
COOKIE_SAMESITE=lax
NODE_ENV=development
