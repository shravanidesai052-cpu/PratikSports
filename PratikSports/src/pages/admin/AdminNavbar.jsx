import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const linkStyle = "text-gray-200 hover:text-orange-400 transition duration-300 font-medium";
  const activeStyle = "text-orange-400 font-bold border-b-2 border-orange-400";

  return (
    <nav className="bg-linear-to-r from-emerald-800 via-blue-800 to-indigo-800 px-6 py-4 flex justify-between items-center shadow-xl border-b-4 border-orange-500">
      
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h1 className="text-white text-xl font-bold tracking-wide">
          Pratik Sports <span className="text-orange-400">| Admin</span>
        </h1>
      </div>

      {/* Links */}
      <div className="flex gap-6 items-center">
        
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </div>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Products
          </div>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Orders
          </div>
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Profile
          </div>
        </NavLink>

        {/* Logout */}
        <button
          onClick={() => navigate("/admin/login")}
          className="bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-bold shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 7l-1.41 1.41L18.17 12H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Logout
        </button>

      </div>
    </nav>
  );
}