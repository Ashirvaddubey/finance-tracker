# Expense Tracker

A modern, AI-inspired expense management platform for individuals, families, and teams. Track, analyze, and optimize your expenses with beautiful analytics, smart features, and a secure, user-friendly interface.

---

## 🚀 Features
- **Instant Expense Capture:** Snap a photo of your bill or receipt and auto-categorize expenses.
- **Goal-Based Planning:** Set savings goals and track your progress visually.
- **Rewards & Badges:** Earn badges for smart spending and consistent tracking.
- **Split & Settle Instantly:** Easily split bills and settle up with friends or family.
- **Advanced Analytics:** Visualize your spending with interactive charts and reports.
- **Bank-Grade Security:** Your data is encrypted and protected.
- **Multi-User Support:** Personalized dashboards for every user.
- **Theme Switching (Light/Dark Mode):** Personalize your experience with a single click from your profile.
- **Integrated Chatbot Assistant:** Get instant help, tips, and answers to your questions right inside the app.

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token), bcryptjs

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd project
```

### 2. Install Dependencies
#### Main Project (Frontend)
```bash
npm install
```
#### Backend
```bash
cd server
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```
MONGO_URI=mongodb://localhost:27017/Expense-Management-System
JWT_SECRET=yourSuperSecretKey
PORT=5000
```

---

## ▶️ Running the App

### 1. Start the Backend
```bash
cd server
npm run dev
```

### 2. Start the Frontend
Open a new terminal in the root directory:
```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 📁 Folder Structure
```
project/
├── server/           # Backend (Node.js, Express, MongoDB)
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── ...
├── src/              # Frontend (React, TypeScript)
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── App.tsx
│   └── ...
├── package.json
├── README.md
└── ...
```

---

## 📝 Contribution
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📧 Contact
For questions, suggestions, or support, open an issue or contact the maintainer.

---

## 🖼️ Screenshots

Showcase the app's look and feel! Replace the image links below with your own screenshots.

### Layout (Landing Page)
![Layout Screenshot](screenshots/layout.png)

### Dashboard
![Dashboard Screenshot](screenshots/dashboard.png)

### Profile
![Profile Screenshot](screenshots/profile.png)

### (Add more sections as needed)

---

## 💡 Theme Switching
Easily toggle between light and dark mode from your profile page. The app will instantly update to match your preference.

## 🤖 Chatbot Assistant
Use the built-in chatbot for quick help, financial tips, and to answer your questions about using the platform.

**Enjoy taking control of your financial future with Expense Tracker!** 