import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Search, MapPin, PackageCheck } from "lucide-react";

import {
  getLostFoundItems,
  createLostFoundItem,
  updateLostFoundStatus,
} from "../services/lostFoundService";

import { useAuth } from "../context/AuthContext";


export default function LostFound() {

  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    location: "",
  });


  const fetchItems = async () => {
    try {
      const response = await getLostFoundItems();
      setItems(response.data);
    } catch (error) {
      toast.error("Failed to load lost & found items");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchItems();
  }, []);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.itemName.trim()) {
      toast.error("Please enter the item name");
      return;
    }

    try {
      await createLostFoundItem(form);
      toast.success("Lost item reported");
      setForm({ itemName: "", description: "", location: "" });
      setShowForm(false);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to report item");
    }
  };


  const handleMarkFound = async (id) => {
    try {
      await updateLostFoundStatus(id, { status: "Found" });
      toast.success("Marked as found");
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };


  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">Lost &amp; Found</h1>

          <p className="text-gray-500">
            {isAdmin
              ? "All lost items reported by students"
              : "Report a lost item, or mark yours as found"}
          </p>
        </div>

        {isStudent && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            {showForm ? "Cancel" : "+ Report Lost Item"}
          </button>
        )}

      </div>


      {isStudent && showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 border shadow-sm mb-8 space-y-4 max-w-2xl"
        >

          <input
            name="itemName"
            placeholder="What did you lose? (e.g. Blue water bottle)"
            value={form.itemName}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="location"
            placeholder="Last seen location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            name="description"
            placeholder="Any other details that could help identify it"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold">
            Submit Report
          </button>

        </form>
      )}


      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No lost items reported yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {items.map((item) => {

            const isOwner = item.reportedBy?._id === user?._id;

            return (
              <div
                key={item._id}
                className="bg-white rounded-3xl p-6 border shadow-sm"
              >

                <div className="flex justify-between items-start gap-3">

                  <div className="flex gap-3 items-start">

                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                      <Search size={20} />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">{item.itemName}</h2>
                      {item.location && (
                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                          <MapPin size={14} />
                          {item.location}
                        </p>
                      )}
                    </div>

                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                      item.status === "Found"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                {item.description && (
                  <p className="mt-4 text-gray-700">{item.description}</p>
                )}

                {(isAdmin || isOwner) && (
                  <p className="mt-3 text-sm text-gray-500">
                    Reported by: {item.reportedBy?.name} ({item.reportedBy?.email})
                  </p>
                )}

                {item.status !== "Found" && (isOwner || isAdmin) && (
                  <button
                    onClick={() => handleMarkFound(item._id)}
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold"
                  >
                    <PackageCheck size={18} />
                    Mark as Found
                  </button>
                )}

              </div>
            );

          })}

        </div>
      )}

    </div>
  );
}
