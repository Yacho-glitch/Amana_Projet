import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Amana from "../../assets/amana.jpg";

const navItems = [
        { 
            label: "Mes statistiques",
            to: "/",
            icon: <i className="fa-solid fa-chart-bar w-4 text-center"/>,
        },
        {
            label: "Mes envois",
            to: "/envois",
            icon: <i className="fa-solid fa-box w-4 text-center" />,
        }, 
        {
            label: "Mes demandes",
            to: "/mes-demandes",
            icon: <i className="fa-solid fa-pen-to-square w-4 text-center" />,
        },
        {
            label: "Demandes de modification",
            to: "/demandes",
            icon: <i className="fa-solid fa-file-lines w-4 text-center" />
        },
        {
            label: "Créer un client",
            to: "/creer-client",
            icon: <i className="fa-solid fa-user-plus w-4 text-center" />,
        },
        {
            label: "Créer un utilisateur",
            to: "/creer-utilisateur",
            icon:  <i className="fa-solid fa-user w-4 text-center" />,
        },
        {
            label: "Liste d'utilisateurs",
            to: "/utilisateurs",
            icon: <i className="fa-solid fa-users w-4 text-center" />,
        }
    ];

export default function Sidebar({ collapsed, onToggle, menuOpen, setMenuOpen }) {
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setMenuOpen]);
   
    return (
        <aside
            className={`
                h-screen bg-white border-r border-gray-100 flex flex-col
                transition-all duration-300 ease-in-out shadow-sm
                ${collapsed ? "w-16" : "w-64"}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
                {!collapsed && (
                    <img 
                      src={Amana}
                      alt="Amana"
                      className="h-8 object-contain"
                      onError={(e) => { e.target.style.display = "none";
                      }}
                      />
                )}

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => {
                            if (collapsed) {
                                setMenuOpen((o) => !o);
                            } else {
                                onToggle();
                            }
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <i className="fa-solid fa-bars text-lg"/>
                    </button>

                {/* Dropdown - only when collapsed  */}
                {collapsed && menuOpen && (
                    <div className="absolute left-12 top-0 z-50 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2">
                        <button
                            onClick={() => { onToggle(); setMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                            <i className="fa-solid fa-arrow-right w-4 text-center text-gray-400"/>
                            <span>Expand sidebar</span>
                        </button>

                        <div className="border-t border-gray-100 my-1" />

                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors
                                     ${isActive 
                                        ? "bg-orange-50 text-orange-600" 
                                        : "text-gray-500 hover"
                                    }`
                                }
                            >
                                <span className="text-gray-400">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
              </div>
            </div>

            {!collapsed && (
                <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.to}
                            to={item.to}
                            end={item.to === "/"}
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                                transition-all duration-150 group 
                                ${isActive
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`shrink-0 ${isActive ? "text-orange-500" : "text-gray-400 group-hover:text-gray-600"}`}>
                                        {item.icon}
                                    </span>
                                    <span className="truncate">{item.label}</span>
                                    {isActive && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            )}

            {collapsed && (
                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.to}
                            to={item.to}
                            end={item.to === "/"}
                            title={item.label}
                            className={({ isActive }) => (
                                `flex items-center justify-center py-2.5 rounded-xl text-sm transition-all
                                 ${isActive 
                                    ? "bg-orange-50 text-orange-500"
                                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                                 }
                                `
                            )}
                        >
                            {item.icon}
                        </NavLink>
                    ))}
                </nav>
            )}

            {!collapsed && (
                <div className="px-4 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-sm">U</div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-gray-700 truncate">User Test1</p>
                            <p className="text-xs text-gray-400">Client</p>
                        </div>
                    </div>
                </div>
            )}
            </aside>
    );
}