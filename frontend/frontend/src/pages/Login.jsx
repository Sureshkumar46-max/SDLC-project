import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(user);

      // JWT Token Save
      localStorage.setItem("token", response.data.token);

      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password!");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>NeuroForge</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;