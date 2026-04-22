import Amana from "../../assets/amana.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user: userProp }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const displayUser = user || userProp;

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm z-10">
            <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">Bienvenue: {displayUser?.name}</p>
                <p className="text-xs text-gray-400">Profile: {displayUser?.role}</p>
            </div>
            
            <img 
                src={Amana} 
                alt="Amana"
                className="h-10 object-contain"
                onError={(e) => (e.target.style.display = "none")} 
            />
            <div className="flex items-center gap-3">
                <button
                    onClick={handleLogout}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    title="Se déconnecter"
                >
                    <i className="fa-solid fa-right-from-bracket text-lg"/>
                </button>
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:bg-orange-600 transition-colors select-none">
                    {displayUser?.name?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
}
