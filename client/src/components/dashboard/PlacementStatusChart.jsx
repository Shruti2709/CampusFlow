import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Placed", value: 68 },
  { name: "In Process", value: 22 },
  { name: "Not Applied", value: 10 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

export default function PlacementStatusChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
      <h2 className="text-xl font-semibold mb-5">
        Placement Status
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={95}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}