import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./common/Navbar";
import Home from "./common/Home";
import Logout from "./common/Logout";


import Login from "./auth/Login";

import AdminDashboard from "./admin/AdminDashboard";
import AddStaff from "./admin/AddStaff";
import ViewStaff from "./admin/ViewStaff";
import AddCategory from "./admin/AddCategory";
import ViewCategories from "./admin/ViewCategories";
import AddProduct from "./admin/AddProduct";
import AdminViewProducts from "./admin/ViewProducts";
import AdminViewOrders from "./admin/ViewOrders";

import StaffDashboard from "./staff/StaffDashboard";
import StaffViewOrders from "./staff/ViewOrders";
import UpdateOrderStatus from "./staff/UpdateOrderStatus";
import StaffViewProducts from "./staff/ViewProducts";
import UpdateStock from "./staff/UpdateStock";

import CustomerDashboard from "./customer/CustomerDashboard";
import Register from "./customer/Register";
import CustomerViewProducts from "./customer/ViewProducts";
import Cart from "./customer/Cart";
import MyOrders from "./customer/MyOrders";
import ForgotPassword from "./customer/ForgotPassword";
import VerifyOtp from "./customer/VerifyOtp";
import ResetPassword from "./customer/ResetPassword";
import OfflineSale from "./staff/OfflineSale";
import ViewStockHistory from "./admin/ViewStockHistory";
import AboutUs from "./common/AboutUs";
import Invoice from "./customer/Invoice";
import ManageDiscounts from "./admin/ManageDiscounts";
import ManageDeliveryCharge from "./admin/ManageDeliveryCharge";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<CustomerViewProducts />} />
        <Route path="/about" element={<AboutUs />} />


        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-staff" element={<AddStaff />} />
        <Route path="/admin/view-staff" element={<ViewStaff />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/view-categories" element={<ViewCategories />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/view-products" element={<AdminViewProducts />} />
        <Route path="/admin/view-orders" element={<AdminViewOrders />} />

        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/view-orders" element={<StaffViewOrders />} />
        <Route path="/staff/update-order-status" element={<UpdateOrderStatus />} />
        <Route path="/staff/view-products" element={<StaffViewProducts />} />
        <Route path="/staff/update-stock" element={<UpdateStock />} />

        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/customer/products" element={<CustomerViewProducts />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/my-orders" element={<MyOrders />} />
        <Route path="/customer/forgot-password" element={<ForgotPassword />} />
        <Route path="/customer/verify-otp" element={<VerifyOtp />} />
        <Route path="/customer/reset-password" element={<ResetPassword />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/staff/offline-sale" element={<OfflineSale />} />
        <Route path="/admin/stock-history" element={<ViewStockHistory />} />
        <Route path="/customer/invoice" element={<Invoice />} />
        <Route path="/admin/manage-discounts" element={<ManageDiscounts />} />

        <Route path="/admin/manage-delivery-charge" element={<ManageDeliveryCharge />} />
      </Routes>
    </>
  );
}

export default App;
