# Backend — Ganesh Tour and Travels

## Run

```bash
npm install
npm run db:start   # starts local MongoDB on 27017
npm run seed       # inserts dummy packages
npm run dev        # Express on http://localhost:5000
```

## Email (Gmail App Password)

Edit `.env`:

```env
SMTP_USER=aartikalpande93@gmail.com
SMTP_PASS=<16-char-app-password>
CONTACT_TO_EMAIL=aartikalpande93@gmail.com
```

Create App Password: https://myaccount.google.com/apppasswords

Verify:

```bash
npm run test:email
```

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
