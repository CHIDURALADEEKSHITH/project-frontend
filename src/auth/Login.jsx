import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.role === "STAFF") {
        navigate("/staff");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      setMsg(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={login}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Phone Number"
          value={user.phone}
          onChange={(e) =>
            setUser({
              ...user,
              phone: e.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          required
        />

        <button>Login</button>

        <p>{msg}</p>

        <Link to="/customer/forgot-password">Forgot Password?</Link>
      </form>
    </div>
  );
}

export default Login;