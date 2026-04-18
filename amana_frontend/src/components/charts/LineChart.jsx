import { 
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const data = [
    { month: "Juil 2025", crbt: 175100, envois: 26 },
    { month: "Aout 2025", crbt: 449310, envois: 82 }
];

export default function LineChart() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Total CRBT vs Total Envois
            </h3>

            <ResponsiveContainer width="100%" height={280}>
                <ReLineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                    />
                    <YAxis 
                        yAxisId="crbt"
                        orientation="left"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                    />
                    <Tooltip 
                        formatter={(value, name) => 
                            name === "Total CRBT"
                            ? `${value.toLocaleString()} MAD`
                            : value
                        }
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", marginTop: "8px" }}/>
                    <Line 
                        yAxisId="crbt"
                        type="monotone"
                        dataKey="crbt"
                        name="Total CRBT"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#f97316" }}
                    />
                     <Line 
                        yAxisId="envois"
                        type="monotone"
                        dataKey="envois"
                        name="Total Envois"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#3b82f6" }}
                    />
                </ReLineChart>
            </ResponsiveContainer>
        </div>
    );
}
