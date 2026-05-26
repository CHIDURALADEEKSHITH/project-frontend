import { useEffect, useState } from "react";
import api from "../services/api";
import "./admin.css";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const loadOrders = () => {
    api.get("/admin/viewallorders").then((res) => {
      setOrders(res.data);
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const confirmOrder = async (orderId) => {
    const res = await api.post("/admin/confirmorder", { orderId });
    alert(res.data);
    loadOrders();
  };

  const cancelOrder = async (orderId) => {
    const reason = prompt("Enter cancellation reason");

    if (!reason) {
      alert("Cancel reason is required");
      return;
    }

    const res = await api.post("/admin/cancelorder", {
      orderId: String(orderId),
      reason,
    });

    alert(res.data);
    loadOrders();
  };

  const setDeliveryDate = async (orderId) => {
    const expectedDate = prompt("Enter expected delivery date YYYY-MM-DD");

    if (!expectedDate) {
      return;
    }

    const res = await api.post("/admin/setdeliverydate", {
      orderId: String(orderId),
      expectedDate,
    });

    alert(res.data);
    loadOrders();
  };

  const filteredOrders = orders.filter((o) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      String(o.id).includes(keyword) ||
      o.user?.name?.toLowerCase().includes(keyword) ||
      o.user?.phone?.toLowerCase().includes(keyword) ||
      o.status?.toLowerCase().includes(keyword) ||
      o.deliveryAddress?.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "ALL" ||
      o.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page">
      <h2>Admin - View Orders</h2>

      <div className="order-filter-buttons">
        <button onClick={() => setStatusFilter("ALL")}>All</button>
        <button onClick={() => setStatusFilter("PENDING")}>Pending</button>
        <button onClick={() => setStatusFilter("CONFIRMED")}>Confirmed</button>
        <button onClick={() => setStatusFilter("PACKED")}>Packed</button>
        <button onClick={() => setStatusFilter("SHIPPED")}>Shipped</button>
        <button onClick={() => setStatusFilter("DELIVERED")}>Delivered</button>
        <button onClick={() => setStatusFilter("CANCELLED")}>Cancelled</button>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search by order id, customer, phone, status, address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Expected Delivery</th>
              <th>Delivery Address</th>
              <th>Cancel Reason</th>
              <th>Action</th>
              <th>Set Delivery Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user?.name}</td>
                <td>{o.user?.phone}</td>
                <td>{o.orderDate}</td>
                <td>₹{o.totalAmount}</td>
                <td>
  <span
    className={`status-badge ${o.status.toLowerCase()}`}
  >
    {o.status}
  </span>
</td>
                <td>{o.expectedDeliveryDate || "-"}</td>
                <td>{o.deliveryAddress}</td>
                <td>{o.status === "CANCELLED" ? o.cancelReason : "-"}</td>

                <td>
                  {o.status === "PENDING" ? (
                    <>
                      <button onClick={() => confirmOrder(o.id)}>Confirm</button>
                      <button
                        className="cancel-btn"
                        onClick={() => cancelOrder(o.id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : o.status !== "CANCELLED" && o.status !== "DELIVERED" ? (
                    <button
                      className="cancel-btn"
                      onClick={() => cancelOrder(o.id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    "Not Allowed"
                  )}
                </td>

                <td>
                  {o.status !== "CANCELLED" ? (
                    <button onClick={() => setDeliveryDate(o.id)}>
                      Set Date
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

export default ViewOrders;