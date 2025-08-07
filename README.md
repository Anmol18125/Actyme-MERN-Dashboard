# 🚀 Actyme MERN Dashboard

Welcome to **Actyme**, a modern full-stack MERN application that brings together real-time user tracking, prize budget management, and automated email communication — all wrapped in a sleek, responsive, and accessible interface.

Designed for teams and individuals who want more than just numbers — Actyme delivers meaningful insight, rewarding progress, and beautiful UX for both web and mobile.

---

## 🌟 What Makes Actyme Special?

✅ **📊 Progress Dashboard (M8)**  
Track cohort progress in real-time. Visualize goals, revenue targets, and user engagement — all with beautiful animated bars and responsive layouts.

✅ **🌓 Light & Dark Mode Toggle**  
Seamless theme switching with WCAG AA-compliant contrast and smooth transitions.

✅ **🌍 Internationalization (i18n)**  
Built with `react-i18next`. Translate your UI using JSON — ready for global users out of the box.

✅ **💌 Email Pipeline (M9)**  
Send user-friendly, tabular summaries of expense reports via email using a clean backend API.

✅ **🎯 Prize Budget Engine (M7)**  
Calculates real-time prize budgets using a 33% cap on revenue (up to $10,000), powered by smart backend logic.

✅ **🧩 Modular Architecture**  
Separation of concerns with `client/` and `server/` folders. Scale with confidence.

---

## 🧠 Built With

- **Frontend**: React (Vite), Tailwind CSS, `react-i18next`
- **Backend**: Node.js, Express.js, Nodemailer
- **Database**: MongoDB (via Mongoose)
- **Email**: Gmail SMTP integration
- **Styling**: WCAG AA-accessible Tailwind design

---



---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Anmol18125 /actyme-mern-dashboard.git
cd actyme-mern-dashboard
2. Backend Setup
bash
Copy
Edit
cd server
npm install
npm run dev
Make sure MongoDB is running and your .env file has the correct credentials.

3. Frontend Setup
bash
Copy
Edit
cd ../client
npm install
npm run dev
App runs on: http://localhost:5173
API runs on: http://localhost:5000

📬 Environment Variables
server/.env
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
DEFAULT_EMAIL_RECIPIENT=rai836848@gmail.com
client/.env
env
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
📡 API Overview
Method	Endpoint	Description
GET	/api/progress	Fetch user/cohort progress data
POST	/api/email	Send summary email with expenses
POST	/api/unsubscribe	Handle unsubscribe logic (optional)

🧪 Testing the Flow
Open the frontend in your browser.

Toggle dark/light mode and see theme applied smoothly.

Click “Refresh” to load latest progress stats.

Use Postman or frontend button to trigger an email.

Test i18n by switching translation JSONs (e.g., add fr, es, etc.).

🧠 Future Enhancements
📲 Mobile-first PWA support

🔒 User authentication (JWT)

🛠️ Admin dashboard for budget configs

📈 Historical progress graphing



👨‍💻 Author
Anmol Ray
📧 Anmol18125@gmail.com
🔗 GitHub: Anmol18125 

