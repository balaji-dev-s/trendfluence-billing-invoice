import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import CustomerCard from "./Components/CustomerCard";


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

    const [customers, setCustomers] = useState([]);

    const refresh = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/customers`, { credentials: "include" });
            const data = await res.json();
            setCustomers(data);
        } catch { console.log("Error fetching customers"); }
    };

    useEffect(() => { refresh(); }, []);

    return (
        <div className="container mt-3">
            {/* Header */}
            <Header onLogout={handleLogout} />

            {/* Dashboard content */}
            <h2>Welcome Admin 👋</h2>
            <div className="container mt-4">
                <CustomerCard customers={customers} refresh={fetchCustomers} />
            </div>
        </div>
    );
}