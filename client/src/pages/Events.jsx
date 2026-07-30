import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays, MapPin, Clock, Trash2 } from "lucide-react";

import { getEvents, deleteEvent } from "../services/eventService";
import AddEventModal from "../components/event/AddEventModal";
import { useAuth } from "../context/AuthContext";


export default function Events() {

  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);


  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted");
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };


  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">Events</h1>

          <p className="text-gray-500">
            {isAdmin ? "Manage upcoming campus events" : "Upcoming campus events"}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            + Add Event
          </button>
        )}

      </div>


      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events scheduled yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {events.map((event) => (

            <div
              key={event._id}
              className="bg-white rounded-3xl p-6 border shadow-sm"
            >

              <div className="flex justify-between items-start">

                <div className="flex gap-3 items-center">

                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                    <CalendarDays size={20} />
                  </div>

                  <h2 className="font-bold text-xl">{event.title}</h2>

                </div>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                )}

              </div>

              {event.description && (
                <p className="mt-4 text-gray-600">{event.description}</p>
              )}

              <div className="mt-5 space-y-2 text-gray-700">

                <p className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-gray-400" />
                  {new Date(event.date).toLocaleDateString()}
                </p>

                {event.time && (
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    {event.time}
                  </p>
                )}

                {event.location && (
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    {event.location}
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>
      )}


      {showModal && (
        <AddEventModal
          closeModal={() => setShowModal(false)}
          refresh={fetchEvents}
        />
      )}

    </div>
  );
}
