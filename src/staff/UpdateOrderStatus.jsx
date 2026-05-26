import { useState } from "react";
import api from "../services/api";

function UpdateOrderStatus() {
  const [data, setData] = useState({ orderId: "", status: "PENDING" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.put("/staff/updateorderstatus", data);
    setMsg(res.data);
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={submit}>
        <h2>Update Order Status</h2>
        <input placeholder="Order ID" value={data.orderId} onChange={(e)=>setData({...data,orderId:e.target.value})} required />
        <select value={data.status} onChange={(e)=>setData({...data,status:e.target.value})}>
          <option>PENDING</option>
          <option>PACKED</option>
          <option>SHIPPED</option>
          <option>DELIVERED</option>
        </select>
        <button>Update</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default UpdateOrderStatus;
