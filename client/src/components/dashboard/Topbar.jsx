import { Bell, Search } from "lucide-react";

export default function Topbar() {

    const hour = new Date().getHours();

    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    return (
        <div className="flex justify-between items-center mb-10">

            <div>

                <h1 className="text-4xl font-bold">
                    {greeting}, Shruti
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome back to CampusFlow
                </p>

            </div>

            <div className="flex items-center gap-5">

                <div className="relative">

                    <Search
                        className="absolute left-4 top-3 text-gray-400"
                        size={18}
                    />

                    <input
                        placeholder="Search companies, events..."
                        className="pl-12 pr-5 py-3 rounded-xl border bg-white outline-none"
                    />

                </div>

                <button className="bg-white p-3 rounded-xl shadow hover:bg-gray-100 transition">
                    <Bell />
                </button>

                <img
                    src="https://i.pravatar.cc/100"
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                />

            </div>

        </div>
    );
}