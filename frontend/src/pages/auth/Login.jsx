import { useState, useContext } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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

      setUser(res.data.user);  // 🔥 VERY IMPORTANT

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleOnChange}
          placeholder="Enter your Username"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleOnChange}
          placeholder="Enter your password"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
