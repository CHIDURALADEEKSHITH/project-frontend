import { useEffect, useState } from "react";
import api from "../services/api";

function ViewStaff() {
  const [staff, setStaff] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/admin/viewallstaff");
      console.log("Staff Data:", res.data);
      setStaff(res.data);
    } catch (err) {
      console.log(err);
      setMsg("Unable to load staff");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page">
      <h2>View Staff</h2>
      <p>{msg}</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStaff;