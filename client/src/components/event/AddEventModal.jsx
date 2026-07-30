import { useState } from "react";
import toast from "react-hot-toast";

import { createEvent } from "../../services/eventService";


export default function AddEventModal({ closeModal, refresh }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date) {
      toast.error("Please provide at least a title and date");
      return;
    }

    try {
      await createEvent(formData);
      toast.success("Event added");
      refresh();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add event");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">

      <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">Add Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Event title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            name="description"
            placeholder="Event details"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="time"
            placeholder="Time (e.g. 10:00 AM)"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <div className="flex gap-4">

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 border rounded-xl py-3"
            >
              Cancel
            </button>

            <button className="flex-1 bg-blue-600 text-white rounded-xl py-3">
              Add Event
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
