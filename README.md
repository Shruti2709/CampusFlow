# CampusFlow

CampusFlow is a campus placement management platform that connects students,
recruiters, and placement cells on one system — from student registration and
resume management through drives, interviews, and final offers.

**Live demo:** _add your deployed link here_
**Tech:** React (Vite) · Tailwind CSS · Framer Motion · Node.js · Express · MongoDB · JWT

---

## Features

**Student portal**
- Register, log in, and maintain a profile (branch, CGPA, skills, resume)
- Browse open placement drives and apply
- Automatic eligibility check against a drive's CGPA/branch requirements
- Track interview schedule and placement status

**Admin / placement cell portal**
- Dashboard with live counts (students, companies, drives, interviews, placed students)
- Manage companies, students, placement drives, and interviews (create/list/delete)
- Role-based access — only admins can create or remove companies/drives/interviews

**Platform**
- JWT authentication (Bearer token, with a cookie fallback)
- Resume/logo uploads via Multer
- Responsive, glassmorphism landing page

## Tech stack

| Layer     | Stack |
|-----------|-------|
| Frontend  | React 19, Vite, Tailwind CSS v4, Framer Motion, Recharts, React Router, Axios, React Hot Toast |
| Backend   | Node.js, Express, MongoDB + Mongoose, JWT, Multer, bcryptjs |

## Project structure

```
CampusFlow/
├── client/                # React + Vite frontend
│   └── src/
│       ├── components/    # UI components (landing/, dashboard/, student/, ...)
│       ├── pages/          # Route-level pages
│       ├── routes/         # AppRoutes, ProtectedRoute
│       ├── services/       # Axios calls per resource
│       └── context/        # Auth + dashboard context
└── server/                # Express + MongoDB backend
    ├── controllers/
    ├── middleware/         # auth, role, upload
    ├── models/
    └── routes/
```

## Getting started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd CampusFlow

cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

A working `server/.env` is already included, pointing at a local MongoDB
instance so the project runs immediately:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campusflow
JWT_SECRET=campusflow_secret_key
CLIENT_URL=http://localhost:5173
```

You just need MongoDB itself running locally. Two options:

- **Install MongoDB Community Server** and start it - it listens on
  `127.0.0.1:27017` by default, which is exactly what `MONGO_URI` above
  expects. [Download here](https://www.mongodb.com/try/download/community).
- **Or use MongoDB Atlas (cloud)** instead: create your *own* free cluster at
  [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register), whitelist your
  IP under Network Access, grab the connection string from the "Connect"
  button, and paste it into `MONGO_URI` in `server/.env`. Never reuse someone
  else's Atlas connection string - Atlas only accepts connections from IPs the
  cluster owner has explicitly whitelisted, so it will fail for anyone else no
  matter how correct the username/password are.

If `MONGO_URI` is ever wrong or unreachable, the server will still start and
log a clear `MongoDB connection failed` message instead of failing silently -
check the terminal running `npm run dev` in `server/` if register/login ever
stop working.

### 3. Run locally

```bash
# terminal 1
cd server && npm run dev

# terminal 2
cd client && npm run dev
```

The client runs on `http://localhost:5173`, the API on `http://localhost:5000`.

## Deployment

- **Frontend (Vercel):** import the repo, set the root directory to `client`, build
  command `npm run build`, output directory `dist`.
- **Backend (Render):** new Web Service, root directory `server`, build command
  `npm install`, start command `npm start`. Add `MONGO_URI`, `JWT_SECRET`, and `PORT`
  as environment variables in Render's dashboard.
- Update the client's API base URL (in `src/api/axios.js`) and the server's CORS
  origin (in `server.js`) to point at each other's deployed URLs.

## Roadmap

- Export students/reports to CSV
- Dark mode
- Email notifications on interview scheduling
- Cloudinary for resume/logo storage in production

## License

Built as a final-year academic project.
