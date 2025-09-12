import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ userRole, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail"); 
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center text-xl">
      <Link to={userRole ? "/home" : "/"} className="text-3xl font-bold">
        Thiran
      </Link>

      <div className="space-x-4">
        {userRole && <Link to="/home">Home</Link>}
        {userRole === "viewer" && <Link to="/student/list">Student List</Link>}
        {userRole === "student" && <Link to="/student">Student Dashboard</Link>}
        {userRole === "mentor" && <Link to="/mentor/pending">Mentor Dashboard</Link>}
        
        {!userRole ? (<Link to="/">Login</Link>) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
