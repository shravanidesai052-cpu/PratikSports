
import { useState, useEffect } from "react";
import AdminNavbar from "../../pages/admin/AdminNavbar";
import API from "../../services/api";
import JerseyDetailsModal from "../../components/JerseyDetailsModal";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [rejectId, setRejectId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await API.get("/orders");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  // Accept order
  const handleAccept = async (id) => {
    await API.put(`/orders/${id}`, { status: "accepted", adminMessage });
    setAdminMessage("");
    refreshOrders();
  };

  // Reject order
  const handleReject = async (id) => {
    if (!rejectionReason) return;
    await API.put(`/orders/${id}`, { status: "rejected", rejectionReason, adminMessage });
    setRejectionReason("");
    setAdminMessage("");
    setRejectId(null);
    refreshOrders();
  };

  const refreshOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6 bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden">
        {/* Sports-themed background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Order Management</h1>
            <p className="text-gray-600 text-lg">Review and manage sports equipment orders</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/30">
            <table className="w-full">
              <thead className="bg-linear-to-r from-orange-600 to-red-600 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Order Details</th>
                  <th className="p-4 font-semibold">Quantity</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b border-orange-100 hover:bg-orange-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{o.name}</div>
                      <div className="text-sm text-gray-600">{o.mobile}</div>
                      <div className="text-xs text-gray-500">{o.address}</div>
                    </td>
                    <td className="p-4 text-center">
                      {(() => {
                        // Handle multiple jerseys array (new format)
                        if (o.jerseys && Array.isArray(o.jerseys) && o.jerseys.length > 0) {
                          if (o.jerseys.length === 1) {
                            // Single jersey - show directly
                            return (
                              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {o.jerseys[0].name || 'Unknown'} ({o.jerseys[0].size || 'N/A'})
                              </div>
                            );
                          } else {
                            // Multiple jerseys - show summary with clickable button
                            return (
                              <div>
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                  {o.jerseys.length} jerseys ordered
                                </span>
                                <button
                                  onClick={() => setSelectedOrder(o)}
                                  className="ml-2 text-orange-600 hover:text-orange-800 underline text-sm font-medium"
                                >
                                  View Details
                                </button>
                              </div>
                            );
                          }
                        }
                        
                        // Handle single jersey (old format)
                        if (o.jerseyName) {
                          return (
                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                              {o.jerseyName.trim()} ({o.size || 'N/A'})
                            </div>
                          );
                        }
                      
                      // Handle orders with quantity > 1 but missing jersey details
                      if (o.quantity > 1 && !o.jerseyName) {
                        return (
                          <div>
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                              {o.quantity} jerseys - Details missing
                            </span>
                            <button
                              onClick={() => setSelectedOrder(o)}
                              className="ml-2 text-orange-600 hover:text-orange-800 underline text-sm font-medium"
                            >
                              Contact Customer
                            </button>
                          </div>
                        );
                      }
                      
                      // Handle single quantity with missing details
                      if (!o.jerseyName && o.quantity === 1) {
                        return (
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                            Jersey details missing
                          </span>
                        );
                      }
                      
                      // Fallback
                      return (
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                          No jersey details
                        </span>
                      );
                    })()}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                      {o.quantity}
                    </span>
                  </td>
                  <td className="p-4 text-center font-semibold">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${
                      o.status === "accepted"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : o.status === "rejected"
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "bg-amber-100 text-amber-700 border-amber-300"
                    }`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {o.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAccept(o._id)}
                          className="bg-linear-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-bold shadow-md transform hover:scale-105 mr-2"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => setRejectId(o._id)}
                          className="bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-bold shadow-md transform hover:scale-105"
                        >
                          ✕ Reject
                        </button>
                        {rejectId === o._id && (
                          <div className="mt-3 p-3 bg-red-50 rounded-xl border-2 border-red-200">
                            <input
                              type="text"
                              placeholder="Reason for rejection"
                              value={rejectionReason}
                              onChange={e => setRejectionReason(e.target.value)}
                              className="w-full px-3 py-2 border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white mb-2"
                            />
                            <input
                              type="text"
                              placeholder="Message to user (optional)"
                              value={adminMessage}
                              onChange={e => setAdminMessage(e.target.value)}
                              className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all bg-white mb-2"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleReject(o._id)}
                                className="bg-linear-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold shadow-md"
                              >
                                Confirm Reject
                              </button>
                              <button
                                onClick={() => setRejectId(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="mt-2">
                          {/* Removed message to user field from user view */}
                        </div>
                      </>
                    )}
                    {o.status === "accepted" && (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        ✓ Payment Enabled
                      </span>
                    )}
                    {o.status === "rejected" && (
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                        ✕ Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Jersey Details Modal */}
        {selectedOrder && (
          <JerseyDetailsModal 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)}
            onOrderUpdated={() => refreshOrders()} // Refresh orders after update
          />
        )}
      </div>
    </>
  );
}
