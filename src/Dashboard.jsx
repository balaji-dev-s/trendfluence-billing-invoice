import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";


export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) navigate("/");
            })
            .catch(() => navigate("/"));
    }, []);

    const handleLogout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        window.location.href = "/";
    };

    return (
        <div className="container mt-3">
            {/* Header */}
            <Header onLogout={handleLogout} />

            {/* Dashboard content */}
            <h2>Welcome Admin 👋</h2>
            <p>Here you will see stats, buttons, and reports soon.</p>
        </div>
    );
}