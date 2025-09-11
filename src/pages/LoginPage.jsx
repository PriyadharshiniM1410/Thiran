import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUserRole }) {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const roleLower = role.toLowerCase();

    localStorage.setItem("userRole", roleLower);
    localStorage.setItem("userEmail", email);

    setUserRole(roleLower);

    switch (roleLower) {
      case "user":
        navigate("/home"); 
        break;
      case "student":
        navigate("/student");
        break;
      case "mentor":
        navigate("/mentor/pending");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "company":
        navigate("/company");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-center transition-transform transform hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700">Welcome</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        >
          <option value="user">User</option>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
          <option value="company">Company</option>
        </select>

       
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

       
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        {error && <p className="text-red-600 mb-4 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition transform active:scale-95"
        >
          Login
        </button>
      </form>
    </div>
  );
}
