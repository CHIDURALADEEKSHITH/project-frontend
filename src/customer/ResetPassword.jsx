import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");
    const res = await api.post("/customer/resetpassword", { email, newPassword });
    setMsg(res.data);
    localStorage.removeItem("resetEmail");
    navigate("/login");
  };

  return (
    <div className="page form-page auth-page">
      <form className="card" onSubmit={submit}>
        <h2>Reset Password</h2>
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required />
        <button>Reset Password</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default ResetPassword;
