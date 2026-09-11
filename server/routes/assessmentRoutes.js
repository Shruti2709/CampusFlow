const express = require("express");
const router = express.Router();
const Assessment = require("../models/Assessment");
const authMiddleware = require("../middlewares/authMiddleware");

// Default initial assessments for campus placement practice
const DEFAULT_ASSESSMENTS = [
  {
    title: "Core Data Structures & Algorithms Practice",
    category: "Data Structures & Algorithms",
    durationMinutes: 15,
    totalMarks: 5,
    questions: [
      {
        questionText: "What is the worst-case time complexity of QuickSort?",
        options: ["O(N log N)", "O(N^2)", "O(N)", "O(log N)"],
        correctOptionIndex: 1,
        explanation: "QuickSort degrades to O(N^2) when the pivot selected is consistently the minimum or maximum element.",
      },
      {
        questionText: "Which data structure is primarily used for implementing Breadth First Search (BFS) in a Graph?",
        options: ["Stack", "Queue", "Priority Queue", "Binary Search Tree"],
        correctOptionIndex: 1,
        explanation: "BFS explores nodes level by level using a First-In-First-Out (FIFO) Queue.",
      },
      {
        questionText: "In a min-heap with N elements, what is the time complexity to extract the minimum element?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctOptionIndex: 1,
        explanation: "Extracting the min element requires replacing the root with the last element and heapifying down, taking O(log N).",
      },
      {
        questionText: "What is the space complexity of searching in an adjacency matrix representation of a graph with V vertices?",
        options: ["O(V)", "O(V + E)", "O(V^2)", "O(E^2)"],
        correctOptionIndex: 2,
        explanation: "An adjacency matrix allocates a 2D array of size V x V, consuming O(V^2) space.",
      },
      {
        questionText: "Which algorithm finds the shortest path in a weighted graph with non-negative edge weights?",
        options: ["Prim's Algorithm", "Dijkstra's Algorithm", "Kruskal's Algorithm", "Floyd-Warshall"],
        correctOptionIndex: 1,
        explanation: "Dijkstra's algorithm is optimal for finding the single-source shortest path with non-negative edge weights.",
      },
    ],
  },
  {
    title: "DBMS & SQL Fundamentals Screening",
    category: "DBMS & SQL",
    durationMinutes: 12,
    totalMarks: 4,
    questions: [
      {
        questionText: "Which normal form eliminates partial dependency on a composite primary key?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctOptionIndex: 1,
        explanation: "2NF requires the relation to be in 1NF and all non-key attributes to be fully functionally dependent on the primary key.",
      },
      {
        questionText: "What SQL clause is used to filter records resulting from an aggregate function like COUNT() or AVG()?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correctOptionIndex: 1,
        explanation: "HAVING filters aggregated groups, whereas WHERE filters individual rows before aggregation.",
      },
      {
        questionText: "Which ACID property ensures that a transaction is completely executed or completely rolled back?",
        options: ["Atomicity", "Consistency", "Isolation", "Durability"],
        correctOptionIndex: 0,
        explanation: "Atomicity ('all or nothing') ensures uncommitted modifications are aborted upon failure.",
      },
      {
        questionText: "What type of index is created automatically on the primary key in most relational databases?",
        options: ["Non-clustered Index", "Clustered Index", "Bitmap Index", "Full-text Index"],
        correctOptionIndex: 1,
        explanation: "A Clustered Index determines the physical order of data rows and is default on Primary Keys.",
      },
    ],
  },
  {
    title: "Campus Quantitative & Logical Aptitude",
    category: "General Aptitude",
    durationMinutes: 10,
    totalMarks: 4,
    questions: [
      {
        questionText: "If a train traveling at 72 km/h crosses a 200m platform in 20 seconds, what is the length of the train?",
        options: ["150 meters", "200 meters", "250 meters", "300 meters"],
        correctOptionIndex: 1,
        explanation: "72 km/h = 20 m/s. Total distance in 20s = 20 * 20 = 400m. Train length = 400m - 200m = 200m.",
      },
      {
        questionText: "A pipe can fill a tank in 6 hours. Another pipe empties it in 8 hours. If both are opened, how long to fill the tank?",
        options: ["14 hours", "20 hours", "24 hours", "48 hours"],
        correctOptionIndex: 2,
        explanation: "Net rate = (1/6 - 1/8) = 1/24. Time required = 24 hours.",
      },
      {
        questionText: "What is the probability of getting a sum of 7 when rolling two standard 6-sided dice?",
        options: ["1/6", "1/12", "7/36", "5/36"],
        correctOptionIndex: 0,
        explanation: "Possible pairs = (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 pairs out of 36 total = 1/6.",
      },
      {
        questionText: "In a certain code, 'SPRING' is written as 'UNUIPK'. How is 'SUMMER' written?",
        options: ["UWOOGT", "UWOPGT", "UVOOGT", "VWPOGT"],
        correctOptionIndex: 0,
        explanation: "Pattern shifts letters by (+2, +2, +2, +2, +2, +2). S->U, U->W, M->O, M->O, E->G, R->T.",
      },
    ],
  },
];

// Seed initial tests if empty
const seedAssessments = async () => {
  try {
    const count = await Assessment.countDocuments();
    if (count === 0) {
      await Assessment.insertMany(DEFAULT_ASSESSMENTS);
      console.log("Seeded default practice assessments.");
    }
  } catch (err) {
    console.error("Assessment seed error:", err.message);
  }
};
seedAssessments();

// GET all assessments
router.get("/", authMiddleware, async (req, res) => {
  try {
    const assessments = await Assessment.find({}, "-questions.correctOptionIndex -questions.explanation");
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assessments" });
  }
});

// GET assessment by ID (for taking the test)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id, "-questions.correctOptionIndex -questions.explanation");
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assessment" });
  }
});

// POST submit answers and grade
router.post("/:id/submit", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body; // e.g. { 0: 1, 1: 1, 2: 0, ... }
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    let correctCount = 0;
    const review = assessment.questions.map((q, idx) => {
      const selectedOption = answers ? answers[idx] : undefined;
      const isCorrect = selectedOption === q.correctOptionIndex;
      if (isCorrect) correctCount++;

      return {
        questionText: q.questionText,
        options: q.options,
        selectedOption,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const totalQuestions = assessment.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    res.json({
      score: correctCount,
      totalQuestions,
      percentage,
      passed: percentage >= 60,
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Grading submission failed" });
  }
});

module.exports = router;
