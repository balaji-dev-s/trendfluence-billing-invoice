// AddCustomerModal.jsx
// This is a popup modal to add a new customer to the database.

import React, { useState } from "react";

export default function AddCustomerModal({ onClose, refresh }) {
    // State variables to store input field values
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Function to send new customer to server
    const addCustomer = async () => {
        // Validation: name and phone are required
        if (!name || !phone) return alert("Name and phone required");

        // POST request to backend API
        const res = await fetch(`${import.meta.env.VITE_API_URL}/customers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, address }),
            credentials: "include"
        });

        if (res.ok) {
            // Refresh parent customer list and close modal
            refresh();
            onClose();
        } else {
            const data = await res.json();
            alert(data.msg || "Error adding customer");
        }
    };

    return (
        // Modal overlay
        <div className="modal-backdrop d-flex justify-content-center align-items-center">
            <div className="modal-dialog p-3 bg-light rounded shadow" style={{ width: 400 }}>
                <h5>Add Customer</h5>

                {/* Input fields */}
                <input className="form-control my-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input className="form-control my-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                <input className="form-control my-2" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />

                {/* Action buttons */}
                <div className="d-flex justify-content-end gap-2 mt-2">
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn btn-primary" onClick={addCustomer}>Add</button>
                </div>
            </div>
        </div>
    );
}