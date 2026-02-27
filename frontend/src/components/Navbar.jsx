import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Force fresh navigation so all state resets
        navigate("/login", { replace: true });
        window.location.reload();
    };
    return (
        <nav className="bg-black border-b border-pink-600/40 shadow-lg w-full sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16 gap-3">

                    {/* Logo Section */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-pink-600/20 border border-pink-500/40">
                            <svg
                                className="w-6 h-6 text-pink-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 13h4v8H3zm7-8h4v16h-4zm7 4h4v12h-4z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide">
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                            DataDash
                        </span>
                        </h1>
                                            </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">

                        {/* Notification */}
                        <button className="text-gray-400 hover:text-pink-500 transition duration-300">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                                />
                            </svg>
                        </button>

                        {/* User Profile / Logout */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-zinc-900 px-4 py-1.5 rounded-full border border-pink-500/30">
                                <div className="w-8 h-8 rounded-full bg-pink-500 text-black flex items-center justify-center font-bold text-sm shadow-md">
                                    {(user?.name || "User").charAt(0).toUpperCase()}
                                </div>

                                <span className="text-white font-medium text-sm max-w-[120px] truncate">
                                    {user?.name || "Authenticated User"}
                                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="text-xs font-semibold text-black bg-pink-600 hover:bg-pink-500 px-3 py-1.5 rounded-full shadow-md shadow-pink-600/40 transition"
                            >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;