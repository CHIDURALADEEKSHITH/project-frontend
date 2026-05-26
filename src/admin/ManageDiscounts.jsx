import { useEffect, useState } from "react";
import api from "../services/api";
import "./admin.css";

function ManageDiscounts() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [msg, setMsg] = useState("");

  const loadProducts = () => {
    api.get("/admin/viewallproducts").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const removeDiscount = async () => {
  if (!productId) {
    setMsg("Please select product");
    return;
  }

  try {
    const res = await api.post(
      "/admin/updatediscount",
      {
        productId,
        discountPercentage: "0",
      }
    );

    setMsg(res.data);

    setProductId("");
    setDiscountPercentage("");

    loadProducts();
  } catch (err) {
    setMsg(
      err.response?.data ||
        "Failed to remove discount"
    );
  }
};
  const updateDiscount = async (e) => {
    e.preventDefault();

    const res = await api.post("/admin/updatediscount", {
      productId,
      discountPercentage,
    });

    setMsg(res.data);
    setProductId("");
    setDiscountPercentage("");
    loadProducts();
  };

  return (
    <div className="page">
      <h2>Manage Discounts</h2>

      <form className="card" onSubmit={updateDiscount}>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - Current Discount: {p.discountPercentage || 0}%
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter Discount Percentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          required
        />

        <button>Update Discount</button>
        <button
  type="button"
  className="remove-discount-btn"
  onClick={removeDiscount}
>
  Remove Discount
</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default ManageDiscounts;