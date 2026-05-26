import { useEffect, useState } from "react";
import api from "../services/api";

function ViewCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/admin/viewallcategories").then(res => setCategories(res.data));
  }, []);

  return (
    <div className="page">
      <h2>Categories</h2>
      <div className="grid">
        {categories.map(c => <div className="dash-card" key={c.id}>{c.categoryName}</div>)}
      </div>
    </div>
  );
}

export default ViewCategories;
