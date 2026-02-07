import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

function Dashboard() {
  if (!isAuthenticated() || getUserRole() !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>
        Admin Dashboard created for future use but will be only visible to Admin
        user
      </p>
    </div>
  );
}

export default Dashboard;
