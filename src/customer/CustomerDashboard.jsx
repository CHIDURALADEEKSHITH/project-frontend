import { Link } from "react-router-dom";
import "./customer.css";

function CustomerDashboard() {
  return (
    <div className="customer-dashboard">
      <div className="customer-hero">
        <div>
          <p className="customer-subtitle">Welcome to Fertilizer Shop</p>
          <h1>Customer Dashboard</h1>
          <p>
            Shop fertilizers, manage your cart, and track your orders easily.
          </p>
        </div>
      </div>

      <div className="customer-card-grid">
        <Link className="customer-card" to="/customer/products">
          <h3>View Products</h3>
          <p>Browse fertilizers and add items to cart.</p>
        </Link>

        <Link className="customer-card" to="/customer/cart">
          <h3>My Cart</h3>
          <p>Check selected products before placing order.</p>
        </Link>

        <Link className="customer-card" to="/customer/my-orders">
          <h3>My Orders</h3>
          <p>Track order status and delivery details.</p>
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;