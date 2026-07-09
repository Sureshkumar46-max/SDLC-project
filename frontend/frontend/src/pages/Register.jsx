import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
      await register(user);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed!");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>NeuroForge</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="ORG_ADMIN">ORG_ADMIN</option>
            <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
            <option value="DEVELOPER">DEVELOPER</option>
            <option value="QA_TESTER">QA_TESTER</option>
            <option value="CLIENT">CLIENT</option>
          </select>

          <button type="submit">Create Account</button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;