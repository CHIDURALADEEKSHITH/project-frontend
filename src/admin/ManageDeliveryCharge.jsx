import { useEffect, useState } from "react";
import api from "../services/api";
import "./admin.css";

function ManageDeliveryCharge() {
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/admin/getdeliverycharge").then((res) => {
      setDeliveryCharge(res.data);
    });
  }, []);

  const updateCharge = async (e) => {
    e.preventDefault();

    const res = await api.post("/admin/updatedeliverycharge", {
      deliveryCharge,
    });

    setMsg(res.data);
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={updateCharge}>
        <h2>Manage Delivery Charge</h2>

        <input
          type="number"
          placeholder="Enter Delivery Charge"
          value={deliveryCharge}
          onChange={(e) => setDeliveryCharge(e.target.value)}
          required
        />

        <button>Update Delivery Charge</button>

        <p>{msg}</p>
      </form>
    </div>
  );
}

export default ManageDeliveryCharge;