import React, { useState, useRef, useEffect } from "react";

function FilterSection({ onFilter }) {
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        category: "",
        status: "", // backend values: completed | pending | cancelled
    });

    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // These categories and statuses should match the backend seed data exactly
    const categories = ["Electronics", "Furniture", "Fashion"];
    const statusOptions = [
        { label: "Completed", value: "completed" },
        { label: "Pending", value: "pending" },
        { label: "Cancelled", value: "cancelled" },
    ];

    const selectedStatusLabel =
        statusOptions.find((o) => o.value === filters.status)?.label || "All Status";

    return (
        <div className="bg-zinc-900 border border-pink-500/20 rounded-2xl p-4 sm:p-6 shadow-lg mb-8">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col xl:flex-row items-stretch xl:items-center justify-center gap-4 xl:gap-5"
                ref={dropdownRef}
            >

                {/* Start Date */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-xs text-gray-400 mb-1">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleChange}
                        className="bg-black border border-zinc-700 text-gray-200 px-4 py-2.5 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-pink-500 
                        focus:border-pink-500 transition [color-scheme:dark]"
                    />
                </div>

                {/* End Date */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-xs text-gray-400 mb-1">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleChange}
                        className="bg-black border border-zinc-700 text-gray-200 px-4 py-2.5 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-pink-500 
                        focus:border-pink-500 transition [color-scheme:dark]"
                    />
                </div>

                {/* Category Custom Dropdown */}
                <div className="flex flex-col w-full sm:w-56 md:w-64 xl:w-44 relative">
                    <label className="text-xs text-gray-400 mb-1">Category</label>

                    <div
                        onClick={() =>
                            setOpenDropdown(openDropdown === "category" ? null : "category")
                        }
                        className="bg-black border border-zinc-700 text-gray-200 px-4 py-2.5 
                        rounded-lg cursor-pointer flex justify-between items-center
                        hover:border-pink-500 transition-all duration-300"
                    >
                        <span>{filters.category || "All Categories"}</span>
                        <span className={`text-pink-400 transition-transform duration-300 ${openDropdown === "category" ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </div>

                    {openDropdown === "category" && (
                        <div className="absolute top-full mt-2 w-full bg-black border border-pink-500/40 rounded-lg shadow-lg z-50 overflow-hidden">
                            <div
                                onClick={() => {
                                    setFilters({ ...filters, category: "" });
                                    setOpenDropdown(null);
                                }}
                                className="px-4 py-2.5 text-gray-200 cursor-pointer
                                    hover:bg-pink-600 hover:text-white transition-all duration-200"
                            >
                                All Categories
                            </div>
                            {categories.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setFilters({ ...filters, category: item });
                                        setOpenDropdown(null);
                                    }}
                                    className="px-4 py-2.5 text-gray-200 cursor-pointer
                                    hover:bg-pink-600 hover:text-white transition-all duration-200"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status Custom Dropdown */}
                <div className="flex flex-col w-full sm:w-56 md:w-64 xl:w-44 relative">
                    <label className="text-xs text-gray-400 mb-1">Status</label>

                    <div
                        onClick={() =>
                            setOpenDropdown(openDropdown === "status" ? null : "status")
                        }
                        className="bg-black border border-zinc-700 text-gray-200 px-4 py-2.5 
                        rounded-lg cursor-pointer flex justify-between items-center
                        hover:border-pink-500 transition-all duration-300"
                    >
                        <span>{selectedStatusLabel}</span>
                        <span className={`text-pink-400 transition-transform duration-300 ${openDropdown === "status" ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </div>

                    {openDropdown === "status" && (
                        <div className="absolute top-full mt-2 w-full bg-black border border-pink-500/40 rounded-lg shadow-lg z-50 overflow-hidden">
                            <div
                                onClick={() => {
                                    setFilters({ ...filters, status: "" });
                                    setOpenDropdown(null);
                                }}
                                className="px-4 py-2.5 text-gray-200 cursor-pointer
                                    hover:bg-pink-600 hover:text-white transition-all duration-200"
                            >
                                All Status
                            </div>
                            {statusOptions.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setFilters({ ...filters, status: item.value });
                                        setOpenDropdown(null);
                                    }}
                                    className="px-4 py-2.5 text-gray-200 cursor-pointer
                                    hover:bg-pink-600 hover:text-white transition-all duration-200"
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Apply Button */}
                <div className="w-full sm:w-auto">
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-pink-600 hover:bg-pink-500 text-black font-semibold 
                        px-6 py-2.5 rounded-lg shadow-md shadow-pink-600/30 
                        transition-all duration-300"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FilterSection;