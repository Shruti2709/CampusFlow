import { motion } from "framer-motion";

export default function StatCard({
    title,
    value,
    icon,
    color
}) {
    return (

        <motion.div

            whileHover={{ y: -6 }}

            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"

        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-4">
                        {value}
                    </h2>

                </div>

                <div
                    className={`w-16 h-16 rounded-2xl ${color} flex justify-center items-center text-white`}
                >
                    {icon}
                </div>

            </div>

        </motion.div>

    );
}