import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./CreateAdmin.css";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "super_admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,10}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validatePassword(form.password)) {
      return setMessage(
        "Password must be 8-10 characters, include 1 uppercase, 1 number & 1 special character"
      );
    }

    try {
      setLoading(true);
      const res = await API.post("/create-admin", form);
      setMessage(res.data.msg);

      setForm({
        username: "",
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      setMessage(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1>Create New Admin</h1>
        <p className="subtitle">
          Only Super Admin can create admins
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder=" "
              value={form.username}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <button
          className="secondary-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateAdmin;