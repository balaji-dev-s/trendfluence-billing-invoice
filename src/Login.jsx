import { useState } from "react";
import Logo from "./assets/trend-logo.png";
import "./App.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState({ email: "", password: "" });
    const [success, setSuccess] = useState(false);

    const handleLogin = async () => {
        setError({ email: "", password: "" }); // reset errors

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);

                // auto redirect after 1.5s
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);

            } else {
                // handle backend messages
                if (data.msg === "Invalid email") {
                    setError({ email: "Email not found", password: "" });
                } else if (data.msg === "Wrong password") {
                    setError({ email: "", password: "Incorrect password" });
                } else {
                    setError({ email: "", password: "Login failed" });
                }
            }

        } catch (err) {
            setError({ email: "", password: "Server error" });
        }
    };

    // handle Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="container-fluid bg-dark d-flex justify-content-center align-items-center vh-100">

            {/* SUCCESS POPUP */}
            {success && (
                <div className="position-fixed top-0 end-0 p-3">
                    <div className="alert alert-success shadow">
                        Login successful ✅
                    </div>
                </div>
            )}

            <div className="card p-4 shadow" style={{ width: "300px" }}>
                <div className="d-flex justify-content-center">
                    <img src={Logo} alt="Logo" style={{ width: "200px" }} />
                </div>

                <h1 className="text-center fw-bold fs-2">TRENDFLUENCE</h1>
                <h4 className="text-center">Login</h4>

                {/* EMAIL */}
                <input
                    className={`form-control my-2 ${error.email && "is-invalid"}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {error.email && (
                    <div className="text-danger small">{error.email}</div>
                )}

                {/* PASSWORD */}
                <input
                    type="password"
                    className={`form-control my-2 ${error.password && "is-invalid"}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {error.password && (
                    <div className="text-danger small">{error.password}</div>
                )}

                <button className="btn btn-primary login-btn w-100 mt-3" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}