# CampusFlow 🎓

> **A modern, full-stack campus placement and student operations platform built with React 19, Node.js, Express, and MongoDB.**

CampusFlow streamlines collegiate placement drives, eligibility cutoff screening, student resume vaults, online practice assessments, drive-specific Q&A noticeboards, grievance redressal, campus events, and lost & found management into a single, cohesive web application.

---

## 🌟 Key Features

### 1. 💼 Placement Drives & Cutoff Engine
- **Automated Eligibility Verification**: Automatically compares student CGPA, department, and active backlog limits against company criteria before permitting 1-click applications.
- **Drive Q&A Discussion Boards**: Integrated noticeboard under each drive where students can ask questions about syllabus, test patterns, or venue details, and TPO admins can pin official replies.
- **Multi-Round Status Tracking**: Tracks candidates across Online Assessment (OA), Technical Round 1, Technical Round 2, and Final HR rounds.

### 2. 📝 Mock Online Assessment (OA) Practice Portal
- **Timed Practice Tests**: Built-in test interface covering Core Data Structures & Algorithms, DBMS & SQL, and Quantitative Aptitude.
- **Instant Scorecards & Solutions**: Real-time grading with detailed answer explanations and accuracy breakdowns to help students prepare for actual recruitment drives.

### 3. 📄 Student Profile & Document Vault
- **Academic Credentials**: Maintain verified branch, semester CGPA, and technical skill tags.
- **Direct PDF Uploads**: Secure storage for official student resumes and portfolio dossiers for instant 1-click applications.
- **Profile Readiness Meter**: Visual checklist tracking profile completeness.

### 4. 📊 Placement Analytics & Report Export
- **1-Click CSV Export**: Downloadable `.csv` spreadsheets of registered candidates, department breakdowns, and placement statuses for university accreditation (NAAC/NBA).
- **Interactive KPI Dashboards**: Recharts visualizations of cohort placement rates, active recruiting partners, and scheduled interviews.

### 5. 🛡️ Student Grievance Redressal Cell
- **Categorized Support Desks**: Students file confidential tickets under Hostel, Academics, Infrastructure, or Placement disputes.
- **Status Lifecycle**: Real-time progression tracking (`Open` → `In Progress` → `Resolved`) with administrative resolution notes.

### 6. 📅 Campus Events & Lost & Found Hub
- **Events Registry**: Schedule placement orientation talks, hackathons, and guest lectures with date blocks and 1-click RSVP bookmarking.
- **Campus Lost & Found**: Report misplaced belongings with last-seen locations and claim items returned to security desks.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion, React Router v7, Lucide Icons, Recharts, React Hot Toast, Axios |
| **Backend** | Node.js, Express.js (v5), MongoDB, Mongoose ODM, JWT (JSON Web Tokens), Multer (File Uploads), Cookie Parser, Bcrypt.js |
| **Styling** | Custom Warm Pastel Design System, Plus Jakarta Sans, Inter, JetBrains Mono |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend), MongoDB Atlas |

---

## 📁 Repository Structure

```
CampusFlow/
├── client/                     # Frontend Vite + React Application
│   ├── src/
│   │   ├── api/                # Axios instance & base config
│   │   ├── components/         # Modals, dashboards, and landing components
│   │   │   ├── dashboard/      # Topbar, KPI stat cards, charts
│   │   │   ├── drive/          # Drive modals & DriveQABoard
│   │   │   └── landing/        # Pastel hero, bento modules, FAQ, footer
│   │   ├── context/            # Authentication context provider
│   │   ├── pages/              # Dashboards, Drives, Assessments, Grievances, etc.
│   │   ├── routes/             # Protected routes & AppRoutes
│   │   └── services/           # API service modules
│   ├── vercel.json             # Vercel SPA routing rewrites
│   └── package.json
│
├── server/                     # Backend Express REST API
│   ├── controllers/            # Route business logic
│   ├── middlewares/            # JWT authentication middleware
│   ├── models/                 # Mongoose schemas (User, Student, Drive, Assessment, etc.)
│   ├── routes/                 # API endpoint routers
│   ├── uploads/                # Local storage for student PDF resumes & logos
│   ├── server.js               # Express application entry point
│   ├── .env                    # Backend environment configuration
│   └── package.json
│
├── README.md                   # Project documentation
└── .gitignore
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB Community Server running on `mongodb://127.0.0.1:27017` or a free MongoDB Atlas connection string.

### 1. Clone the Repository
```bash
git clone https://github.com/Shruti2709/CampusFlow.git
cd CampusFlow
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create or verify .env file
# (See Environment Variables section below)

# Start backend server
npm run dev
```
Backend will start on: **`http://localhost:5000`**

### 3. Frontend Setup
Open a new terminal window:
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend will be available at: **`http://localhost:5173`**

---

## 🔑 Demo Login Accounts

Pre-configured 1-Click demo accounts are available on the Sign In page:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Student** | `student@campus.edu` | `password123` | Drive applications, mock tests, profile vault, grievances |
| **TPO Admin** | `admin@campus.edu` | `admin123` | Drive publishing, candidate verification, reports export |
| **Recruiter** | `recruiter@google.com` | `password123` | Candidate shortlisting, interview slot scheduling |

---

## ⚙️ Environment Variables

### Backend (`server/.env`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campusflow
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env` - optional in production):
```env
VITE_API_URL=https://your-backend-api.onrender.com
```

---

## 🌐 Deployment Guide (Vercel & Render)

### 1. Deploying Frontend to Vercel
1. Push your code to GitHub (`https://github.com/Shruti2709/CampusFlow`).
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your `CampusFlow` repository.
4. Set **Root Directory** to `client`.
5. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://your-backend-api-url.onrender.com`
6. Click **Deploy**. (The included `client/vercel.json` ensures all React Router paths resolve without 404 errors).

### 2. Deploying Backend to Render / Railway
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Under **Environment Variables**, add:
   - `PORT` = `5000`
   - `MONGO_URI` = `your_mongodb_atlas_connection_string`
   - `JWT_SECRET` = `your_secure_secret_key`
   - `CLIENT_URL` = `https://your-vercel-frontend.vercel.app`

---

## 📜 License
This project is licensed under the MIT License.
