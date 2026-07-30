console.log("CAMPUSFLOW SERVER LOADED");

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


dotenv.config();


const app = express();

console.log("authRoutes", typeof authRoutes);
console.log("companyRoutes", typeof companyRoutes);
console.log("studentRoutes", typeof studentRoutes);
console.log("studentProfileRoutes", typeof studentProfileRoutes);
console.log("driveRoutes", typeof driveRoutes);
console.log("dashboardRoutes", typeof dashboardRoutes);
console.log("interviewRoutes", typeof interviewRoutes);


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true,
  })
);



app.use(express.json());

app.use(cookieParser());



app.use(
  "/uploads",
  express.static("uploads")
);



// Routes

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/companies",
  companyRoutes
);


app.use(
  "/api/students",
  studentRoutes
);


app.use(
  "/api/student-profile",
  studentProfileRoutes
);


app.use(
  "/api/drives",
  driveRoutes
);


app.use(
  "/api/interviews",
  interviewRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use(
  "/api/complaints",
  complaintRoutes
);


app.use(
  "/api/lost-found",
  lostFoundRoutes
);


app.use(
  "/api/events",
  eventRoutes
);


app.get("/", (req, res) => {
  res.send("CampusFlow Backend is running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("\nMongoDB connection failed:", err.message);
    console.error(
      "The server is still running, but register/login and every other " +
        "database-backed route will fail until this is fixed.\n" +
        "Check server/.env - MONGO_URI must point to a database you can " +
        "actually reach (a local MongoDB, or your own Atlas cluster with " +
        "your IP whitelisted under Network Access).\n"
    );
  });

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected.");
});
