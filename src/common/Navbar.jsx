import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, [location]);

  return (
    <nav className="navbar">
      <div>
        <h2>BLF</h2>
        <p>Trusted Agri Supplies</p>
      </div>

      <div>
        {!token && (
          <>
     
            <Link to="/">Home</Link>
         
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/add-staff">Add Staff</Link>
            <Link to="/admin/add-category">Add Category</Link>
            <Link to="/admin/add-product">Add Product</Link>
            <Link to="/admin/view-products">Products</Link>
            <Link to="/admin/view-orders">Orders</Link>
            <Link to="/admin/stock-history">Stock History</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}

        {token && role === "STAFF" && (
          <>
            <Link to="/staff">Dashboard</Link>
            <Link to="/staff/view-orders">Orders</Link>
            <Link to="/staff/view-products">Products</Link>
            <Link to="/staff/update-stock">Add Stock</Link>
            <Link to="/staff/offline-sale">Offline Sale</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}

        {token && role === "CUSTOMER" && (
          <>
            <Link to="/customer">Dashboard</Link>
            <Link to="/customer/products">Products</Link>
            <Link to="/customer/cart">Cart</Link>
            <Link to="/customer/my-orders">My Orders</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;