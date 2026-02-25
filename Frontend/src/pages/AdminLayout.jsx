import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Search, Bell, User } from "lucide-react";

function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* 1. Sidebar - Fixed width */}
            <Sidebar />

            {/* 2. Main Content Area */}
            <div className="flex-1 flex flex-col">
                
                {/* Top Header Section */}
                <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="relative w-96 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search everything..." 
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl relative transition-colors">
                            <Bell size={22} />
                            <span className="absolute top-2.5 right-3 w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></span>
                        </button>
                        
                        <div className="h-10 w-[1px] bg-gray-100 mx-2"></div>

                        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900 leading-none">Admin User</p>
                                <p className="text-xs text-gray-500 mt-1">Super Admin</p>
                            </div>
                            <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                <User size={24} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Outlet - Halkaan waxaa ka soo baxaya boggaga kale */}
                <main className="p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;