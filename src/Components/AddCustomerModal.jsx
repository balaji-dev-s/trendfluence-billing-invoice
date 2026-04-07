import React, { useState } from "react";

export default function AddCustomerModal({ onClose, refresh }) {

    // input states
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // error messages for each field
    const [error, setError] = useState({ name: "", phone: "" });

    // success message
    const [message, setMessage] = useState("");

    // add customer function
    const handleAdd = async () => {

        // reset errors
        setError({ name: "", phone: "" });

        // validation
        if (!name || !phone) {
            setError({
                name: !name ? "Name is required" : "",
                phone: !phone ? "Phone is required" : ""
            });
            return;
        }

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/customers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, address }),
                credentials: "include"
            });

            // show success message
            setMessage("Customer added successfully ✅");

            // refresh dashboard
            refresh();

            // close modal after delay
            setTimeout(() => {
                onClose();
            }, 1200);

        } catch {
            setMessage("Server error ❌");
            setTimeout(() => setMessage(""), 2000);
        }
    };

    return (
        <div className="modal d-block px-2">

            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* HEADER */}
                    <div className="modal-header">
                        <h5 className="modal-title">Add Customer</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    {/* SUCCESS / ERROR MESSAGE */}
                    {message && (
                        <div className="alert alert-success text-center m-2 small">
                            {message}
                        </div>
                    )}

                    {/* BODY */}
                    <div className="modal-body">

                        {/* NAME */}
                        <input
                            className={`form-control mb-1 ${error.name && "is-invalid"}`}
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        {error.name && (
                            <div className="text-danger small mb-2">{error.name}</div>
                        )}

                        {/* PHONE */}
                        <input
                            className={`form-control mb-1 ${error.phone && "is-invalid"}`}
                            placeholder="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        {error.phone && (
                            <div className="text-danger small mb-2">{error.phone}</div>
                        )}

                        {/* ADDRESS */}
                        <input
                            className="form-control mb-2"
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />

                    </div>

                    {/* FOOTER */}
                    <div className="modal-footer d-flex flex-column flex-sm-row gap-2">

                        {/* CLOSE */}
                        <button className="btn btn-secondary w-100" onClick={onClose}>
                            Close
                        </button>

                        {/* ADD */}
                        <button className="btn btn-primary w-100" onClick={handleAdd}>
                            Add Customer
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}