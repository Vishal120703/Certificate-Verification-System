import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./Table.css";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await API.get("/allAdmin");
        setAdmins(res.data.data);
      } catch  {
        navigate("/dashboard");
      }
    };

    fetchAdmins();
  }, [navigate]);

  const handleDelete = (id) => {
    console.log("Delete admin:", id);
    alert("Delete functionality will be added later.");
  };

  return (
    <div className="table-container">
      <h2>All Admins</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.username}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(admin._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/dashboard")}>
        ← Back
      </button>
    </div>
  );
};

export default AllAdmins;