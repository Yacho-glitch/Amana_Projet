import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Sidebar from './Sidebar';

export default function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar 
                collapsed={collapsed} 
                onToggle={() => { 
                    setCollapsed((c) => !c);
                    setMenuOpen(false);
                }}
                menuOpen={menuOpen}    
                setMenuOpen={setMenuOpen}
            />
                {/* Main content area */}
                <div className="flex flex-col flex-1 min-w-0">
                    {/* Top navbar */}
                    <Navbar user={{ name: "User Text1", role: "Client" }}/>

                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </main>
                </div>
        </div>
    );
}