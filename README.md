# Jordan Plumbing Services - Backend

## Folder Structure
```
backend/
├── server.js          ← Main server entry point
├── package.json       ← Dependencies
├── .env.example       ← Environment variables template
├── app.js             ← Updated frontend JS (replace your <script> block)
├── models/
│   ├── User.js        ← User accounts
│   ├── Booking.js     ← Service bookings
│   ├── Contact.js     ← Contact messages
│   └── Order.js       ← Cart orders
└── routes/
    ├── auth.js        ← Register & Login
    ├── bookings.js    ← Booking endpoints
    ├── contact.js     ← Contact endpoints
    └── orders.js      ← Order endpoints
```

## Setup Instructions

### 1. Install Node.js
Download from https://nodejs.org (choose LTS version)

### 2. Install MongoDB
Download from https://www.mongodb.com/try/download/community

### 3. Install dependencies
Open terminal in the backend folder and run:
```
npm install
```

### 4. Set up environment variables
- Copy `.env.example` to a new file called `.env`
- Fill in your values:
  - `MONGO_URI` — leave as default if running MongoDB locally
  - `JWT_SECRET` — make up any long random string e.g. `jordan_plumbing_secret_2026`
  - `EMAIL_USER` — your Gmail address
  - `EMAIL_PASS` — your Gmail App Password (NOT your normal password)
    → Go to Google Account → Security → 2-Step Verification → App Passwords

### 5. Start the server
```
npm run dev
```
You should see: `Server running on port 5000` and `MongoDB connected`

### 6. Connect your frontend
- Replace the `<script>` block in your HTML with the contents of `app.js`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/bookings | Submit a booking |
| GET  | /api/bookings | Get all bookings |
| POST | /api/contact | Send a message |
| GET  | /api/contact | Get all messages |
| POST | /api/orders | Place an order |
| GET  | /api/orders | Get all orders |
