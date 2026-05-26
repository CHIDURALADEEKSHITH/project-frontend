import { useState } from "react";
import api from "../services/api";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/admin/addcategory", { categoryName });
    setMsg(res.data);
    setCategoryName("");
  };

  return (
    <div className="page form-page">
      <form className="card" onSubmit={submit}>
        <h2>Add Category</h2>
        <input placeholder="Category Name" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required />
        <button>Add Category</button>
        <p>{msg}</p>
      </form>
    </div>
  );
}

export default AddCategory;
