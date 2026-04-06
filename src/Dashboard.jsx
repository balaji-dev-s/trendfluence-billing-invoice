import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        // check if user is logged in
        fetch("http://localhost:5000/dashboard", {
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) {
                    // not logged in → redirect
                    navigate("/");
                }
            })
            .catch(() => navigate("/"));
    }, []);

    const logout = async () => {
        await fetch("http://localhost:5000/auth/logout", {
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