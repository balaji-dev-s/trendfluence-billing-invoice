// ViewCustomersModal.jsx
// Modal to view all customers, edit, delete, and search

import React, { useEffect, useState } from "react";

export default function ViewCustomersModal({ onClose, refresh }) {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCustomers = async (query = "") => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/customers?search=${query}`, {
                credentials: "include"
            });
            const data = await res.json();
            setCustomers(data);
        } catch { alert("Server error"); }
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this customer?")) return;
        await fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`, { method: "DELETE", credentials: "include" });
        fetchCustomers(search);
        refresh();
    };

    const handleEdit = async (id) => {
        const newName = prompt("Enter new name");
        const newPhone = prompt("Enter new phone");
        const newAddress = prompt("Enter new address");
        if (!newName || !newPhone) return alert("Name and phone required");
        await fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, phone: newPhone, address: newAddress }),
            credentials: "include"
        });
        fetchCustomers(search);
        refresh();
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Customers</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control mb-2" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); fetchCustomers(e.target.value); }} />
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(c => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{c.phone}</td>
                                        <td>{c.address}</td>
                                        <td>
                                            <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(c._id)}>Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {customers.length === 0 && <tr><td colSpan="4" className="text-center">No customers found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}