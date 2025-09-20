import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, userRole, children }) {
  if (!userRole) {
    // 🚨 Not logged in → go back to signup/login
    return <Navigate to="/" replace />;
  }

  // ✅ Support single role or multiple roles
  if (Array.isArray(allowedRoles)) {
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/home" replace />;
    }
  } else {
    if (userRole !== allowedRoles) {
      return <Navigate to="/home" replace />;
    }
  }

  return children;
}
