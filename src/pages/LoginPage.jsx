import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUserRole }) {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  
  function validateEmail(email) {
    const atPosition = email.indexOf("@");
    if (atPosition === -1) {
      return false; 
    }

    const dotPosition = email.indexOf(".", atPosition);
    if (dotPosition === -1) {
      return false; 
    }

    if (atPosition === 0 || dotPosition === email.length - 1) {
      return false; 
    }
    if (atPosition === email.length - 1|| dotPosition === 0) {
      return false; 
    }

    return true; 
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    
    if (email === "" || password === "") {
      setError("Email and password are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 5) {
      setError("Password must be atleast lessthan 5 characters.");
      return;
    }
    const roleLower = role.toLowerCase();
    localStorage.setItem("userRole", roleLower);
    localStorage.setItem("userEmail", email);
    setUserRole(roleLower);

    
    if (roleLower === "viewer") {
      navigate("/home");
    } 
    else if (roleLower === "student") {
      navigate("/student");
    }
    else if (roleLower === "mentor") {
      navigate("/mentor/pending");
    } 
    else {
      navigate("/home");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-center"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700">Welcome</h2>
        <h3 className="text-lg text-left font-bold mb-1 text-red-500">Select Role</h3>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4"
        >
          <option value="viewer">Viewer</option>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>
        <h3 className="text-lg text-left font-bold mb-1 text-red-500">Email</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4"/>
        <h3 className="text-lg text-left font-bold mb-1 text-red-500">Password</h3>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl mb-4"/>

        {error !== "" && (
          <p className="text-red-600 mb-4 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg">
          Login
          </button>
      </form>
    </div>
  );
}
