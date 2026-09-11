exports.authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({
      message: "You do not have permission to perform this action",
    });
  }
  next();
};


exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }
  next();
};

exports.studentOnly = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({
      message: "Student access required",
    });
  }
  next();
};

exports.recruiterOnly = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      message: "Recruiter access required",
    });
  }
  next();
};
