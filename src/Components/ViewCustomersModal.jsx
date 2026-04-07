// ViewCustomersModal.jsx
// Popup modal to view all customers, search, edit, and delete.

import React, { useState, useEffect } from "react";
import EditCustomerModal from "./EditCustomerModal.jsx";

export default function ViewCustomersModal({ onClose, refresh }) {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null); // store customer being edited

    // Fetch customers from backend, with optional search
    const fetchCustomers = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/customers?search=${search}`, { credentials: "include" });
        const data = await res.json();
        setCustomers(data);
    };

    useEffect(() => { fetchCustomers(); }, [search]);

    // Delete customer
    const deleteCustomer = async (id) => {
        if (!window.confirm("Delete this customer?")) return;
        await fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`, { method: "DELETE", credentials: "include" });
        fetchCustomers();
        refresh(); // update count in dashboard
    };

    return (
        <div className="modal-backdrop d-flex justify-content-center align-items-center">
            <div className="modal-dialog p-3 bg-light rounded shadow" style={{ width: 600, maxHeight: "70vh", overflowY: "auto" }}>
                <h5>Customers</h5>

                {/* Search input */}
                <input className="form-control my-2" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />

                {/* Customer table */}
                <table className="table table-striped">
                    <thead>
                        <tr><th>Name</th><th>Phone</th><th>Address</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{c.phone}</td>
                                <td>{c.address}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => setEditing(c)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteCustomer(c._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-end mt-2">
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>

                {/* Show edit modal if editing */}
                {editing && <EditCustomerModal customer={editing} onClose={() => setEditing(null)} refresh={() => { fetchCustomers(); refresh(); }} />}
            </div>
        </div>
    );
}