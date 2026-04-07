import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function JerseyDetailsModal({ order, onClose, onOrderUpdated }) {
  const [editingOrder, setEditingOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setEditingOrder({ ...order });
    }
  }, [order]);

  const handleUpdateOrder = async () => {
    if (!editingOrder) return;
    
    setLoading(true);
    try {
      await API.put(`/orders/${editingOrder._id}`, editingOrder);
      onOrderUpdated();
      onClose();
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!order || !editingOrder) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingOrder.name || ''}
                  onChange={(e) => setEditingOrder({...editingOrder, name: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  value={editingOrder.mobile || ''}
                  onChange={(e) => setEditingOrder({...editingOrder, mobile: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editingOrder.email || ''}
                  onChange={(e) => setEditingOrder({...editingOrder, email: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={editingOrder.address || ''}
                  onChange={(e) => setEditingOrder({...editingOrder, address: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Jersey Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Jersey Details</h3>
            {editingOrder.jerseys && Array.isArray(editingOrder.jerseys) ? (
              <div className="space-y-4">
                {editingOrder.jerseys.map((jersey, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-2">Jersey {index + 1}</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={jersey.name || ''}
                          onChange={(e) => {
                            const updatedJerseys = [...editingOrder.jerseys];
                            updatedJerseys[index] = {...jersey, name: e.target.value};
                            setEditingOrder({...editingOrder, jerseys: updatedJerseys});
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <select
                          value={jersey.size || ''}
                          onChange={(e) => {
                            const updatedJerseys = [...editingOrder.jerseys];
                            updatedJerseys[index] = {...jersey, size: e.target.value};
                            setEditingOrder({...editingOrder, jerseys: updatedJerseys});
                          }}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="">Select Size</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                          type="number"
                          value={jersey.quantity || 1}
                          onChange={(e) => {
                            const updatedJerseys = [...editingOrder.jerseys];
                            updatedJerseys[index] = {...jersey, quantity: parseInt(e.target.value) || 1};
                            setEditingOrder({...editingOrder, jerseys: updatedJerseys});
                          }}
                          className="w-full p-2 border rounded-lg"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Jersey Name</label>
                    <input
                      type="text"
                      value={editingOrder.jerseyName || ''}
                      onChange={(e) => setEditingOrder({...editingOrder, jerseyName: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Size</label>
                    <select
                      value={editingOrder.size || ''}
                      onChange={(e) => setEditingOrder({...editingOrder, size: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="">Select Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      value={editingOrder.quantity || 1}
                      onChange={(e) => setEditingOrder({...editingOrder, quantity: parseInt(e.target.value) || 1})}
                      className="w-full p-2 border rounded-lg"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Status */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Order Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editingOrder.status || 'pending'}
                  onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                <input
                  type="text"
                  value={editingOrder.totalAmount || ''}
                  onChange={(e) => setEditingOrder({...editingOrder, totalAmount: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="₹0.00"
                />
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Admin Notes</h3>
            <textarea
              value={editingOrder.adminMessage || ''}
              onChange={(e) => setEditingOrder({...editingOrder, adminMessage: e.target.value})}
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Add notes about this order..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateOrder}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? 'Updating...' : 'Update Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
