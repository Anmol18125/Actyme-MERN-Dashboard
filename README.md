# ⚡ Actyme MERN Dashboard

**Actyme** is a sleek, real-time, internationalized dashboard built with the **MERN stack** (MongoDB, Express, React, Node.js). Designed for tracking user progress, budgeting prizes, and sending smart email summaries — all wrapped in a fully responsive and WCAG AA-compliant interface.

---

## ✨ Features

- 🎯 **Live Progress Tracking** — Animated progress bars show real-time updates for users and cohort stats.
- 💰 **Prize Budget Engine** — Auto-calculates budget from revenue with strict business rules (33% up to $10k).
- 💌 **Email Notifications** — Sends detailed expense summaries with built-in recipient handling.
- 🌍 **i18n-Ready** — Easily localize using `react-i18next` and translation JSON.
- 🌓 **Light & Dark Mode** — Fully accessible, WCAG AA compliant, and theme-toggle ready.
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop views.

---

## 🏗 Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + react-i18next  
- **Backend:** Express + Node.js + MongoDB  
- **Email:** Nodemailer + Gmail SMTP  
- **Database:** MongoDB  
- **Styling:** TailwindCSS + dark mode toggle

---



## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/anmol18125/actyme-mern-dashboard.git
cd actyme-mern-dashboard
```
2. Backend Setup

```
cd server
npm install
npm run dev
```
🛠 Be sure your MongoDB URI and Gmail credentials are in .env.

3. Frontend Setup
```
cd ../client
npm install
npm run dev
```
🔐 Environment Variables
In server/.env
```
PORT=5000
MONGO_URI=mongodb+srv://your-cluster
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
DEFAULT_EMAIL_RECIPIENT=rai836848@gmail.com
```
In client/.env

```
VITE_API_BASE_URL=http://localhost:5000/api
```
📬 API Endpoints
Method	Endpoint	Purpose
GET	/api/progress	Get real-time progress
POST	/api/email	Send expense summary email
POST	/api/unsubscribe	Handle email opt-out

✅ Quick Testing Checklist
 Toggle light/dark mode

 View progress dashboard with real-time data

 Send sample email via /api/email

 Trigger budget calculation from backend

 i18n support works via translation.json

📈 Future Add-ons
🔒 User authentication (JWT)

🧾 Email templating UI

📊 Historical progress tracking

📱 Convert to mobile PWA

👨‍💻 Maintainer
Anmol Ray
📧 anmol18125@gmail.com
🌐 GitHub: Anmol18125

