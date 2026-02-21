import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./StudentLogin.css";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "" });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate(`/certificate/${form.email}`);
  };

  return (
    <div className="student-container">
      <div className="student-card">
        <h2>Certificate Verification</h2>
        <p className="subtitle">Access your issued certificate securely</p>

        <form onSubmit={handleOnSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleOnChange}
              required
            />
            <label>Enter Your Registered Email</label>
          </div>

          <button type="submit" className="verify-btn">
            Verify Certificate
          </button>
        </form>

        <div className="admin-link">
          <Link to="/login">← Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;