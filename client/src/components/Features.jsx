import {
  Briefcase,
  Calendar,
  Bell,
  Search,
  ClipboardList,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Placements",
    desc: "Browse companies and apply online."
  },
  {
    icon: Calendar,
    title: "Events",
    desc: "Register for campus events."
  },
  {
    icon: Bell,
    title: "Announcements",
    desc: "Receive important college updates."
  },
  {
    icon: Search,
    title: "Lost & Found",
    desc: "Find or report lost items."
  },
  {
    icon: ClipboardList,
    title: "Complaints",
    desc: "Raise and track complaints."
  },
  {
    icon: Shield,
    title: "Secure Login",
    desc: "JWT authentication and role-based access."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          Features
        </h2>

        <p className="text-center mt-5 text-gray-500">
          Everything you need for smart campus management.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition duration-300"
              >

                <Icon
                  size={45}
                  className="text-blue-600"
                />

                <h3 className="text-2xl font-bold mt-6">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {feature.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}