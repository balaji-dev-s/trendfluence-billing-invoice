// EditCustomerModal.jsx
// Popup modal to edit an existing customer's information.

import React, { useState } from "react";

export default function EditCustomerModal({ onClose, refresh, customer }) {
    // Initialize input fields with existing customer data
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    const [address, setAddress] = useState(customer.address || "");

    // Function to update customer on server
    const editCustomer = async () => {
        if (!name || !phone) return alert("Name and phone required");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/customers/${customer._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, address }),
            credentials: "include"
        });

        if (res.ok) {
            // Refresh parent list and close modal
            refresh();
            onClose();
        } else {
            const data = await res.json();
            alert(data.msg || "Error editing customer");
        }
    };

    return (
        <div className="modal-backdrop d-flex justify-content-center align-items-center">
            <div className="modal-dialog p-3 bg-light rounded shadow" style={{ width: 400 }}>
                <h5>Edit Customer</h5>
                <input className="form-control my-2" value={name} onChange={e => setName(e.target.value)} />
                <input className="form-control my-2" value={phone} onChange={e => setPhone(e.target.value)} />
                <input className="form-control my-2" value={address} onChange={e => setAddress(e.target.value)} />
                <div className="d-flex justify-content-end gap-2 mt-2">
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn btn-warning" onClick={editCustomer}>Save</button>
                </div>
            </div>
        </div>
    );
}