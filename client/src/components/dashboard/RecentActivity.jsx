import {
  CircleCheck,
  Briefcase,
  Calendar,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    icon: <UserPlus size={18} />,
    title: "Rahul Sharma registered",
    subtitle: "2 minutes ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Briefcase size={18} />,
    title: "Google opened applications",
    subtitle: "15 minutes ago",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <Calendar size={18} />,
    title: "Microsoft interview scheduled",
    subtitle: "1 hour ago",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <CircleCheck size={18} />,
    title: "Priya received an offer",
    subtitle: "Today",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div>
              <p className="font-medium text-gray-800">
                {activity.title}
              </p>

              <p className="text-sm text-gray-500">
                {activity.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}