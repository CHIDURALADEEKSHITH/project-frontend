import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");
    const res = await api.post("/customer/verifyotp", { email, otp });
    setMsg(res.data);
    if (String(res.data).includes("Verified")) {
      navigate("/customer/reset-password");
    }
  };

  return (
    <div className="page form-page auth-page">
      <form className="card" onSubmit={submit}>
        <h2>Verify OTP</h2>
        <input placeholder="Enter OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
        <button>Verify</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default VerifyOtp;
