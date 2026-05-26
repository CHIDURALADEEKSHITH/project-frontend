import { useState } from "react";
import api from "../services/api";
import "./staff.css";

function OfflineSale() {
  const [data, setData] = useState({
    productId: "",
    soldQuantity: "",
  });

  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (Number(data.soldQuantity) <= 0) {
      setMsg("Sold quantity must be greater than zero");
      return;
    }

    try {
      const res = await api.post("/staff/offline-sale", {
        productId: Number(data.productId),
        soldQuantity: Number(data.soldQuantity),
      });

      setMsg(res.data);

      setData({
        productId: "",
        soldQuantity: "",
      });
    } catch (err) {
      setMsg(err.response?.data || "Offline sale update failed");
    }
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={submit}>
        <h2>Record Offline Sale</h2>

        <input
          type="number"
          placeholder="Product ID"
          value={data.productId}
          onChange={(e) =>
            setData({ ...data, productId: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Sold Quantity"
          value={data.soldQuantity}
          onChange={(e) =>
            setData({ ...data, soldQuantity: e.target.value })
          }
          required
        />

        <button>Record Sale</button>

        <p>{msg}</p>
      </form>
    </div>
  );
}

export default OfflineSale;