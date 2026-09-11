# CampusFlow 🎓

> **A modern, full-stack campus placement and student operations platform built with React 19, Node.js, Express, and MongoDB.**

CampusFlow streamlines collegiate placement drives, eligibility cutoff screening, student resume vaults, online practice assessments, drive-specific Q&A noticeboards, grievance redressal, campus events, and lost & found management into a single cohesive web application.

---

## 🌟 Core Modules & Features

### 💼 1. Placement Drives & Cutoff Engine
- **Automated Eligibility Verification**: Automatically compares student CGPA, department, and active backlog limits against company criteria before permitting applications.
- **Drive Q&A Discussion Boards**: Integrated noticeboard under each drive where students can ask questions about syllabus, test patterns, or venue details, and TPO admins can pin official replies.
- **Multi-Round Status Tracking**: Tracks candidates across Online Assessment (OA), Technical Round 1, Technical Round 2, and Final HR rounds.

### 📝 2. Mock Online Assessment (OA) Practice Portal
- **Timed Practice Tests**: Built-in test interface covering Core Data Structures & Algorithms, DBMS & SQL, and Quantitative Aptitude.
- **Instant Scorecards & Solutions**: Real-time grading with detailed answer explanations and accuracy breakdowns to help students prepare for actual recruitment drives.

### 📄 3. Student Profile & Document Vault
- **Academic Credentials**: Maintain verified branch, semester CGPA, and technical skill tags.
- **Direct PDF Uploads**: Secure storage for official student resumes and portfolio dossiers for instant 1-click applications.
- **Profile Readiness Meter**: Visual checklist tracking profile completeness.

### 📊 4. Placement Analytics & Report Export
- **1-Click CSV Export**: Downloadable `.csv` spreadsheets of registered candidates, department breakdowns, and placement statuses for university accreditation (NAAC/NBA).
- **Interactive KPI Dashboards**: Recharts visualizations of cohort placement rates, active recruiting partners, and scheduled interviews.

### 🛡️ 5. Student Grievance Redressal Cell
- **Categorized Support Desks**: Students file confidential tickets under Hostel, Academics, Infrastructure, or Placement disputes.
- **Status Lifecycle**: Real-time progression tracking (`Open` → `In Progress` → `Resolved`) with administrative resolution notes.

### 📅 6. Campus Events & Lost & Found Hub
- **Events Registry**: Schedule placement orientation talks, hackathons, and guest lectures with date blocks and 1-click RSVP bookmarking.
- **Campus Lost & Found**: Report misplaced belongings with last-seen locations and claim items returned to security desks.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion, React Router v7, Lucide Icons, Recharts, React Hot Toast, Axios |
| **Backend** | Node.js, Express.js (v5), MongoDB, Mongoose ODM, JWT (JSON Web Tokens), Multer (File Uploads), Cookie Parser, Bcrypt.js |
| **Design System** | Custom Warm Pastel System (`#faf6f0`), Plus Jakarta Sans, Inter, JetBrains Mono |
| **Hosting & Cloud** | **Vercel** (Frontend SPA) & **Railway** (Backend API & MongoDB Atlas) |

---

## 📁 Project Architecture

```
CampusFlow/
├── client/                     # Frontend Vite + React 19 SPA
│   ├── src/
│   │   ├── api/                # Axios instance & base config
│   │   ├── components/         # Modals, dashboards, and landing components
│   │   │   ├── dashboard/      # Topbar, KPI stat cards, charts
│   │   │   ├── drive/          # Drive modals & DriveQABoard
│   │   │   └── landing/        # Pastel hero, bento modules, FAQ, footer
│   │   ├── context/            # Authentication & application context
│   │   ├── pages/              # Dashboards, Drives, Assessments, Grievances, etc.
│   │   ├── routes/             # Protected routes & AppRoutes
│   │   └── services/           # API service modules
│   ├── vercel.json             # Vercel SPA routing rewrites
│   └── package.json
│
├── server/                     # Backend Express REST API
│   ├── controllers/            # Route business logic
│   ├── middleware/             # JWT authentication & role middlewares
│   ├── models/                 # Mongoose schemas (User, Student, Drive, Assessment, etc.)
│   ├── routes/                 # API endpoint routers
│   ├── uploads/                # Storage directory for student PDF resumes
│   ├── server.js               # Express application entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Quickstart

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/Shruti2709/CampusFlow.git
cd CampusFlow

# Install Server Dependencies
cd server && npm install

# Install Client Dependencies
cd ../client && npm install
```

### 2. Environment Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campusflow
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

### 3. Run Development Servers
```bash
# Start Backend (from server/):
npm run dev

# Start Frontend (from client/):
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Scope |
|---|---|---|---|
| **Student** | `student@campus.edu` | `password123` | Drive applications, OA practice, profile vault, grievances |
| **TPO Admin** | `admin@campus.edu` | `admin123` | Drive publishing, candidate verification, reports CSV export |
| **Recruiter** | `recruiter@google.com` | `password123` | Candidate shortlisting, interview slot scheduling |

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).

