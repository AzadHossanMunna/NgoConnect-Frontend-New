import React, { useState, useEffect, useRef } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBell, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            const res = await axiosSecure.get('/api/notifications/');
            const data = Array.isArray(res.data) ? res.data : (res.data.results || []);
            setNotifications(data);
            setUnreadCount(data.filter(n => !n.is_read).length);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 60 seconds
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const markAsRead = async (id) => {
        try {
            await axiosSecure.patch(`/api/notifications/${id}/read/`);
            // Optimistic update
            const updated = notifications.map(n => 
                n.id === id ? { ...n, is_read: true } : n
            );
            setNotifications(updated);
            setUnreadCount(updated.filter(n => !n.is_read).length);
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const markAllRead = async () => {
        try {
            await axiosSecure.post('/api/notifications/mark-all-read/');
             // Optimistic update
             const updated = notifications.map(n => ({ ...n, is_read: true }));
             setNotifications(updated);
             setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const handleNotificationClick = (notification) => {
        if (!notification.is_read) {
            markAsRead(notification.id);
        }
    };

    return (
        <div className="relative mr-4" ref={dropdownRef}>
            <button 
                className="btn btn-ghost btn-circle" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="indicator">
                    <FaBell className="h-6 w-6 text-gray-600" />
                    {unreadCount > 0 && (
                        <span className="badge badge-error badge-xs indicator-item text-white border-none min-w-[16px] h-[16px]">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-100 max-h-[500px] flex flex-col">
                    <div className="p-3 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                        <h3 className="font-bold text-gray-700">Notifications</h3>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllRead} 
                                className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1 font-medium"
                            >
                                <FaCheckDouble /> Mark all read
                            </button>
                        )}
                    </div>
                    
                    <div className="overflow-y-auto flex-1">
                        {notifications.length > 0 ? (
                            notifications.map(notif => (
                                <div 
                                    key={notif.id} 
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors ${!notif.is_read ? 'bg-blue-50/50' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm ${!notif.is_read ? 'font-bold text-black' : 'font-semibold text-gray-700'}`}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                            {new Date(notif.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-2">{notif.message}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                <FaBell className="mx-auto mb-2 text-gray-300 text-2xl" />
                                No notifications yet
                            </div>
                        )}
                    </div>
                    {notifications.length > 5 && (
                        <div className="p-2 border-t text-center bg-gray-50 rounded-b-lg">
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-xs text-blue-500 hover:underline">
                                View all in Dashboard
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
