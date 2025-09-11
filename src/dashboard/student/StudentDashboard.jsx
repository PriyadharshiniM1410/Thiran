import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Info, Code, FolderGit2, Users } from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();   
  const location = useLocation();   


  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "student") {
      navigate("/"); 
    }
  }, [navigate]);

  const navItems = [
    { path: "/student/info", label: "Info Form", icon: <Info size={18} /> },
    { path: "/student/skill", label: "Skill Form", icon: <Code size={18} /> },
    { path: "/student/project", label: "Project Form", icon: <FolderGit2 size={18} /> },
    { path: "/student/list", label: "Student List", icon: <Users size={18} /> },
  ];

 
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 p-2">
      <aside className="w-max bg-pink-600 text-white flex flex-col p-4 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mt-10 mb-10 text-center">
          Student Dashboard
        </h1>

        {navItems.map((item) => (
          <Link key={item.path} to={item.path}
            className={`flex items-center gap-3 p-5 rounded-2xl 
              ${location.pathname === item.path ? "bg-pink-400" : "hover:bg-pink-500"}`}>
            {item.icon}
            {item.label}
          </Link>
        ))}
      </aside>
            <main className="flex-1 p-4 ml-4 bg-gradient-to-tr from-indigo-200 via-purple-300 to-pink-300  rounded-2xl shadow-md">
        <Outlet />
        </main>
    </div>
  );
}


