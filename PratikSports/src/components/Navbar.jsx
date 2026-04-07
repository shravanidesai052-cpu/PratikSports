import { NavLink } from "react-router-dom";
import logo from "../assets/images/PS_logo.png";

export default function Navbar() {

  const linkStyle =
    "px-4 py-2 font-medium text-white hover:text-[#F5C542] transition duration-300";

  const activeStyle =
    "px-4 py-2 font-medium text-[#00B3B3] border-b-2 border-[#00B3B3]";

  return (
    <nav className="w-full bg-[#2d5f91] shadow-lg px-6 py-4 flex justify-between items-center">
      
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Pratik Sports Logo"
          className="h-11 w-11 object-contain"
        />
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Pratik Sports
        </h1>
      </div>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <NavLink to="/home" className={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Home
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : linkStyle}>
          About
        </NavLink>

        <NavLink to="/products" className={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Products
        </NavLink>

        <NavLink to="/size-chart" className={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Size Chart
        </NavLink>

        <NavLink to="/services" className={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Services
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? activeStyle : linkStyle}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}