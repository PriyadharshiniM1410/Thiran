import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, userRole, children }) {
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
