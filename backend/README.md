# Backend — Ganesh Tour and Travels

## Run

```bash
npm install
npm run db:start   # starts local MongoDB on 27017
npm run seed       # inserts dummy packages
npm run dev        # Express on http://localhost:5002
```

## Email (Gmail App Password)

Contact inquiries are sent directly by the API and do not require MongoDB. The business inbox receives each inquiry, and the visitor receives a confirmation at the email address entered in the form. Configure the sender Gmail account and business inbox in `backend/.env`:

```env
SMTP_USER=aartikalpande93@gmail.com
SMTP_PASS=<16-char-app-password>
CONTACT_TO_EMAIL=travelganeshyaatra@gmail.com
SMTP_FROM_EMAIL=aartikalpande93@gmail.com
```

Create an App Password for `aartikalpande93@gmail.com`: https://myaccount.google.com/apppasswords. Enable 2-Step Verification first. Never put the App Password in frontend code or commit it. If an App Password has been shared in chat, revoke it and create a new one.

Verify:

```bash
npm run test:email
```

The email test also runs without MongoDB.

## Structure

```
backend/
├── scripts/          # db:start, test:email
├── src/
│   ├── config/       # env, db
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/     # Nodemailer
│   ├── seed/         # package seed data
│   ├── utils/
│   ├── app.js
│   ├── seed.js
│   └── server.js
├── .env
└── .env.example
```
