import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, userRole, children }) {
  if (!userRole) {
    // ❌ login ஆகலைன்னா → login page-க்கு redirect
    return <Navigate to="/" replace />;
  }

  // allowedRoles ஒரு array ஆக இருக்கலாம் அல்லது string ஆக இருக்கலாம்
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(userRole)) {
    // ❌ role match ஆகலைன்னா → home-க்கு redirect
    return <Navigate to="/home" replace />;
  }

  // ✅ role match ஆச்சுனா → அந்த component render ஆகும்
  return children;
}
