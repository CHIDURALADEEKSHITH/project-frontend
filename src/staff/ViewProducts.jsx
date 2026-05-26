import { useEffect, useState } from "react";
import api, { imageUrl } from "../services/api";
import "./staff.css";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/staff/viewallproducts").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const getOfferPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
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
      <h2>Staff - View Products</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search by product, brand, or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

            <p>Product ID: {p.id}</p>
            <p>Brand: {p.brand}</p>
            <p>Category: {p.category?.categoryName}</p>

            {p.discountPercentage > 0 ? (
              <>
                <p className="old-price">Original Price: ₹{p.price}</p>
                <p className="offer-price">
                  Offer Price: ₹{getOfferPrice(p.price, p.discountPercentage)}
                </p>
              </>
            ) : (
              <p>Price: ₹{p.price}</p>
            )}

            <p>Available Stock: {p.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewProducts;