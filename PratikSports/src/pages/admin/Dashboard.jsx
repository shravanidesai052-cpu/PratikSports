import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../pages/admin/AdminNavbar";
import API from "../../services/api";
import * as XLSX from "xlsx";

export default function Dashboard() {
  const navigate = useNavigate();

  // Export accepted orders to Excel
  const exportToExcel = async () => {
    try {
      const response = await API.get("/orders");
      const allOrders = response.data;
      const acceptedOrders = allOrders.filter(order => order.status === "accepted");
      
      // Prepare data for Excel
      const excelData = acceptedOrders.map(order => ({
        "Order ID": order._id.slice(-6),
        "Customer Name": order.name,
        "Mobile": order.mobile,
        "Jersey Details": order.jerseys ? 
          order.jerseys.map(j => `${j.name} (${j.size})`).join(", ") : 
          `${order.jerseyName} (${order.size})`,
        "Quantity": order.quantity,
        "Address": order.address,
        "Notes": order.notes || "",
        "Status": order.status,
        "Payment Status": order.paymentStatus || "unpaid",
        "Order Date": new Date(order.createdAt).toLocaleDateString()
      }));
      
      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Accepted Orders");
      
      // Save the file
      XLSX.writeFile(wb, `accepted_orders_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Failed to export orders to Excel");
    }
  };

  return (
    <div className="p-8 bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden">
      {/* Sports-themed background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
      </div>
      
      <AdminNavbar/>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">Admin Control Center</h1>
          <p className="text-gray-600 text-lg">Manage your sports equipment empire</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">

          <div 
            onClick={() => navigate("/admin/products")}
            className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/30 group"
          >
            <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Manage Products</h2>
            <p className="text-gray-600">Add & Manage Jerseys, Bats, Trophies</p>
            <div className="mt-4 text-emerald-600 font-semibold flex items-center gap-2">
              <span>Go to Products</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58-4.59L10 6l10 6-10 6z"/>
              </svg>
            </div>
          </div>

          <div 
            onClick={() => navigate("/admin/orders")}
            className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/30 group"
          >
            <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Manage Orders</h2>
            <p className="text-gray-600">Accept or Reject Orders</p>
            <div className="mt-4 text-orange-600 font-semibold flex items-center gap-2">
              <span>Go to Orders</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58-4.59L10 6l10 6-10 6z"/>
              </svg>
            </div>
          </div>

          <div 
            onClick={() => navigate("/admin/profile")}
            className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/30 group"
          >
            <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Admin Profile</h2>
            <p className="text-gray-600">Admin Profile Settings</p>
            <div className="mt-4 text-purple-600 font-semibold flex items-center gap-2">
              <span>Go to Profile</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58-4.59L10 6l10 6-10 6z"/>
              </svg>
            </div>
          </div>

        </div>

        {/* Excel Export Section */}
        <div className="mt-12">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/30">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 text-center">Export Orders Data</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Download accepted orders details as Excel file for record keeping and analysis</p>
            <div className="flex justify-center">
              <button
                onClick={exportToExcel}
                className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                📊 Export Accepted Orders to Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}