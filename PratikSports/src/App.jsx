
import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import SizeChart from "./pages/SizeChart";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Dashboard from "./pages/admin/Dashboard";
import ManageProduct from "./pages/admin/ManageProduct";
import Orders from "./pages/admin/Orders";
import AdminNavbar from "./pages/admin/AdminNavbar";
import AdminProfile from "./pages/admin/AdminProfile";

// Simple auth check (replace with context/provider in real app)
function isUserSignedIn() {
  return !!localStorage.getItem("user");
}

function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
}

function RequireAuth({ children }) {
  if (!isUserSignedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireAdmin({ children }) {
  if (!isUserSignedIn()) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin()) {
    return <Navigate to="/home" replace />;
  }
  return children;
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/size-chart" element={<SizeChart />} />
      <Route path="/products" element={<Products />} />
      {/* Profile and Order require auth */}
      <Route path="/profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
      <Route path="/order" element={
        <RequireAuth>
          <Order />
        </RequireAuth>
      } />
      {/* Admin routes */}
      <Route path="/admin" element={
        <RequireAdmin>
          <Dashboard />
        </RequireAdmin>
      } />
      <Route path="/admin/navbar" element={<AdminNavbar />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/upload" element={<ManageProduct />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/products" element={<ManageProduct />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/login" element={<Login />} />
    </Routes>
  );
}

export default App;
