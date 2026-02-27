import { useState, useRef, useEffect } from "react";

function CustomSelect({ label, name, value, options, onChange }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col w-44 relative" ref={dropdownRef}>
            <label className="text-xs text-gray-400 mb-1">{label}</label>

            {/* Selected Box */}
            <div
                onClick={() => setOpen(!open)}
                className="bg-black border border-zinc-700 text-gray-200 
        px-4 py-2.5 rounded-lg cursor-pointer 
        flex justify-between items-center
        focus-within:ring-2 focus-within:ring-pink-500
        hover:border-pink-500 transition-all duration-300"
            >
                <span>{value || `All ${label}`}</span>
                <span
                    className={`text-pink-400 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                >
                    ▼
                </span>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-full mt-2 w-full bg-black 
        border border-pink-500/40 rounded-lg shadow-lg z-50 overflow-hidden">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                onChange({ target: { name, value: option } });
                                setOpen(false);
                            }}
                            className="px-4 py-2.5 text-gray-200 cursor-pointer
              hover:bg-pink-600 hover:text-white 
              transition-all duration-200"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomSelect;