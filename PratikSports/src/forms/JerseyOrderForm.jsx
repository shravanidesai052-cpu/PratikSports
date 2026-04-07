
import { useState, useEffect } from "react";
import Login from "../pages/Login";
import API from "../services/api";

export default function JerseyOrderForm() {
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
    jerseyName: "",
    size: "",
    quantity: 1,
    address: "",
    notes: "",
    jerseys: [{ name: "", size: "" }] // Array for multiple jerseys
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
    
    // Update jerseys array when quantity changes
    if (name === "quantity") {
      const newQuantity = parseInt(value) || 1;
      const currentJerseys = formData.jerseys || [];
      const newJerseys = [];
      
      for (let i = 0; i < newQuantity; i++) {
        if (i < currentJerseys.length) {
          newJerseys.push(currentJerseys[i]);
        } else {
          newJerseys.push({ name: "", size: "" });
        }
      }
      
      setFormData(prev => ({ ...prev, jerseys: newJerseys }));
    }
  };

  // Handle individual jersey field changes
  const handleJerseyChange = (index, field, value) => {
    const newJerseys = [...formData.jerseys];
    newJerseys[index] = { ...newJerseys[index], [field]: value };
    setFormData(prev => ({ ...prev, jerseys: newJerseys }));
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    
    // Validate all jersey fields
    const jerseys = formData.jerseys || [];
    for (let i = 0; i < jerseys.length; i++) {
      if (!jerseys[i].name || !jerseys[i].size) {
        alert(`Please fill in name and size for jersey ${i + 1}`);
        return;
      }
    }
    
    try {
      // Prepare order data for backend compatibility
      let orderData = {
        userId: localUser.mobile,
        name: formData.name,
        mobile: localUser.mobile,
        quantity: parseInt(formData.quantity),
        address: formData.address,
        notes: formData.notes
      };

      // Always send jerseys array if available
      if (formData.jerseys && formData.jerseys.length > 0) {
        orderData.jerseys = formData.jerseys;
        console.log("Sending jerseys array:", formData.jerseys);
        
        // Also send backward compatibility fields
        orderData.jerseyName = formData.jerseys[0].name;
        orderData.size = formData.jerseys[0].size;
      } else {
        // Handle empty jerseys array
        orderData.jerseyName = formData.name; // Fallback to user name
        orderData.size = "M"; // Default size
      }

      console.log("Complete order data being sent:", orderData);

      const response = await API.post("/orders", orderData);
      
      if (response.data) {
        setStatus("pending");
        // Reset form after successful submission
        setFormData({
          name: "",
          mobile: "",
          jerseyName: "",
          size: "",
          quantity: 1,
          address: "",
          notes: "",
          jerseys: [{ name: "", size: "" }]
        });
      }
    } catch (err) {
      console.error("Order submission error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to submit order";
      alert(errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#F2F2F2] p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0A2540]">
        Jersey Order Form
      </h2>
      {status === "form" && (
        <form onSubmit={submitOrder} className="space-y-4">
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="User Name"
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
          
          {/* Dynamic Jersey Fields */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Jersey Details</h3>
            {(formData.jerseys || []).map((jersey, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-600 mb-2">Jersey {index + 1}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    value={jersey.name}
                    onChange={(e) => handleJerseyChange(index, 'name', e.target.value)}
                    placeholder={`Name on Jersey ${index + 1}`}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3]"
                  />
                  <select
                    required
                    value={jersey.size}
                    onChange={(e) => handleJerseyChange(index, 'size', e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3]"
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="3XL">3XL</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          
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
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Extra Notes (Optional)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B3B3]"
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
