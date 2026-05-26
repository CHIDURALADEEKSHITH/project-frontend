import { useEffect, useState } from "react";
import api from "../services/api";
import "./admin.css";

function ViewStockHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    api.get("/admin/viewstockhistory").then((res) => {
      setHistory(res.data);
    });
  }, []);

  const filtered = history.filter((h) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      h.product?.name?.toLowerCase().includes(keyword) ||
      h.changeType?.toLowerCase().includes(keyword) ||
      h.changedBy?.toLowerCase().includes(keyword);

    const matchesCategory =
      category === "ALL" ||
      h.product?.category?.categoryName?.toLowerCase() ===
        category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const sortedHistory = [...filtered].sort((a, b) => {
    const productA = a.product?.name || "";
    const productB = b.product?.name || "";

    if (productA !== productB) {
      return productA.localeCompare(productB);
    }

    return new Date(a.dateTime) - new Date(b.dateTime);
  });

  return (
    <div className="stock-history-page">
      <h2 className="stock-history-title">Stock History</h2>

      <div className="stock-filter-buttons">
        <button onClick={() => setCategory("ALL")}>All</button>
        <button onClick={() => setCategory("Fertilizers")}>Fertilizers</button>
        <button onClick={() => setCategory("Pesticides")}>Pesticides</button>
        <button onClick={() => setCategory("Seeds")}>Seeds</button>
      </div>

      <input
        className="stock-history-search"
        type="text"
        placeholder="Search by product, type, or changed by"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="stock-history-card">
        <table className="stock-history-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Product</th>
              <th>Category</th>
              <th>Change Type</th>
              <th>Quantity</th>
              <th>Old Stock</th>
              <th>New Stock</th>
              <th>Changed By</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {sortedHistory.map((h) => (
              <tr key={h.id}>
                <td>{h.dateTime?.replace("T", " ")}</td>
                <td>{h.product?.name}</td>
                <td>{h.product?.category?.categoryName}</td>
                <td>{h.changeType}</td>
                <td>{h.quantityChanged}</td>
                <td>{h.oldStock}</td>
                <td>{h.newStock}</td>
                <td>{h.changedBy}</td>
                <td>{h.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStockHistory;