import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  MessageSquare,
  Pin,
  Send,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Loader2
} from "lucide-react";
import {
  getDriveQuestions,
  postDriveQuestion,
  answerDriveQuestion
} from "../../services/driveQAService";
import { useAuth } from "../../context/AuthContext";

export default function DriveQABoard({ driveId }) {
  const { user } = useAuth();
  const canAnswer = user?.role === "admin" || user?.role === "recruiter";

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [posting, setPosting] = useState(false);
  const [replyText, setReplyText] = useState({});
  const [replyingId, setReplyingId] = useState(null);

  const fetchQuestions = async () => {
    try {
      const res = await getDriveQuestions(driveId);
      setQuestions(res.data || []);
    } catch (error) {
      console.error("Q&A load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (driveId) fetchQuestions();
  }, [driveId]);

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setPosting(true);
    try {
      await postDriveQuestion(driveId, newQuestion);
      setNewQuestion("");
      toast.success("Question posted to drive board");
      fetchQuestions();
    } catch (error) {
      toast.error("Failed to post question");
    } finally {
      setPosting(false);
    }
  };

  const handleAnswerSubmit = async (qId) => {
    const text = replyText[qId];
    if (!text || !text.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    try {
      await answerDriveQuestion(qId, { answer: text });
      toast.success("Official reply posted");
      setReplyingId(null);
      fetchQuestions();
    } catch (error) {
      toast.error("Failed to submit reply");
    }
  };

  const handleTogglePin = async (qId, currentPinned) => {
    try {
      await answerDriveQuestion(qId, { isPinned: !currentPinned });
      toast.success(currentPinned ? "Unpinned notice" : "Pinned announcement to top");
      fetchQuestions();
    } catch (error) {
      toast.error("Failed to update pin status");
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-[#ebdcc8] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-[#4338ca]" />
          <h4 className="font-bold text-xs sm:text-sm text-[#111827]">
            Drive Discussion &amp; Q&amp;A Noticeboard ({questions.length})
          </h4>
        </div>
        <span className="text-[11px] text-[#6b7280]">Official Drive Thread</span>
      </div>

      {/* Ask Question Input (For students and participants) */}
      <form onSubmit={handlePostQuestion} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask a question about syllabus, rounds, or criteria..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-1 px-3.5 py-2 bg-white border border-[#d9cebe] rounded-xl text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
        />
        <button
          type="submit"
          disabled={posting || !newQuestion.trim()}
          className="px-4 py-2 bg-[#4338ca] hover:bg-[#3730a3] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 shrink-0"
        >
          <Send size={12} />
          {posting ? "Posting..." : "Ask"}
        </button>
      </form>

      {/* Questions Thread */}
      {loading ? (
        <div className="p-4 text-center text-xs text-[#6b7280]">Loading discussions...</div>
      ) : questions.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#faf6f0] border border-[#ebdcc8] text-center text-xs text-[#6b7280]">
          No questions posted yet. Be the first to ask!
        </div>
      ) : (
        <div className="space-y-2.5">
          {questions.map((q) => (
            <div
              key={q._id}
              className={`rounded-2xl border p-3.5 space-y-2 text-xs ${
                q.isPinned
                  ? "bg-[#fef2e6] border-[#fadbc0]"
                  : "bg-white border-[#e5dccb]"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <User size={13} className="text-[#6b7280]" />
                  <span className="font-bold text-[#111827]">{q.askedBy?.name || "Student"}</span>
                  <span className="text-[10px] text-[#9ca3af]">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {canAnswer && (
                  <button
                    onClick={() => handleTogglePin(q._id, q.isPinned)}
                    title={q.isPinned ? "Unpin notice" : "Pin to top"}
                    className={`p-1 rounded-lg ${q.isPinned ? "text-[#c2410c] bg-[#fed7aa]" : "text-[#9ca3af] hover:text-[#4b5563]"}`}
                  >
                    <Pin size={13} />
                  </button>
                )}
              </div>

              {/* Question Text */}
              <p className="text-[#1f2937] font-semibold pl-4 border-l-2 border-[#4338ca]/30">
                {q.question}
              </p>

              {/* Official Answer if present */}
              {q.answer ? (
                <div className="mt-2 p-2.5 rounded-xl bg-[#edf6ef] border border-[#cde6d3] text-xs text-[#166534] flex items-start gap-2">
                  <ShieldCheck size={14} className="text-[#15803d] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[11px] text-[#14532d]">
                      Official TPO / Recruiter Response:
                    </span>
                    <span>{q.answer}</span>
                  </div>
                </div>
              ) : (
                canAnswer && (
                  <div className="pt-2">
                    {replyingId === q._id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Write official response..."
                          value={replyText[q._id] || ""}
                          onChange={(e) => setReplyText({ ...replyText, [q._id]: e.target.value })}
                          className="flex-1 px-3 py-1.5 bg-stone-50 border border-[#d9cebe] rounded-lg text-xs"
                        />
                        <button
                          onClick={() => handleAnswerSubmit(q._id)}
                          className="px-3 py-1.5 bg-[#15803d] text-white font-bold text-xs rounded-lg"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => setReplyingId(null)}
                          className="px-2 py-1.5 text-xs text-[#6b7280]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingId(q._id)}
                        className="text-[11px] font-bold text-[#4338ca] hover:underline"
                      >
                        + Post Official Answer
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
