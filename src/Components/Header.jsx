import logo from "../assets/trend-logo.png";
import React, { useState, useEffect } from "react";

export default function Header({ onLogout }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleMode = () => setDarkMode(!darkMode);

    return (
        <header className="d-flex justify-content-between align-items-center p-3 mb-4 border-bottom">
            {/* Logo */}
            <div className="d-flex align-items-center">
                <img src={logo} alt="Logo" style={{ height: "40px" }} />
                <h4 className="ms-2 mb-0">Invoice Dashboard</h4>
            </div>

            {/* Mode toggle & Logout */}
            <div className="d-flex align-items-center gap-2">
                <button className="btn btn-outline-secondary" onClick={toggleMode}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button className="btn btn-outline-danger" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}