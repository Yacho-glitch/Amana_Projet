import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function DonutChart({ title, data, colors }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
            <PieChart width={250} height={220}>
                <Pie
                    data={data}
                    cx={120}
                    cy={110}
                    innerRadius={70}
                    outerRadius={110}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={colors[index]}/>
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`}/>
            </PieChart>

            <div className="flex flex-row gap-1 mt-4">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <span 
                            className="w-3 h-3 rounded-sm inline-block"
                            style={{ backgroundColor: colors[index] }}
                        />
                        <span className="text-xs text-gray-500">{entry.name}</span>
                    </div>
                ))}
            </div>

    
        </div>
    )
}