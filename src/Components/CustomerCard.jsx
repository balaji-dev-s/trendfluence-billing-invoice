// CustomerCard.jsx
// Main dashboard card for customer management
// Shows customer count and buttons to add or view customers.

import React, { useState } from "react";
import AddCustomerModal from "./AddCustomerModal.jsx";
import ViewCustomersModal from "./ViewCustomersModal.jsx";

export default function CustomerCard({ customers, refresh }) {
    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);

    return (
        <div className="card p-3 mt-4 shadow-sm">
            {/* Header with icon and customer count */}
            <h5><i className="bi bi-person-circle me-2"></i>Customers ({customers.length})</h5>

            {/* Action buttons */}
            <div className="mt-3 d-flex gap-2">
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>Add Customer</button>
                <button className="btn btn-info" onClick={() => setShowView(true)}>View Customers</button>
            </div>

            {/* Modals */}
            {showAdd && (
                <AddCustomerModal
                    onClose={() => setShowAdd(false)}
                    refresh={refresh} // refresh parent state after adding
                />
            )}
            {showView && (
                <ViewCustomersModal
                    onClose={() => setShowView(false)}
                    customers={customers} // pass current customers array
                    refresh={refresh} // refresh after edit/delete
                />
            )}
        </div>
    );
}