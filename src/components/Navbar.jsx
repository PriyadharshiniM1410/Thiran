import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

export default function Navbar({ userRole, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPicture");

    googleLogout();

    setUserRole(null);
    navigate("/"); 
  };


  if (!userRole) {
    return (
      <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">Thiran</Link>
        <Link
          to="/"
          className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
        >
          Login
        </Link>
      </nav>
    );
  }

  const links = [{ name: "Home", path: "/home" }];

  if (userRole === "viewer") links.push({ name: "Student List", path: "/student/list" });
  if (userRole === "student") links.push({ name: "Student Dashboard", path: "/student" });
  if (userRole === "mentor") {links.push({ name: "Mentor Dashboard", path: "/mentor/pending" });} 

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/home" className="text-3xl font-bold">Thiran</Link>

      <div className="flex items-center space-x-6">
        {links.map((link) => (
          <Link key={link.name} to={link.path} className="hover:text-pink-400">
            {link.name}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
