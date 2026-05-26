import { useState } from "react";
import api from "../services/api";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/customer/register", user);
    setMsg(res.data);
  };

  return (
    <div className="page form-page auth-page">
      <form className="card" onSubmit={submit}>
        <h2>Customer Register</h2>
        <input placeholder="Name" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} required />
        <input placeholder="Email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}  />
        <input placeholder="Password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} required />
        <input placeholder="Phone" value={user.phone} onChange={(e)=>setUser({...user,phone:e.target.value})} />
        <input placeholder="Address" value={user.address} onChange={(e)=>setUser({...user,address:e.target.value})} />
        <button>Register</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default Register;
