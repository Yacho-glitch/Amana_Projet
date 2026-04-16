// import { NavLink } from "react-router-dom";

export function ListLinks({ links, activeTab, setActiveTab }) {
    return (
        // <div className="grid grid-cols-7 gap-2 mb-6 pb-2">
            <div className="flex gap-1 border-b border-gray-200 mb-6">
            {links.map(({ label, id }) => (
                <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`text-xs font-bold px-3 pb-2 whitespace-nowrap transition-colors
                        ${activeTab === id 
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-500 hover:text-blue-500"
                        }`
                    }
                >{label.toUpperCase()}</button>
            ))}
        </div>
    );
}