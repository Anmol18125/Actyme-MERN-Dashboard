Actyme MERN Dashboard
Welcome to Actyme, a sleek and modern MERN (MongoDB, Express, React, Node.js) stack application that delivers real-time tracking, budget management, and automated email summaries—all within a responsive and accessible interface.

Why Actyme Stands Out
Real‑Time Progress Dashboard
Monitor cohort performance live with dynamic visuals—goals, revenue, and engagement—powered by animated progress bars and a responsive design.

Dark/Light Mode Toggle
Effortlessly switch themes with WCAG AA–compliant contrast levels and smooth transitions.

Internationalization (i18n)
Built using react-i18next, making UI translation seamless through JSON files—ready for global users out of the box.

Email Summaries & Reporting
Send comprehensive, styled expense reports via email with a clean and reliable backend API.

Dynamic Prize Budget Engine
Automatically calculates real-time prize budgets—capped at 33% of revenue, maxing out at $10,000—via smart logic on the server side.

Scalable, Modular Design
Clean separation between client/ and server/ codebases for maintainability and growth.

Tech Stack
Layer	Technologies
Frontend	React (Vite), Tailwind CSS, react-i18next
Backend	Node.js, Express, Nodemailer
Database	MongoDB via Mongoose
Email Service	Gmail SMTP integration
Styling	Accessible design with Tailwind (WCAG AA)

Getting Started
Clone the repository

bash
Copy
Edit
git clone https://github.com/Anmol18125/Actyme-MERN-Dashboard.git
cd Actyme-MERN-Dashboard
Backend Setup

bash
Copy
Edit
cd server
npm install
npm run dev
Ensure MongoDB is running and configure your .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
DEFAULT_EMAIL_RECIPIENT=your_recipient@example.com
Frontend Setup

bash
Copy
Edit
cd ../client
npm install
npm run dev
The app will be available at http://localhost:5173 with API access at http://localhost:5000/api.

API Endpoints
GET /api/progress – Fetch cohort or user progress data

POST /api/email – Dispatch an expense summary email

POST /api/unsubscribe – (Optional) Unsubscribe endpoint

Testing Flow
Toggle between dark/light modes to experience dynamic theming

Click “Refresh” to update progress metrics in real time

Trigger emails using the frontend or with Postman

Test internationalization by switching translation JSONs (e.g., fr, es)

Future Enhancements (Coming Soon!)
Mobile-first Progressive Web App (PWA) support

User authentication via JWT

Admin dashboard for managing budget configurations

Historical progress visualizations and analytics

About the Author
Anmol Ray

GitHub: Anmol18125

Email: Anmol18125@gmail.com
