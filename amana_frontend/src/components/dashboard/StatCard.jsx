export default function StatCard({ label, value, icon, color }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-5 flex items-center justify-between border-b-4 ${color}`}>
            <div>
                <p className="text-sm text-gray-400 font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            <img
                className="w-16" 
                src={icon} 
                alt="icon" 
            />
        </div>
    );
}