import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { imageUrl } from "../services/api";
import "./customer.css";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/customer/viewallproducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Unable to load products");
      });
  }, []);

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) {
      return "NO EXPIRY";
    }

    const today = new Date();
    const expiry = new Date(expiryDate);

    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      return "EXPIRED";
    }

    if (diffDays <= 30) {
      return "NEAR EXPIRY";
    }

    return "VALID";
  };

  const getOfferPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      alert("Please login to add product to cart");
      navigate("/login");
      return;
    }

    if (role !== "CUSTOMER") {
      alert("Only customers can order products");
      return;
    }

    const userId = Number(localStorage.getItem("userId"));
    const quantity = Number(prompt("Enter quantity", "1"));

    if (!quantity || quantity <= 0) {
      setMsg("Enter valid quantity");
      return;
    }

    try {
      const res = await api.post("/customer/addtocart", {
        userId,
        productId,
        quantity,
      });

      setMsg(res.data);
    } catch (err) {
      setMsg(err.response?.data || "Failed to add cart");
    }
  };

  const filteredProducts = products.filter((p) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      p.name?.toLowerCase().includes(keyword) ||
      p.brand?.toLowerCase().includes(keyword) ||
      p.category?.categoryName?.toLowerCase().includes(keyword);

    const matchesCategory =
      categoryFilter === "ALL" ||
      p.category?.categoryName?.toLowerCase() ===
        categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page">
      <h2>Available Fertilizers</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search by product, brand, or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-box">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="fertilizers">Fertilizers</option>
          <option value="pesticides">Pesticides</option>
          <option value="seeds">Seeds</option>
        </select>
      </div>

      <p>{msg}</p>

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={imageUrl(p.imagePath)} alt={p.name} />

            <h3>{p.name}</h3>

            {p.discountPercentage > 0 && (
              <p className="discount-badge">
                {p.discountPercentage}% OFF
              </p>
            )}

            <p>Brand: {p.brand}</p>
            <p>Category: {p.category?.categoryName}</p>

            {p.discountPercentage > 0 ? (
              <>
                <p className="old-price">₹{p.price}</p>

                <p className="offer-price">
                  Offer Price: ₹
                  {getOfferPrice(p.price, p.discountPercentage)}
                </p>
              </>
            ) : (
              <p>Price: ₹{p.price}</p>
            )}

            <p>Available Stock: {p.quantity}</p>

            <p>Manufacture Date: {p.manufactureDate}</p>
            <p>Expiry Date: {p.expiryDate}</p>

            <p
              className={
                getExpiryStatus(p.expiryDate) === "EXPIRED"
                  ? "expired-text"
                  : getExpiryStatus(p.expiryDate) === "NEAR EXPIRY"
                  ? "near-expiry-text"
                  : "valid-text"
              }
            >
              Expiry Status: {getExpiryStatus(p.expiryDate)}
            </p>

            {p.quantity === 0 || getExpiryStatus(p.expiryDate) === "EXPIRED" ? (
              <button disabled>Not Available</button>
            ) : (
              <button onClick={() => addToCart(p.id)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewProducts;