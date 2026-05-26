import { useEffect, useState } from "react";
import api from "../services/api";

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    manufactureDate: "",
    expiryDate: "",
    category: { id: "" },
  });

  useEffect(() => {
    api.get("/admin/viewallcategories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMsg("Please select product image");
      return;
    }

    const formData = new FormData();

    const productData = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
      category: { id: Number(product.category.id) },
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], {
        type: "application/json",
      })
    );

    formData.append("image", image);

    try {
      const res = await api.post("/admin/addproduct", formData);
      setMsg(res.data);

      setProduct({
        name: "",
        brand: "",
        price: "",
        quantity: "",
        description: "",
        manufactureDate: "",
        expiryDate: "",
        category: { id: "" },
      });

      setImage(null);
    } catch (err) {
      setMsg(err.response?.data || "Product add failed");
    }
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={submit}>
        <h2>Add Product</h2>

        <input
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />

        <input
          placeholder="Brand"
          value={product.brand}
          onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={product.quantity}
          onChange={(e) =>
            setProduct({ ...product, quantity: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        ></textarea>

        <label>Manufacture Date</label>
        <input
          type="date"
          value={product.manufactureDate}
          onChange={(e) =>
            setProduct({ ...product, manufactureDate: e.target.value })
          }
          required
        />

        <label>Expiry Date</label>
        <input
          type="date"
          value={product.expiryDate}
          onChange={(e) =>
            setProduct({ ...product, expiryDate: e.target.value })
          }
          required
        />

        <select
          value={product.category.id}
          onChange={(e) =>
            setProduct({
              ...product,
              category: { id: e.target.value },
            })
          }
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button>Add Product</button>

        <p>{msg}</p>
      </form>
    </div>
  );
}

export default AddProduct;