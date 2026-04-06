import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch("https://trendfluence-backend.onrender.com/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = "/dashboard";
            } else {
                alert(data.msg);
            }

        } catch (err) {
            console.log(err);
            alert("Server error");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "300px" }}>
                <h4 className="text-center">Login</h4>

                <input
                    className="form-control my-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control my-2"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary w-100 mt-2" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}