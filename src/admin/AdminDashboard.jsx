import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./admin.css";

function AdminDashboard() {
  const [staffCount, setStaffCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    api.get("/admin/viewallstaff").then((res) => {
      setStaffCount(res.data.length);
    });

    api.get("/admin/viewallorders").then((res) => {
      setOrderCount(res.data.length);
    });

    api.get("/admin/viewallproducts").then((res) => {
      setProductCount(res.data.length);

      const lowStock = res.data.filter((p) => p.quantity < 10);
      setLowStockProducts(lowStock);
    });
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-container">
        <section className="admin-hero">
          <div>
            <span>ADMIN CONTROL CENTER</span>
            <h1>Admin Dashboard</h1>
            <p>
              Manage products, staff, orders, categories, and stock audit history.
            </p>
          </div>
        </section>

        <section className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <p>Total Staff</p>
              <h2>{staffCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div>
              <p>Total Products</p>
              <h2>{productCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🧾</div>
            <div>
              <p>Total Orders</p>
              <h2>{orderCount}</h2>
            </div>
          </div>
        </section>

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

        <h2 className="admin-section-title">Admin Activities</h2>

        <section className="admin-actions">
          <Link className="action-card" to="/admin/add-staff">
            <span>➕</span>
            <h3>Add Staff</h3>
            <p>Create staff accounts for shop operations.</p>
          </Link>

          <Link className="action-card" to="/admin/view-staff">
            <span>👤</span>
            <h3>View Staff</h3>
            <p>View registered staff details.</p>
          </Link>

          <Link className="action-card" to="/admin/add-category">
            <span>🏷️</span>
            <h3>Add Category</h3>
            <p>Add fertilizers, pesticides, or seeds.</p>
          </Link>

          <Link className="action-card" to="/admin/view-categories">
            <span>📁</span>
            <h3>View Categories</h3>
            <p>Manage product category list.</p>
          </Link>

          <Link className="action-card" to="/admin/add-product">
            <span>🌱</span>
            <h3>Add Product</h3>
            <p>Add product with image, stock, and expiry.</p>
          </Link>

          <Link className="action-card" to="/admin/view-products">
            <span>📦</span>
            <h3>View Products</h3>
            <p>Check stock, expiry, and product details.</p>
          </Link>

          <Link className="action-card" to="/admin/view-orders">
            <span>🚚</span>
            <h3>View Orders</h3>
            <p>Track customer orders and delivery details.</p>
          </Link>

          <Link className="action-card" to="/admin/stock-history">
            <span>📊</span>
            <h3>Stock History</h3>
            <p>Audit stock added, sold, and restored.</p>
          </Link>
          <Link className="action-card" to="/admin/manage-discounts">
  <span>🏷️</span>
  <h3>Manage Discounts</h3>
  <p>Add discount percentage for products.</p>
</Link>
               <Link className="action-card" to="/admin/manage-delivery-charge">
  <span>🚚</span>
  <h3>Delivery Charge</h3>
  <p>Update delivery charge for customer orders.</p>
</Link>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;