import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Settings,
  Utensils,
  ChevronRight,
  LogOut,
  User,
  Users,
  MessageSquare
} from "lucide-react";
import { IMAGE_BASE_URL } from "../api/config";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard size={22} />
    },
    {
      path: "/admin/create-restaurant",
      label: "Add Restaurant",
      icon: <PlusCircle size={22} />
    },
    {
      path: "/admin/manage-restaurant",
      label: "Restaurants",
      icon: <Utensils size={22} />
    },
    {
      path: "/admin/menu-management",
      label: "Manage Menus",
      icon: <PlusCircle size={22} />
    },
    {
      path: "/admin/manage-users",
      label: "Manage Users",
      icon: <Users size={22} />
    },
    {
      path: "/admin/review-messages",
      label: "Manage Reviews",
      icon: <MessageSquare size={22} />
    },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <Utensils className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Admin<span className="text-orange-600">Panel</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 group ${isActive
                ? "bg-orange-50 text-orange-600 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-900"}`}>
                  {item.icon}
                </span>
                <span className="font-semibold text-[15px]">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={18} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-gray-50 space-y-4">
        {user && (
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full border-2 border-orange-100 overflow-hidden bg-gray-50">
              {user.profilePicture ? (
                <img src={`${IMAGE_BASE_URL}${user.profilePicture}`} alt="Admin" className="w-full h-full object-cover" />
              ) : (
                <User size={20} className="text-gray-400 m-auto mt-2" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-gray-900 text-sm truncate">{user.fullName}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;