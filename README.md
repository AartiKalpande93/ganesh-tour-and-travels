# Ganesh Tour and Travels

React (Vite) frontend + Express/MongoDB/Nodemailer backend.

## Quick start (2 terminals)

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run db:start
npm run seed
npm run dev
```

API: http://localhost:5000/api/health

### Terminal 2 — Frontend

```bash
npm install
npm run dev
```

Site: http://localhost:5173

The frontend calls the Express API at `http://localhost:5000/api` (see `.env` → `VITE_API_URL`).

## Email setup (required for Contact form)

Contact emails are sent with **Nodemailer + Gmail SMTP** to `aartikalpande93@gmail.com`.

1. Open https://myaccount.google.com/apppasswords (2-Step Verification must be ON)
2. Create an App Password for Mail
3. Edit `backend/.env`:

```env
SMTP_USER=aartikalpande93@gmail.com
SMTP_PASS=your16charapppass
SMTP_FROM_EMAIL=aartikalpande93@gmail.com
CONTACT_TO_EMAIL=aartikalpande93@gmail.com
```

4. Restart the backend, then verify:

```bash
cd backend
npm run test:email
```

Until `SMTP_PASS` is set, `POST /api/contact` correctly returns **503** (email not configured). It will **not** fake a success response.

## API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contact` | Validate → save MongoDB → send email |
| GET | `/api/packages` | List packages |
| GET | `/api/packages/:id` | Single package |
| POST | `/api/packages` | Create |
| PUT | `/api/packages/:id` | Update |
| DELETE | `/api/packages/:id` | Delete |

## Notes

- Portable MongoDB binary lives in `backend/.mongodb` (gitignored); data in `backend/.mongo-data`
- SMTP secrets stay only in `backend/.env`
- Vite proxy `/api` → `:5000` remains available as a fallback
