// AddCustomerModal.jsx
// Modal to add a new customer

import React, { useState } from "react";

export default function AddCustomerModal({ onClose, refresh }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleAdd = async () => {
        if (!name || !phone) return alert("Name and phone required");
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/customers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, address }),
                credentials: "include"
            });
            refresh(); // Refresh customer list/count
            onClose();
        } catch {
            alert("Server error");
        }
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Customer</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        <input className="form-control mb-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                        <input className="form-control mb-2" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button className="btn btn-primary" onClick={handleAdd}>Add Customer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}