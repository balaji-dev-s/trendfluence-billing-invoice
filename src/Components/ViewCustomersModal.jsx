import React, { useEffect, useState } from "react";

export default function ViewCustomersModal({ onClose, refresh }) {

    // store all customers
    const [customers, setCustomers] = useState([]);

    // search input value
    const [search, setSearch] = useState("");

    // store which customer to delete
    const [deleteId, setDeleteId] = useState(null);

    // store customer being edited
    const [editCustomer, setEditCustomer] = useState(null);

    // success / error message
    const [message, setMessage] = useState("");

    // fetch customers from backend
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

    // run once when component loads
    useEffect(() => { fetchCustomers(); }, []);

    // confirm delete function
    const confirmDelete = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/customers/${deleteId}`, {
            method: "DELETE",
            credentials: "include"
        });

        setDeleteId(null); // close modal
        setMessage("Customer deleted successfully ✅");

        fetchCustomers(search); // refresh list
        refresh(); // update dashboard count

        // auto hide message
        setTimeout(() => setMessage(""), 2000);
    };

    // save edited customer
    const saveEdit = async () => {
        const { _id, name, phone, address } = editCustomer;

        // validation
        if (!name || !phone) {
            setMessage("Name & phone required ❌");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        // update in backend
        await fetch(`${import.meta.env.VITE_API_URL}/customers/${_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, address }),
            credentials: "include"
        });

        setEditCustomer(null); // close modal
        setMessage("Changes saved successfully ✅");

        fetchCustomers(search); // refresh list
        refresh();

        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div className="modal d-block px-2">

            {/* MAIN MODAL */}
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">

                    {/* HEADER */}
                    <div className="modal-header">
                        <h5 className="modal-title">Customers</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    {/* SUCCESS MESSAGE */}
                    {message && (
                        <div className="alert alert-success text-center m-2 small">
                            {message}
                        </div>
                    )}

                    {/* BODY */}
                    <div className="modal-body">

                        {/* SEARCH INPUT */}
                        <input
                            className="form-control mb-3"
                            placeholder="Search..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                fetchCustomers(e.target.value); // live search
                            }}
                        />

                        {/* TABLE WRAPPER (for mobile scroll) */}
                        <div className="table-responsive">
                            <table className="table table-striped">

                                {/* TABLE HEAD */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>

                                        {/* hide address on small screens */}
                                        <th className="d-none d-md-table-cell">Address</th>

                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                {/* TABLE BODY */}
                                <tbody>
                                    {customers.map(c => (
                                        <tr key={c._id}>

                                            <td>{c.name}</td>
                                            <td>{c.phone}</td>

                                            {/* hidden on mobile */}
                                            <td className="d-none d-md-table-cell">{c.address}</td>

                                            <td>
                                                {/* stack buttons on mobile */}
                                                <div className="d-flex flex-column flex-sm-row gap-1">

                                                    {/* EDIT BUTTON */}
                                                    <button
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() => setEditCustomer(c)}
                                                    >
                                                        Edit
                                                    </button>

                                                    {/* DELETE BUTTON */}
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => setDeleteId(c._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* if no data */}
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

                    </div>

                    {/* FOOTER */}
                    <div className="modal-footer">
                        <button className="btn btn-secondary w-100 w-sm-auto" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* DELETE CONFIRM MODAL */}
            {deleteId && (
                <div className="modal d-block px-2">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-3 text-center">

                            <h6>Delete Customer?</h6>
                            <p className="small">This action cannot be undone</p>

                            <div className="d-flex flex-column flex-sm-row gap-2 mt-2">

                                {/* CONFIRM DELETE */}
                                <button className="btn btn-danger w-100" onClick={confirmDelete}>
                                    Confirm
                                </button>

                                {/* CANCEL */}
                                <button className="btn btn-secondary w-100" onClick={() => setDeleteId(null)}>
                                    Cancel
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* EDIT CUSTOMER MODAL */}
            {editCustomer && (
                <div className="modal d-block px-2">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-3">

                            <h5 className="mb-2">Edit Customer</h5>

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

                            <div className="d-flex flex-column flex-sm-row gap-2 mt-2">

                                {/* SAVE */}
                                <button className="btn btn-primary w-100" onClick={saveEdit}>
                                    Save Changes
                                </button>

                                {/* CANCEL */}
                                <button className="btn btn-secondary w-100" onClick={() => setEditCustomer(null)}>
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