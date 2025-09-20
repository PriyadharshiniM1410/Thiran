import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginPage({ setUserRole }) {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) return;

    const decoded = jwtDecode(token);
    const email = decoded?.email;
    const name = decoded?.name;
    const picture = decoded?.picture;

    const assignedRole = role || "viewer";

    localStorage.setItem("appToken", token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userPicture", picture);
    localStorage.setItem("userRole", assignedRole);

    setUserRole(assignedRole);

    
    if (assignedRole === "viewer") navigate("/home");
    else if (assignedRole === "student") navigate("/students");
    else if (assignedRole === "mentor") navigate("/mentor/pending");
    else navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-purple-400 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Sign Up </h2>
        <p className="text-gray-600 mb-6">
          Select your role and continue with Google
        </p>

        
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-purple-500"
        ><center>
          <option value="">Viewer</option>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          </center>
        </select>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
          theme="filled_blue"
          size="large"
          shape="pill"
          text="signup_with"
          width="100%"
        />
      </div>
    </div>
  );
}
