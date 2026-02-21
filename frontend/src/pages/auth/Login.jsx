import { useState, useContext } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Certificate Admin Portal</h2>
        <p className="subtitle">Secure Login Access</p>

        <form onSubmit={handleOnSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleOnChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleOnChange}
              required
            />
            <label>Password</label>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="student-link">
          <Link to="/certificate">Student Verification →</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;