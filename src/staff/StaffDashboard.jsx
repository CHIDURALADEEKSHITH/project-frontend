import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./staff.css";

function StaffDashboard() {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    api.get("/staff/viewallproducts").then((res) => {
      const lowStock = res.data.filter((p) => p.quantity < 10);
      setLowStockProducts(lowStock);
    });
  }, []);

  return (
    <div className="staff-dashboard">
      <div className="staff-hero">
        <p className="staff-subtitle">Operations Panel</p>
        <h1>Staff Dashboard</h1>
        <p>Manage orders, stock, and offline sales.</p>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="low-stock-box">
          <h2>⚠ Low Stock Alert</h2>

          {lowStockProducts.map((p) => (
            <div key={p.id} className="low-stock-item">
              <span>
                {p.name} ({p.category?.categoryName})
              </span>
              <strong>{p.quantity} left</strong>
            </div>
          ))}
        </div>
      )}

      <div className="staff-card-grid">
        <Link className="staff-card" to="/staff/view-orders">
          <h3>View Orders</h3>
          <p>Check customer orders and delivery details.</p>
        </Link>

        <Link className="staff-card" to="/staff/update-order-status">
          <h3>Update Order Status</h3>
          <p>Update packed, shipped, or delivered status.</p>
        </Link>

        <Link className="staff-card" to="/staff/view-products">
          <h3>View Products</h3>
          <p>View all products with stock quantity.</p>
        </Link>

        <Link className="staff-card" to="/staff/update-stock">
          <h3>Add Stock</h3>
          <p>Add new stock to inventory.</p>
        </Link>

        <Link className="staff-card" to="/staff/offline-sale">
          <h3>Offline Sale</h3>
          <p>Reduce stock for offline shop sales.</p>
        </Link>
      </div>
    </div>
  );
}

export default StaffDashboard;