import { useState, useEffect } from "react";
import Login from "../pages/Login";
import API from "../services/api";

export default function GeneralOrderForm({ productType }) {
  const [status, setStatus] = useState("form");
  const [localUser, setLocalUser] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      if (!u || !u.mobile) return null;
      return u;
    } catch {
      return null;
    }
  });

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    quantity: 1,
    address: "",
    description: ""
  });

  // Pre-fill form with user data when available
  useEffect(() => {
    if (localUser) {
      // Fetch user details to pre-fill form
      const fetchUserDetails = async () => {
        try {
          const res = await API.get(`/auth/user/${localUser.mobile}`);
          if (res.data) {
            setFormData(prev => ({
              ...prev,
              name: res.data.username || "",
              mobile: res.data.mobile || "",
              address: res.data.address || ""
            }));
          }
        } catch (err) {
          console.error("Failed to fetch user details:", err);
        }
      };
      fetchUserDetails();
    }
  }, [localUser]);

  if (!localUser || !localUser.mobile) {
    return <Login />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/orders", {
        userId: localUser.mobile,
        name: formData.name,
        mobile: localUser.mobile, // Use logged-in user's mobile
        jerseyName: `${productType} - ${formData.description || 'Custom Order'}`,
        size: "N/A", // Not applicable for trophies/bats
        quantity: parseInt(formData.quantity),
        address: formData.address,
        notes: formData.description,
        productType: productType // Add product type for identification
      });
      
      if (response.data) {
        setStatus("pending");
        // Reset form after successful submission
        setFormData({
          name: "",
          mobile: "",
          quantity: 1,
          address: "",
          description: ""
        });
      }
    } catch (err) {
      console.error("Order submission error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to submit order";
      alert(errorMessage);
    }
  };

  const getProductTitle = () => {
    switch(productType) {
      case "Trophies":
        return "🏆 Trophy Order Form";
      case "Bats":
        return "🏏 Cricket Bat Order Form";
      default:
        return "📦 Product Order Form";
    }
  };

  const getProductPlaceholder = () => {
    switch(productType) {
      case "Trophies":
        return "Trophy description (e.g., Cricket Tournament Trophy, Size, Material)";
      case "Bats":
        return "Bat details (e.g., Willow type, Weight, Size, Brand preference)";
      default:
        return "Product description";
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#F2F2F2] p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0A2540]">
        {getProductTitle()}
      </h2>
      {status === "form" && (
        <form onSubmit={submitOrder} className="space-y-4">
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3]"
          />
          <input
            required
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3] bg-gray-100"
            readOnly
          />
          <input
            type="number"
            min="1"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3]"
          />
          <textarea
            required
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Delivery Address"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3]"
            rows="3"
          />
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={getProductPlaceholder()}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3]"
            rows="4"
          />
          <button
            type="submit"
            className="w-full bg-[#0A2540] text-white py-3 rounded-lg font-semibold 
                       hover:bg-[#00B3B3] transition duration-300 shadow-md"
          >
            Submit Order
          </button>
        </form>
      )}
      {status === "pending" && (
        <div className="text-center">
          <p className="text-[#F5C542] font-semibold text-lg">
            Order sent to owner
          </p>
          <p className="text-[#0A2540] font-medium mt-2">
            Waiting for approval ⏳
          </p>
        </div>
      )}
    </div>
  );
}
