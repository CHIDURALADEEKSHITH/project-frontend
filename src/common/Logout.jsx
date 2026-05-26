import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  return (
    <div className="page">
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;