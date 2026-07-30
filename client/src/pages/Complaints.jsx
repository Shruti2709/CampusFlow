import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipboardList, CheckCircle2 } from "lucide-react";

import {
  getComplaints,
  createComplaint,
  updateComplaintStatus,
} from "../services/complaintService";

import { useAuth } from "../context/AuthContext";


const statusStyles = {
  "Open": "bg-red-100 text-red-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Resolved": "bg-green-100 text-green-700",
};


export default function Complaints() {

  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "General",
    description: "",
  });


  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();
      setComplaints(response.data);
    } catch (error) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchComplaints();
  }, []);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please fill in a title and description");
      return;
    }

    try {
      await createComplaint(form);
      toast.success("Complaint filed");
      setForm({ title: "", category: "General", description: "" });
      setShowForm(false);
      fetchComplaints();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to file complaint");
    }
  };


  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, { status });
      toast.success("Complaint updated");
      fetchComplaints();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };


  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">Complaints</h1>

          <p className="text-gray-500">
            {isAdmin
              ? "Review and resolve student complaints"
              : "File a complaint and track its status"}
          </p>
        </div>

        {isStudent && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            {showForm ? "Cancel" : "+ File Complaint"}
          </button>
        )}

      </div>


      {isStudent && showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 border shadow-sm mb-8 space-y-4 max-w-2xl"
        >

          <input
            name="title"
            placeholder="Complaint title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>General</option>
            <option>Hostel</option>
            <option>Academics</option>
            <option>Placement</option>
            <option>Infrastructure</option>
            <option>Other</option>
          </select>

          <textarea
            name="description"
            placeholder="Describe your complaint"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold">
            Submit
          </button>

        </form>
      )}


      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500">
          {isAdmin ? "No complaints have been filed yet." : "You haven't filed any complaints yet."}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {complaints.map((complaint) => (

            <div
              key={complaint._id}
              className="bg-white rounded-3xl p-6 border shadow-sm"
            >

              <div className="flex justify-between items-start gap-3">

                <div className="flex gap-3 items-start">

                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                    <ClipboardList size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-lg">{complaint.title}</h2>
                    <p className="text-gray-500 text-sm">{complaint.category}</p>
                  </div>

                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusStyles[complaint.status] || "bg-slate-100 text-slate-700"}`}
                >
                  {complaint.status}
                </span>

              </div>

              <p className="mt-4 text-gray-700">{complaint.description}</p>

              {isAdmin && (
                <p className="mt-3 text-sm text-gray-500">
                  Filed by: {complaint.student?.name} ({complaint.student?.email})
                </p>
              )}

              {complaint.adminRemarks && (
                <p className="mt-3 text-sm bg-slate-50 border rounded-xl p-3 text-gray-600">
                  Admin remarks: {complaint.adminRemarks}
                </p>
              )}

              {isAdmin && (
                <div className="mt-5 flex gap-2 flex-wrap">

                  {complaint.status !== "In Progress" && (
                    <button
                      onClick={() => handleStatusChange(complaint._id, "In Progress")}
                      className="border border-amber-500 text-amber-600 px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      Mark In Progress
                    </button>
                  )}

                  {complaint.status !== "Resolved" && (
                    <button
                      onClick={() => handleStatusChange(complaint._id, "Resolved")}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      <CheckCircle2 size={16} />
                      Mark Resolved
                    </button>
                  )}

                </div>
              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}
