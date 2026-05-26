import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./common/common.css";
import "./auth/auth.css";
import "./admin/admin.css";
import "./staff/staff.css";
import "./customer/customer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
