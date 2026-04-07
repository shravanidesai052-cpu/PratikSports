import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProfileSaveButton from "../components/ProfileSaveButton";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

// Payment options component (must be outside main component)
function PaymentOptions({ order, refreshOrders }) {
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [productPrice, setProductPrice] = useState(0);

  const handlePay = async () => {
    if (!method) return;
    setLoading(true);

    if (method === "UPI") {
      // Fetch product price to get actual price
      try {
        const res = await API.get(`/products/all`);
        const products = res.data;
        const product = products.find(p => p.name === order.jerseyName);
        if (product) {
          setProductPrice(product.price);
          // Show modal only after price is set
          setShowQrCode(true);
        } else {
          // If product not found, use default price
          setProductPrice(500);
          setShowQrCode(true);
        }
      } catch (err) {
        console.error("Error fetching product price:", err);
        // Use default price if error
        setProductPrice(500);
        setShowQrCode(true);
      }
      setLoading(false);
      return;
    }

    await API.put(`/orders/${order._id}/payment`, { paymentStatus: "paid", paymentMethod: method });
    setLoading(false);
    refreshOrders();
  };

  const handleUpiPaymentComplete = async () => {
    await API.put(`/orders/${order._id}/payment`, { paymentStatus: "paid", paymentMethod: "UPI" });
    setShowQrCode(false);
    refreshOrders();
  };

  return (
    <div className="mt-3 flex flex-col items-center">
      <div className="flex gap-3 mb-2">
        <select 
          value={method} 
          onChange={e => setMethod(e.target.value)} 
          className="border-2 border-emerald-300 px-4 py-2 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
        >
          <option value="">Select Payment Method</option>
          <option value="Cash on Delivery">💵 Cash on Delivery</option>
          <option value="UPI">📱 UPI Payment</option>
        </select>
        <button
          onClick={handlePay}
          disabled={!method || loading}
          className="bg-linear-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
              </svg>
              Processing...
            </>
          ) : method === "UPI" ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm10 0h-2v2h2v-2zm0 4h-2v2h2v-2zm2-4h2v2h-2v-2zm0 4h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
              </svg>
              Show QR
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              Pay Now
            </>
          )}
        </button>
      </div>
      <span className="text-xs text-gray-500 font-medium">Choose payment method to complete your order</span>

      {/* UPI QR Code Modal */}
      {showQrCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl border border-white/30">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm10 0h-2v2h2v-2zm0 4h-2v2h2v-2zm2-4h2v2h-2v-2zm0 4h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6 text-center">UPI Payment</h3>
            <div className="flex flex-col items-center">
              {/* QR Code Placeholder - In production, this would be a real QR code */}
              <div className="w-56 h-56 bg-linear-to-br from-emerald-100 to-blue-100 border-4 border-emerald-300 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <div className="text-center">
                  <svg className="w-28 h-28 mx-auto mb-3 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm10 0h-2v2h2v-2zm0 4h-2v2h2v-2zm2-4h2v2h-2v-2zm0 4h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
                  </svg>
                  <p className="text-sm font-semibold text-emerald-700">Scan QR Code</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3 text-center font-medium">Scan this QR code with any UPI app</p>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl px-4 py-2 mb-4">
                <p className="text-sm font-bold text-emerald-700">📱 UPI ID: admin@pratiksports</p>
              </div>
              <div className="bg-linear-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl px-6 py-3 mb-6">
                <p className="text-lg font-bold text-orange-700">💰 Amount: ₹{order.quantity * productPrice}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUpiPaymentComplete}
                  className="bg-linear-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Payment Done
                </button>
                <button
                  onClick={() => setShowQrCode(false)}
                  className="bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
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

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [localUser, setLocalUser] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      if (!u || (!u.mobile && !u.username)) return null;
      return u;
    } catch {
      return null;
    }
  });
  
  useEffect(() => {
    function handleUserChange() {
      try {
        const u = JSON.parse(localStorage.getItem("user"));
        if (!u || (!u.mobile && !u.username)) {
          setLocalUser(null);
          setUser(null);
        } else {
          setLocalUser(u);
        }
      } catch {
        setLocalUser(null);
        setUser(null);
      }
    }
    window.addEventListener("storage", handleUserChange);
    window.addEventListener("userChanged", handleUserChange);
    handleUserChange();
    return () => {
      window.removeEventListener("storage", handleUserChange);
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);
  
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editForm, setEditForm] = useState({ username: "", email: "", address: "", mobile: "" });
  const isProfileComplete = editForm.username && editForm.email && editForm.mobile && editForm.address;

  // Fetch user details from DB
  useEffect(() => {
    if (!localUser) {
      setUser(null);
      return;
    }
    
    // Try to fetch from DB, but don't clear localStorage if not found
    const fetchUser = async () => {
      try {
        let res = null;
        
        // Try to fetch by mobile only (username endpoint doesn't exist)
        if (localUser.mobile) {
          res = await API.get(`/auth/user/${localUser.mobile}`);
        }
        
        if (res && res.data && (res.data.mobile || res.data.username)) {
          setUser(res.data);
          setEditForm({
            username: res.data.username || "",
            email: res.data.email || "",
            address: res.data.address || "",
            mobile: res.data.mobile || ""
          });
        } else {
          // User not in DB, use localStorage data
          setUser({
            username: localUser.username || "",
            email: localUser.email || "",
            address: "",
            mobile: localUser.mobile || ""
          });
          setEditForm({
            username: localUser.username || "",
            email: localUser.email || "",
            address: "",
            mobile: localUser.mobile || ""
          });
        }
      } catch {
        // Error fetching, use localStorage data
        setUser({
          username: localUser.username || "",
          email: localUser.email || "",
          address: "",
          mobile: localUser.mobile || ""
        });
        setEditForm({
          username: localUser.username || "",
          email: localUser.email || "",
          address: "",
          mobile: localUser.mobile || ""
        });
      }
    };
    fetchUser();
  }, [localUser]);

  // Fetch orders for this user
  useEffect(() => {
    if (!localUser || !localUser.mobile) {
      setOrders([]);
      return;
    }
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        const allOrders = res.data;
        const userOrders = allOrders.filter(o => o.mobile === localUser.mobile);
        console.log("Local user mobile:", localUser.mobile);
        console.log("All orders:", allOrders);
        console.log("User orders:", userOrders);
        setOrders(userOrders);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setOrders([]);
      }
    };
    fetchOrders();
  }, [localUser && localUser.mobile]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocalUser(null);
    setUser(null);
    navigate("/home");
  };

  const handleLoginClick = () => {
    setShowAuthOptions(true);
    setAuthMode("login");
  };

  const handleSignupClick = () => {
    setShowAuthOptions(true);
    setAuthMode("signup");
  };

  // If show auth options, show login/signup form
  if (showAuthOptions) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-600 via-blue-600 to-indigo-700 p-4 relative overflow-hidden">
          {/* Sports-themed background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-orange-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 bg-red-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative z-10">
            <div className="mb-6">
              <button
                onClick={() => setShowAuthOptions(false)}
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Profile
              </button>
            </div>
            {authMode === "login" ? <Login /> : <Signup />}
          </div>
        </div>
      </>
    );
  }

  // If not signed in, show login/signup options
  if (!localUser || (!localUser.mobile && !localUser.username)) {
    return (
      <>
        <Navbar />
        <div className="bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 min-h-screen px-6 py-12 relative overflow-hidden">
          {/* Sports-themed background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/30 text-center">
              {/* Sports icon */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">Welcome to Your Locker Room</h1>
              <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">Please login or signup to view your player profile, track orders, and access exclusive sports gear</p>
              
              <div className="flex gap-6 justify-center">
                <button
                  onClick={handleLoginClick}
                  className="bg-linear-to-r from-emerald-600 to-blue-600 text-white px-10 py-4 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105 flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  Enter Field
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-linear-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105 flex items-center gap-3"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 min-h-screen px-6 py-12 relative overflow-hidden">
        {/* Sports-themed background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          {/* Profile Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Player Profile</h1>
                  <p className="text-gray-600">Manage your personal information and preferences</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditing(!editing)}
                  className="bg-linear-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 flex items-center gap-2"
                >
                  {editing ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                      Cancel
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Edit Profile
                    </>
                  )}
                </button>
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 border-2 border-red-300 hover:border-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {editing ? (
                <>
                  <ProfileField label="Username" value={editForm.username} editable={true} onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))} />
                  <ProfileField label="Mobile Number" value={editForm.mobile} editable={!user?.mobile} onChange={e => setEditForm(f => ({ ...f, mobile: e.target.value }))} />
                  <ProfileField label="Email" value={editForm.email} editable={true} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
                  <ProfileField label="Address" value={editForm.address} editable={true} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} />
                </>
              ) : (
                <>
                  <ProfileField label="Username" value={user?.username || ""} editable={false} />
                  <ProfileField label="Mobile Number" value={user?.mobile || ""} editable={false} />
                  <ProfileField label="Email" value={user?.email || ""} editable={false} />
                  <ProfileField label="Address" value={user?.address || ""} editable={false} />
                </>
              )}
            </div>
            {editing && (
              <ProfileSaveButton
                editForm={editForm}
                setUser={setUser}
                setEditForm={setEditForm}
                setEditing={setEditing}
              />
            )}
          </div>
          {/* Order History */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Order History</h2>
                <p className="text-gray-600">Track your sports gear orders and payment status</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No orders yet</p>
                  <p className="text-gray-400 text-sm mt-2">Start shopping for your favorite sports gear!</p>
                </div>
              ) : (
                <table className="w-full border-2 border-emerald-200 rounded-xl overflow-hidden">
                  <thead className="bg-linear-to-r from-emerald-600 to-blue-600 text-white">
                    <tr>
                      <th className="p-4 border border-emerald-300 font-semibold">Order ID</th>
                      <th className="p-4 border border-emerald-300 font-semibold">Jersey Name</th>
                      <th className="p-4 border border-emerald-300 font-semibold">Size</th>
                      <th className="p-4 border border-emerald-300 font-semibold">Quantity</th>
                      <th className="p-4 border border-emerald-300 font-semibold">Status</th>
                      <th className="p-4 border border-emerald-300 font-semibold">Payment</th>
                      <th className="p-4 border border-emerald-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-emerald-50 transition-colors duration-200">
                        <td className="p-4 border border-emerald-200 font-mono text-sm font-semibold text-emerald-700">#{order._id.slice(-6)}</td>
                        <td className="p-4 border border-emerald-200 font-medium">{order.jerseyName}</td>
                        <td className="p-4 border border-emerald-200">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {order.size}
                          </span>
                        </td>
                        <td className="p-4 border border-emerald-200">
                          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                            {order.quantity}
                          </span>
                        </td>
                        <td className="p-4 border border-emerald-200 font-semibold">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${
                              order.status === "accepted"
                                ? "bg-green-100 text-green-700 border-green-300"
                                : order.status === "rejected"
                                ? "bg-red-100 text-red-700 border-red-300"
                                : "bg-amber-100 text-amber-700 border-amber-300"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          {order.status === "rejected" && order.rejectionReason && (
                            <div className="text-xs text-red-600 mt-2 font-medium">Reason: {order.rejectionReason}</div>
                          )}
                          {order.adminMessage && (
                            <div className="text-xs text-blue-600 mt-2 font-medium">Message: {order.adminMessage}</div>
                          )}
                        </td>
                        <td className="p-4 border border-emerald-200">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.paymentStatus === "paid"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.paymentStatus || "Unpaid"}
                          </span>
                        </td>
                        <td className="p-4 border border-emerald-200">
                          {order.status === "accepted" && order.paymentStatus === "unpaid" && (
                            <PaymentOptions order={order} refreshOrders={() => {
                              API.get("/orders").then(res => setOrders(res.data.filter(o => o.mobile === user?.mobile)));
                            }} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileField({ label, value, editable, onChange }) {
  return (
    <div>
      <label className="block text-sm text-slate-500 mb-1">{label}</label>
      {editable ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-slate-50 focus:bg-white transition"
        />
      ) : (
        <p className="font-medium text-slate-800">{value}</p>
      )}
    </div>
  );
}
