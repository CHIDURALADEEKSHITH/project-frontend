import { useState } from "react";
import api from "../services/api";

function UpdateStock() {
  const [data, setData] = useState({
    productId: "",
    quantity: "",
  });

  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (Number(data.quantity) <= 0) {
      setMsg("Quantity must be greater than zero");
      return;
    }

    try {
      const res = await api.put("/staff/updatestock", {
        productId: Number(data.productId),
        quantity: Number(data.quantity),
      });

      setMsg(res.data);

      setData({
        productId: "",
        quantity: "",
      });
    } catch (err) {
      setMsg(err.response?.data || "Stock update failed");
    }
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={submit}>
        <h2>Add Stock</h2>

        <input
          type="number"
          placeholder="Product ID"
          value={data.productId}
          onChange={(e) =>
            setData({
              ...data,
              productId: e.target.value,
            })
          }
          required
        />

        <input
          type="number"
          placeholder="Enter quantity to add"
          value={data.quantity}
          onChange={(e) =>
            setData({
              ...data,
              quantity: e.target.value,
            })
          }
          required
        />

        <button>Add Stock</button>

        <p>{msg}</p>
      </form>
    </div>
  );
}

export default UpdateStock;