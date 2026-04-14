import Amana from "../../assets/amana.jpg";

export default function Navbar({ user = { name : "User text1", role : "Client" } }) {

    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm z-10">
                <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">Bienvenue: {user.name}</p>
                    <p className="text-xs text-gray-400">Profile: {user.role}</p>
                </div>
            
                <img 
                    src={Amana} 
                    alt="Amana"
                    className="h-10 object-contain"
                    onError={(e) => (e.target.style.display = "none")} 
                />

            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:bg-orange-600 transition-colors select-none">
                {user.name.charAt(0).toUpperCase()}
            </div>
        </header>
    );
}
