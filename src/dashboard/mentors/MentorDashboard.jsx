import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Users, ClipboardList, LogOut } from "lucide-react";

export default function MentorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "mentor") {
      navigate("/");
    }
  }, [navigate]);

 
  const navItems = [
    { path: "/mentor/pending", label: "Pending Requests", icon: <ClipboardList size={18} /> },
    { path: "/mentor/list", label: "Approved Students", icon: <Users size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 p-2">
      <aside className="w-64 bg-pink-600 text-white p-6 flex flex-col rounded-2xl shadow-lg">
        <h1 className="text-2xl font-extrabold mb-6 text-center">
          <Link to="/mentor">Mentor Dashboard</Link>
        </h1>

        <nav className="flex flex-col gap-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition duration-300 font-medium 
                ${(location.pathname === item.path ||
                  (item.path === "/mentor/pending" && location.pathname === "/mentor"))
                  ?"bg-pink-400" : "hover:bg-pink-500"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto rounded-2xl bg-gradient-to-tr from-indigo-200 via-purple-300 to-pink-300 shadow-md">
        <Outlet />
      </main>
    </div>
  );
}
