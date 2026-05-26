import { useState } from "react";
import api from "../services/api";

function AddStaff() {
  const [staff, setStaff] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/addstaff", staff);
      setMsg(res.data);
      setStaff({ name: "", email: "", password: "", phone: "", address: "" });
    } catch (err) {
      setMsg(err.response?.data || "Failed to add staff");
    }
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={submit}>
        <h2>Add Staff</h2>
        <input placeholder="Name" value={staff.name} onChange={(e)=>setStaff({...staff,name:e.target.value})} required />
        <input placeholder="Email" value={staff.email} onChange={(e)=>setStaff({...staff,email:e.target.value})} required />
        <input placeholder="Password" type="password" value={staff.password} onChange={(e)=>setStaff({...staff,password:e.target.value})} required />
        <input placeholder="Phone" value={staff.phone} onChange={(e)=>setStaff({...staff,phone:e.target.value})} />
        <input placeholder="Address" value={staff.address} onChange={(e)=>setStaff({...staff,address:e.target.value})} />
        <button>Add Staff</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default AddStaff;
