import { PieChart, Pie, Cell } from "recharts";

const value = 98.41;

const data = [
    { name: "Payé", value: value },
    { name: "Impayé", value: 100 - value  }
];

const COLORS = ["#3b82f6", "#ef4444"];

export default function GaugeChart() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Statut des paiements</h3>

            <div className="relative">
                <PieChart width={250} height={140}>
                    <Pie
                        data={data}
                        cx={120}
                        cy={130}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={80}
                        outerRadius={120}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]}/>
                        ))}
                    </Pie>
                </PieChart>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                        <p className="text-lg font-bold text-gray-800">{value}%</p>
                        <p className="text-xs text-gray-400">Payé</p>
                </div>
            </div>

            {/* Custom legend */}
            <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block bg-red-500" />
                    <span className="text-xs text-gray-500">Impayé</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block bg-blue-500" />
                    <span className="text-xs text-gray-500">Payé</span>
                </div>
            </div>
        </div>
    );
}