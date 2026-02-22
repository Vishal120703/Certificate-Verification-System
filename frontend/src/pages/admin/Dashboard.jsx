import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/me");
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Certificate Dashboard</h2>
        <span className={`role-badge ${user.role}`}>
          {user.role.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <div className="card-grid">
        {/* SUPER ADMIN - View All Admins */}
{user.role === "super_admin" && (
  <div
    className="dashboard-card blue"
    onClick={() => navigate("/all-admins")}
  >
    <h3>All Admins</h3>
    <p>View and manage all admin accounts</p>
  </div>
)}

{/* ADMIN + SUPER ADMIN - View All Certificates */}
{["admin", "super_admin"].includes(user.role) && (
  <div
    className="dashboard-card orange"
    onClick={() => navigate("/all-certificates")}
  >
    <h3>All Certificates</h3>
    <p>View all generated certificates</p>
  </div>
)}
        {/* SUPER ADMIN */}
        {user.role === "super_admin" && (
          <div
            className="dashboard-card purple"
            onClick={() => navigate("/create-admin")}
          >
            <h3>Create Admin</h3>
            <p>Manage and create new admin accounts</p>
          </div>
        )}

        {/* ADMIN + SUPER ADMIN */}
        {["admin", "super_admin"].includes(user.role) && (
          <div
            className="dashboard-card green"
            onClick={() => navigate("/upload")}
          >
            <h3>Upload Certificates</h3>
            <p>Upload Excel file to generate certificates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;