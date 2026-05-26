import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/customer/sendotp", { email });
    localStorage.setItem("resetEmail", email);
    setMsg(res.data);
    navigate("/customer/verify-otp");
  };

  return (
    <div className="page form-page auth-page">
      <form className="card" onSubmit={submit}>
        <h2>Forgot Password</h2>
        <input placeholder="Registered Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <button>Send OTP</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default ForgotPassword;
