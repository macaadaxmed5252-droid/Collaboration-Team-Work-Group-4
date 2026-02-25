import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  Utensils, 
  ChevronRight,
  LogOut
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { 
      path: "/admin", 
      label: "Dashboard", 
      icon: <LayoutDashboard size={22} /> 
    },
    { 
      path: "/admin/create-restaurant", 
      label: "Create Restaurant", 
      icon: <PlusCircle size={22} /> 
    },
    { 
      path: "/admin/manage-restaurant", 
      label: "Manage Restaurant", 
      icon: <Utensils size={22} /> 
    },
    { 
      path: "/admin/settings", 
      label: "Settings", 
      icon: <Settings size={22} /> 
    },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <Utensils className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Admin<span className="text-orange-600">Panel</span></span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
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

      <div className="p-4 mt-auto border-t border-gray-50">
        <button className="flex items-center gap-3 w-full p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors">
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;