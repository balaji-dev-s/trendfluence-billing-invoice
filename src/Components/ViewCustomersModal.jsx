import React, { useEffect, useState } from "react";

export default function ViewCustomersModal({ onClose, refresh }) {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    // for delete confirm modal
    const [deleteId, setDeleteId] = useState(null);

    // for edit modal
    const [editCustomer, setEditCustomer] = useState(null);

    // success message
    const [message, setMessage] = useState("");

    // fetch customers
    const fetchCustomers = async (query = "") => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/customers?search=${query}`, {
                credentials: "include"
            });
            const data = await res.json();
            setCustomers(data);
        } catch {
            console.log("Server error");
        }
    };

    useEffect(() => { fetchCustomers(); }, []);

    // DELETE CONFIRM
    const confirmDelete = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/customers/${deleteId}`, {
            method: "DELETE",
            credentials: "include"
        });

        setDeleteId(null);
        setMessage("Customer deleted successfully ✅");

        fetchCustomers(search);
        refresh();

        setTimeout(() => setMessage(""), 2000);
    };

    // EDIT SAVE
    const saveEdit = async () => {
        const { _id, name, phone, address } = editCustomer;

        if (!name || !phone) {
            setMessage("Name & phone required ❌");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        await fetch(`${import.meta.env.VITE_API_URL}/customers/${_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, address }),
            credentials: "include"
        });

        setEditCustomer(null);
        setMessage("Changes saved successfully ✅");

        fetchCustomers(search);
        refresh();

        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div className="modal d-block">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    {/* HEADER */}
                    <div className="modal-header">
                        <h5 className="modal-title">Customers</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    {/* SUCCESS MESSAGE */}
                    {message && (
                        <div className="alert alert-success text-center m-2">
                            {message}
                        </div>
                    )}

                    {/* BODY */}
                    <div className="modal-body">

                        {/* SEARCH */}
                        <input
                            className="form-control mb-3"
                            placeholder="Search..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                fetchCustomers(e.target.value);
                            }}
                        />

                        {/* TABLE */}
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
                                            <button
                                                className="btn btn-sm btn-warning me-1"
                                                onClick={() => setEditCustomer(c)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => setDeleteId(c._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {customers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No customers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* FOOTER */}
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* DELETE CONFIRM MODAL */}
            {deleteId && (
                <div className="modal d-block">
                    <div className="modal-dialog">
                        <div className="modal-content p-3 text-center">
                            <h5>Are you sure?</h5>
                            <p>Do you want to delete this customer?</p>

                            <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-danger" onClick={confirmDelete}>
                                    Confirm
                                </button>
                                <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editCustomer && (
                <div className="modal d-block">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5>Edit Customer</h5>

                            {/* NAME */}
                            <input
                                className="form-control my-2"
                                placeholder="Name"
                                value={editCustomer.name}
                                onChange={e => setEditCustomer({ ...editCustomer, name: e.target.value })}
                            />

                            {/* PHONE */}
                            <input
                                className="form-control my-2"
                                placeholder="Phone"
                                value={editCustomer.phone}
                                onChange={e => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                            />

                            {/* ADDRESS */}
                            <input
                                className="form-control my-2"
                                placeholder="Address"
                                value={editCustomer.address || ""}
                                onChange={e => setEditCustomer({ ...editCustomer, address: e.target.value })}
                            />

                            <div className="d-flex justify-content-end gap-2 mt-2">
                                <button className="btn btn-primary" onClick={saveEdit}>
                                    Save Changes
                                </button>
                                <button className="btn btn-secondary" onClick={() => setEditCustomer(null)}>
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}