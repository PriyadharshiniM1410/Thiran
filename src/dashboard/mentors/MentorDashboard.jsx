import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Users, ClipboardList } from "lucide-react";

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
    { path: "/mentor/requests", label: "Pending Requests", icon: <ClipboardList size={18} /> },
    { path: "/mentor/students", label: "Approved Students", icon: <Users size={18} /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <aside className="w-64 bg-indigo-600 text-white p-6 flex flex-col rounded-r-2xl">
        <h1 className="text-2xl font-extrabold mb-6 text-center">Mentor Dashboard</h1>

        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition duration-300 font-medium ${
                location.pathname === item.path
                  ? "bg-white/20 shadow-md scale-[1.02]"
                  : "hover:bg-white/10 hover:scale-[1.03]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
