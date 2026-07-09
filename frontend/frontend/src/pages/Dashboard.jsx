import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged Out Successfully!");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>NeuroForge Dashboard</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-card">
        <h2>Welcome 👋</h2>
        <p>You have successfully logged in.</p>
        <br />

        <h3>Workspace Overview</h3>
        <ul>
          <li>✅ Secure Login</li>
          <li>✅ JWT Authentication</li>
          <li>✅ React Frontend</li>
          <li>✅ Spring Boot Backend</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;