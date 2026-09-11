const interviews = [
  {
    company: "Google",
    role: "SDE Intern",
    date: "Tomorrow",
    time: "10:00 AM",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    date: "Friday",
    time: "2:00 PM",
  },
  {
    company: "Amazon",
    role: "Backend Developer",
    date: "Next Monday",
    time: "11:30 AM",
  },
];

export default function UpcomingInterviews() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
      <h2 className="text-xl font-semibold mb-6">
        Upcoming Interviews
      </h2>

      <div className="space-y-4">
        {interviews.map((interview, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 hover:bg-slate-50 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {interview.company}
                </h3>

                <p className="text-gray-500 text-sm">
                  {interview.role}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">
                  {interview.date}
                </p>

                <p className="text-sm text-gray-500">
                  {interview.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}