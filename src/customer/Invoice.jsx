import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import "./customer.css";

function Invoice() {
  const location = useLocation();
  const order = location.state?.order;

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (order?.id) {
      api.post("/customer/vieworderitems", { orderId: order.id }).then((res) => {
        setItems(res.data);
      });
    }
  }, [order]);

  if (!order) {
    return <div className="page">No invoice data found</div>;
  }

  const deliveryCharge = order.deliveryCharge || 0;
  const subtotal = order.totalAmount - deliveryCharge;

  return (
    <div className="invoice-page">
      <div className="invoice-card">
        <h1>Bhagyalaxmi Fertilizers Pesticides & Seeds</h1>

        <p>
          Grain Market Road Jammikunta, Karimnagar, Telangana - 505122
        </p>

        <div className="invoice-header-row">
          <p>Phone: 9849630869</p>
          <p className="invoice-email">
            Email: bhagyalaxmifertilizers123@gmail.com
          </p>
        </div>

        <hr />

        <h2>Invoice</h2>

        <div className="invoice-info">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Date:</b> {order.orderDate}</p>
          <p><b>Customer:</b> {order.user?.name}</p>
          <p><b>Phone:</b> {order.user?.phone}</p>
          <p><b>Delivery Address:</b> {order.deliveryAddress}</p>
          <p><b>Status:</b> {order.status}</p>
          <p>
            <b>Expected Delivery:</b>{" "}
            {order.expectedDeliveryDate || "Not Updated"}
          </p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.product?.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <h3>Subtotal: ₹{subtotal}</h3>
          <h3>Delivery Charge: ₹{deliveryCharge}</h3>
          <h2>Total Amount: ₹{order.totalAmount}</h2>
        </div>

        <button onClick={() => window.print()} className="print-btn">
          Print / Save PDF
        </button>
      </div>
    </div>
  );
}

export default Invoice;