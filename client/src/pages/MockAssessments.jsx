import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Play,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  BookOpen,
  Send,
  Loader2
} from "lucide-react";
import {
  getAssessments,
  getAssessmentById,
  submitAssessment
} from "../services/assessmentService";

export default function MockAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Load practice tests
  const fetchTests = async () => {
    try {
      const res = await getAssessments();
      setAssessments(res.data || []);
    } catch (error) {
      toast.error("Failed to load assessments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!activeAssessment || result || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAssessment, result, timeLeft]);

  // Start a test
  const handleStartTest = async (id) => {
    try {
      setLoading(true);
      const res = await getAssessmentById(id);
      setActiveAssessment(res.data);
      setCurrentQIndex(0);
      setAnswers({});
      setResult(null);
      setTimeLeft((res.data.durationMinutes || 15) * 60);
      toast.success("Test session started. Good luck!");
    } catch (error) {
      toast.error("Failed to start assessment");
    } finally {
      setLoading(false);
    }
  };

  // Select an option
  const handleSelectOption = (optIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQIndex]: optIndex,
    }));
  };

  // Submit test
  const handleSubmitTest = async () => {
    if (!activeAssessment) return;
    setSubmitting(true);
    try {
      const res = await submitAssessment(activeAssessment._id, answers);
      setResult(res.data);
      toast.success(`Test completed! Your score: ${res.data.score}/${res.data.totalQuestions}`);
    } catch (error) {
      toast.error("Failed to submit assessment");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? "0" : ""}${remSecs}`;
  };

  if (loading && !activeAssessment) {
    return (
      <div className="p-12 text-center text-stone-500 flex flex-col items-center gap-3">
        <Loader2 size={24} className="animate-spin text-[#4338ca]" />
        <span className="text-xs font-semibold">Loading practice assessments...</span>
      </div>
    );
  }

  // 1. RESULT / SCORECARD VIEW
  if (result) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {/* Scorecard Hero */}
        <div className={`rounded-3xl border p-6 sm:p-8 text-center ${result.passed ? "bg-[#edf6ef] border-[#cde6d3]" : "bg-[#fdebee] border-[#f7ced5]"}`}>
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Award size={28} className={result.passed ? "text-[#15803d]" : "text-[#be123c]"} />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#111827]">
            {result.passed ? "Assessment Cleared! 🎉" : "Assessment Completed"}
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5563] mt-1">
            {activeAssessment.title} · {activeAssessment.category}
          </p>

          <div className="mt-5 inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-white border border-black/5 shadow-2xs">
            <div>
              <div className="text-2xl font-black text-[#111827]">{result.score} / {result.totalQuestions}</div>
              <div className="text-[11px] font-bold text-[#6b7280]">Correct Answers</div>
            </div>
            <div className="h-8 w-px bg-[#e5dccb]" />
            <div>
              <div className="text-2xl font-black text-[#4338ca]">{result.percentage}%</div>
              <div className="text-[11px] font-bold text-[#6b7280]">Accuracy Score</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => handleStartTest(activeAssessment._id)}
              className="px-5 py-2.5 rounded-xl bg-[#4338ca] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw size={14} /> Retake Test
            </button>
            <button
              onClick={() => {
                setActiveAssessment(null);
                setResult(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-white border border-[#d9cebe] text-[#374151] font-bold text-xs"
            >
              Back to Test List
            </button>
          </div>
        </div>

        {/* Detailed Solutions & Explanation Review */}
        <div className="space-y-4">
          <h3 className="font-bold text-base text-[#111827]">Detailed Answer Explanations</h3>
          {result.review.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-5 bg-white shadow-2xs ${
                item.isCorrect ? "border-[#cde6d3]" : "border-[#f7ced5]"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-xs text-[#4b5563]">Question {idx + 1}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  item.isCorrect ? "bg-[#edf6ef] text-[#15803d] border-[#cde6d3]" : "bg-[#fdebee] text-[#be123c] border-[#f7ced5]"
                }`}>
                  {item.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <p className="font-bold text-sm text-[#111827] mb-3">{item.questionText}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {item.options.map((opt, optIdx) => {
                  const isCorrectAnswer = optIdx === item.correctOptionIndex;
                  const isSelectedByUser = optIdx === item.selectedOption;

                  return (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 ${
                        isCorrectAnswer
                          ? "bg-[#edf6ef] border-[#cde6d3] text-[#15803d]"
                          : isSelectedByUser
                          ? "bg-[#fdebee] border-[#f7ced5] text-[#be123c]"
                          : "bg-[#faf6f0] border-[#ede5d8] text-[#4b5563]"
                      }`}
                    >
                      {isCorrectAnswer ? <CheckCircle2 size={14} className="text-[#16a34a]" /> : isSelectedByUser ? <XCircle size={14} className="text-[#dc2626]" /> : <span className="w-3.5 h-3.5" />}
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {item.explanation && (
                <div className="p-3 rounded-xl bg-[#f4ecfb] border border-[#e4d1f7] text-xs text-[#581c87]">
                  <strong>Explanation:</strong> {item.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. ACTIVE TEST INTERFACE VIEW
  if (activeAssessment) {
    const totalQ = activeAssessment.questions.length;
    const currentQ = activeAssessment.questions[currentQIndex];

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {/* Test Navigation & Live Timer Header */}
        <div className="rounded-2xl border border-[#ded3c2] bg-white p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-base text-[#111827]">{activeAssessment.title}</h2>
            <p className="text-xs text-[#6b7280]">
              Question {currentQIndex + 1} of {totalQ}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fef2e6] border border-[#fadbc0] text-xs font-bold text-[#c2410c]">
              <Clock size={15} />
              <span>Time Left: {formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs shadow-2xs transition flex items-center gap-1.5"
            >
              <Send size={13} />
              {submitting ? "Grading..." : "Submit Test"}
            </button>
          </div>
        </div>

        {/* Question Box */}
        <div className="rounded-3xl border border-[#ded3c2] bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#f4ecfb] text-[#6b21a8] border border-[#e4d1f7]">
              {activeAssessment.category}
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-[#111827] mt-3">
              {currentQ.questionText}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center gap-3 ${
                    isSelected
                      ? "bg-[#e8f3fc] border-[#2563eb] text-[#1e40af] shadow-2xs font-bold"
                      : "bg-[#faf6f0] border-[#ede5d8] text-[#374151] hover:bg-[#f3ece0]"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                    isSelected ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-[#d1d5db] bg-white text-[#6b7280]"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Question Nav Bar */}
          <div className="pt-4 border-t border-[#f3ece0] flex items-center justify-between">
            <button
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-4 py-2 rounded-xl border border-[#d9cebe] text-xs font-bold text-[#4b5563] hover:bg-stone-50 disabled:opacity-40 flex items-center gap-1.5"
            >
              <ArrowLeft size={13} /> Previous
            </button>

            {/* Question Quick Jump Badges */}
            <div className="hidden sm:flex items-center gap-1.5">
              {activeAssessment.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    currentQIndex === idx
                      ? "bg-[#4338ca] text-white"
                      : answers[idx] !== undefined
                      ? "bg-[#edf6ef] text-[#15803d] border border-[#cde6d3]"
                      : "bg-[#faf6f0] text-[#6b7280] border border-[#ede5d8]"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentQIndex((prev) => Math.min(totalQ - 1, prev + 1))}
              disabled={currentQIndex === totalQ - 1}
              className="px-4 py-2 rounded-xl border border-[#d9cebe] text-xs font-bold text-[#4b5563] hover:bg-stone-50 disabled:opacity-40 flex items-center gap-1.5"
            >
              Next <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. PRACTICE TESTS CATALOG VIEW
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#15803d] bg-[#edf6ef] border border-[#cde6d3] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles size={12} />
            Online Assessment (OA) Practice Hub
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827]">
          Mock Online Assessments
        </h1>
        <p className="text-xs sm:text-sm text-[#4b5563] mt-0.5">
          Practice timed assessments for Core Data Structures, DBMS, and General Aptitude before real placement drives.
        </p>
      </div>

      {/* Available Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {assessments.map((test) => (
          <div
            key={test._id}
            className="rounded-3xl border border-[#ded3c2] bg-white p-6 shadow-xs flex flex-col justify-between hover:border-[#4338ca] transition duration-150"
          >
            <div>
              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-md bg-[#f4ecfb] text-[#6b21a8] border border-[#e4d1f7]">
                {test.category}
              </span>
              <h3 className="font-bold text-base text-[#111827] mt-3">{test.title}</h3>

              <div className="mt-4 pt-3 border-t border-[#f3ece0] space-y-1.5 text-xs text-[#4b5563]">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-bold text-[#111827]">{test.questions?.length || 5} MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-bold text-[#111827]">{test.durationMinutes || 15} Mins</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStartTest(test._id)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#4338ca] hover:bg-[#3730a3] text-white font-bold text-xs shadow-2xs transition flex items-center justify-center gap-1.5"
            >
              <Play size={14} /> Start Practice Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
