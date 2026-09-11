const Interview = require("../models/Interview");
const StudentProfile = require("../models/StudentProfile");



exports.createInterview = async (req, res) => {
  try {
    const interview = await Interview.create(req.body);

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.getInterviews = async (req, res) => {
  try {
    let filter = {};

    // Students only ever see their own interviews.
    if (req.user.role === "student") {
      const profile = await StudentProfile.findOne({ user: req.user.id });

      filter = { student: profile ? profile._id : null };
    }

    const interviews = await Interview.find(filter)
      .populate({ path: "student", populate: { path: "user", select: "name email" } })
      .populate("company")
      .sort({ date: 1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.updateInterviewStatus = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(interview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.deleteInterview = async (req, res) => {
  try {
    await Interview.findByIdAndDelete(req.params.id);

    res.json({
      message: "Interview deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
