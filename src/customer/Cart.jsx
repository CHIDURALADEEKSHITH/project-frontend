import { useEffect, useState } from "react";
import api from "../services/api";
import "./customer.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const userId = Number(localStorage.getItem("userId"));

  const loadCart = () => {
    api.post("/customer/viewcart", { userId }).then((res) => {
      setCart(res.data);
    });
  };

  const loadDeliveryCharge = () => {
    api.get("/customer/getdeliverycharge").then((res) => {
      setDeliveryCharge(res.data);
    });
  };

  useEffect(() => {
    loadCart();
    loadDeliveryCharge();
  }, []);

  const removeItem = async (cartId) => {
    try {
      const res = await api.delete(`/customer/removecartitem/${cartId}`);
      setMsg(res.data);
      loadCart();
    } catch (err) {
      setMsg("Failed to remove item");
    }
  };

  const placeOrder = async () => {
    if (!deliveryAddress.trim()) {
      setMsg("Please enter delivery address");
      return;
    }

    try {
      const res = await api.post("/customer/placeorder", {
        userId,
        deliveryAddress,
      });

      setMsg(res.data);
      setDeliveryAddress("");
      loadCart();
    } catch (err) {
      setMsg(err.response?.data || "Order Failed");
    }
  };

  const subtotal = cart.reduce((sum, c) => sum + c.totalPrice, 0);
  const finalDeliveryCharge = cart.length > 0 ? deliveryCharge : 0;
  const finalTotal = subtotal + finalDeliveryCharge;

  return (
    <div className="page">
      <h2>My Cart</h2>

      <p>{msg}</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((c) => (
              <tr key={c.id}>
                <td>{c.product?.name}</td>
                <td>{c.quantity}</td>
                <td>₹{c.totalPrice}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cart.length > 0 && (
        <div className="cart-summary-card">
          <h3>Subtotal: ₹{subtotal}</h3>
          <h3>Delivery Charge: ₹{finalDeliveryCharge}</h3>
          <h2>Total Amount: ₹{finalTotal}</h2>

          <label>Delivery Address</label>
          <textarea
            placeholder="Enter full delivery address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          ></textarea>

          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Cart;