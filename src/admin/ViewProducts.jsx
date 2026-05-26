import { useEffect, useState } from "react";
import api, { imageUrl } from "../services/api";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/admin/viewallproducts").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) {
      return "NO EXPIRY";
    }

    const today = new Date();

    const expiry = new Date(expiryDate);

    const diffDays =
      (expiry - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      return "EXPIRED";
    }

    if (diffDays <= 30) {
      return "NEAR EXPIRY";
    }

    return "VALID";
  };

  const filteredProducts = products.filter((p) => {
    const keyword = search.toLowerCase();

    return (
      p.name?.toLowerCase().includes(keyword) ||
      p.brand?.toLowerCase().includes(keyword) ||
      p.category?.categoryName?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="page">
      <h2>View Products</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={imageUrl(p.imagePath)} alt={p.name} />

            <h3>{p.name}</h3>

            <p>Brand: {p.brand}</p>

            <p>Category: {p.category?.categoryName}</p>

            <p>Price: ₹{p.price}</p>

            <p>Stock: {p.quantity}</p>

            <p>
              Manufacture Date: {p.manufactureDate}
            </p>

            <p>
              Expiry Date: {p.expiryDate}
            </p>

            <p
              className={
                getExpiryStatus(p.expiryDate) === "EXPIRED"
                  ? "expired-text"
                  : getExpiryStatus(p.expiryDate) === "NEAR EXPIRY"
                  ? "near-expiry-text"
                  : "valid-text"
              }
            >
              Expiry Status:
              {" "}
              {getExpiryStatus(p.expiryDate)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewProducts;