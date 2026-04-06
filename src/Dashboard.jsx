import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) {
                    navigate("/");
                }
            })
            .catch(() => navigate("/"));
    }, []);

    const logout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        window.location.href = "/";
    };

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <p>Welcome Admin 👋</p>
            <button className="btn btn-danger mt-3" onClick={logout}>
                Logout
            </button>
        </div>
    );
}