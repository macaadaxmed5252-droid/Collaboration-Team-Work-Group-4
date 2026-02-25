import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Info, Phone, Utensils, LayoutDashboard, Menu, X, Search } from "lucide-react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { to: "/", label: "Home", icon: <Home size={20} /> },
        { to: "/about", label: "About", icon: <Info size={20} /> },
        { to: "/resturents", label: "Restaurants", icon: <Utensils size={20} /> },
        { to: "/contact", label: "Contact", icon: <Phone size={20} /> },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-200">
                            <Utensils className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter">
                            <span className="text-orange-600">Local</span>
                            <span className="text-gray-900">Food</span>
                        </h1>
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link 
                                key={item.to}
                                to={item.to} 
                                className="flex items-center gap-1 text-gray-600 font-semibold hover:text-orange-600 transition-all duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link 
                            to="/admin" 
                            className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-md"
                        >
                            Admin Panel
                        </Link>
                    </nav>

                    <div className="lg:hidden flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                            <Search size={22} />
                        </button>
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="p-2 text-gray-900 bg-gray-100 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden fixed inset-0 z-40 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="fixed inset-0 bg-black/20" onClick={() => setIsOpen(false)}></div>
                
                <div className="relative bg-white w-72 h-full shadow-2xl p-6 flex flex-col space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-xl text-orange-600">Menu</span>
                        <button onClick={() => setIsOpen(false)}><X size={24} /></button>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {menuItems.map((item) => (
                            <Link 
                                key={item.to}
                                to={item.to} 
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-orange-600 p-2 hover:bg-orange-50 rounded-lg transition-all"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                        <hr />
                        <Link 
                            to="/admin" 
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 text-lg font-bold text-white bg-gray-900 p-3 rounded-xl justify-center shadow-lg"
                        >
                            <LayoutDashboard size={20} />
                            Admin Panel
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;