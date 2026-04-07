import logo from "../assets/trend-logo.png";
import { useState, useEffect } from "react";

export default function Header({ onLogout }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleMode = () => setDarkMode(!darkMode);

    return (
        <header className="border-bottom p-3 mb-4">

            {/* Top Row */}
            <div className="d-flex justify-content-between align-items-center">

                {/* Logo LEFT */}
                <div className="d-flex align-items-center">
                    <img src={logo} alt="Logo" style={{ height: "40px" }} />
                    <h5 className="ms-2 mb-0">Invoice Dashboard</h5>
                </div>

                {/* Desktop Buttons */}
                <div className="d-none d-md-flex gap-2">
                    <button className="btn btn-outline-secondary" onClick={toggleMode}>
                        {darkMode ? "Light" : "Dark"}
                    </button>
                    <button className="btn btn-outline-danger" onClick={onLogout}>
                        Logout
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="btn btn-outline-secondary d-md-none"
                    onClick={() => setOpen(!open)}
                >
                    <i className="bi bi-list"></i>
                </button>
            </div>

            {/* Mobile Dropdown */}
            {open && (
                <div className="d-flex flex-column gap-2 mt-3 d-md-none">
                    <button className="btn btn-outline-secondary w-100" onClick={toggleMode}>
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button className="btn btn-outline-danger w-100" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}