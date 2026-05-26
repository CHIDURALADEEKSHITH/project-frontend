import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./customer.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("userId"));

  const loadOrders = async () => {
    const res = await api.post("/customer/viewmyorders", {
      userId,
    });

    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const viewInvoice = (order) => {
    navigate("/customer/invoice", {
      state: { order },
    });
  };

  const cancelOrder = async (orderId) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this order?"
      )
    ) {
      return;
    }

    try {
      const res = await api.post(
        "/customer/cancelorder",
        {
          orderId,
        }
      );

      await loadOrders();

      alert(res.data);
    } catch (err) {
      alert(
        err.response?.data || "Cancel Failed"
      );
    }
  };

  const canViewInvoice = (status) => {
    return (
      status === "CONFIRMED" ||
      status === "PACKED" ||
      status === "SHIPPED" ||
      status === "DELIVERED"
    );
  };

  return (
    <div className="page">
      <h2>My Orders</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Expected Delivery</th>
              <th>Cancel Message</th>
              <th>Invoice</th>
              <th>Cancel</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>

                <td>{o.orderDate}</td>

                <td>₹{o.totalAmount}</td>

                <td>
  <span
    className={`status-badge ${o.status.toLowerCase()}`}
  >
    {o.status}
  </span>
</td>

                <td>
                  {o.expectedDeliveryDate
                    ? o.expectedDeliveryDate
                    : "Not updated yet"}
                </td>

                <td>
                  {o.status === "CANCELLED" ? (
                    o.cancelledBy ===
                    "CUSTOMER" ? (
                      "You cancelled this order."
                    ) : (
                      `Order cancelled by management. Reason: ${
                        o.cancelReason ||
                        "Not specified"
                      }`
                    )
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  {canViewInvoice(
                    o.status
                  ) ? (
                    <button
                      onClick={() =>
                        viewInvoice(o)
                      }
                    >
                      Invoice
                    </button>
                  ) : (
                    "Not Available"
                  )}
                </td>

                <td>
                  {o.status ===
                  "PENDING" ? (
                    <button
                      className="cancel-btn"
                      onClick={() =>
                        cancelOrder(o.id)
                      }
                    >
                      Cancel
                    </button>
                  ) : (
                    "Not Allowed"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;