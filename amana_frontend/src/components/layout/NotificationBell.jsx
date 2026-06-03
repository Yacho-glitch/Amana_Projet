import { useState, useEffect, useRef } from "react";
import api from "../../api/apiService";
import { useTab } from "../../context/TabContext";

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null);
    const { setActiveTab } = useTab();

    async function fetchNotifications() {
        try {
            setLoading(true);
            const response = await api.get("/notifications");
            setNotifications(response.data.notifications);
            setError(null);
        } catch (err) {
            console.error("Erreur notifications:", err);
            setError("Impossible de charger les notifications.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 30000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (open) {
            fetchNotifications();
        }
    }, [open]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function markAsRead(notification) {
        if (notification.read_at) {
            return;
        }

        try {
            await api.patch(`/notifications/${notification.id}/read`);
            setNotifications((items) =>
                items.map((item) =>
                    item.id === notification.id ? { ...item, read_at: new Date().toISOString() } : item
                )
            );
        } catch (err) {
            console.error("Erreur lors de la lecture de la notification", err);
        }
    }

    const unreadCount = notifications.filter((item) => !item.read_at).length;

    function handleNotificationClick(notification) {
        markAsRead(notification);
        setOpen(false);
        const targetTab = notification.data?.target_tab || "mes-envois";
        setActiveTab(targetTab);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="relative p-2 rounded-lg text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                title="Notifications"
            >
                <i className="fa-solid fa-bell text-lg" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">Notifications</p>
                        <button
                            className="text-xs text-gray-400 hover:text-gray-700"
                            onClick={() => fetchNotifications()}
                        >
                            Actualiser
                        </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-sm text-gray-500">Chargement...</div>
                        ) : error ? (
                            <div className="p-4 text-sm text-red-500">{error}</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">Aucune notification.</div>
                        ) : (
                            notifications.map((notification) => (
                                <button
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${!notification.read_at ? 'bg-orange-50' : ''}`}
                                >
                                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                                    {notification.data?.description && (
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {notification.data.description}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">{new Date(notification.created_at).toLocaleString('fr-FR')}</p>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
