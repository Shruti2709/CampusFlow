const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const studentRoutes = require("./routes/StudentRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");
const driveRoutes = require("./routes/driveRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const lostFoundRoutes = require("./routes/lostFoundRoutes");
const eventRoutes = require("./routes/eventRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const driveQARoutes = require("./routes/driveQARoutes");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();

const app = express();

// Permissive CORS configuration supporting Vercel previews & production domains
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      // Allow all localhost origins and any vercel.app domains
      if (
        origin.startsWith("http://localhost:") ||
        origin.endsWith(".vercel.app") ||
        (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Healthcheck & Root status route for deployment verification
app.get("/", (req, res) => {
  res.json({
    message: "CampusFlow API is running 🎓",
    status: "online",
    academicYear: "2026-27",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    dbState: mongoose.connection.readyState === 1 ? "connected" : "connecting/disconnected",
  });
});

// Core API Routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/drives", driveRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/lost-found", lostFoundRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/drive-qa", driveQARoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
    });
}

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected.");
});

module.exports = app;