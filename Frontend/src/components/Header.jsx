import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Info, Phone, Utensils, LayoutDashboard, Menu, X, Search, LogIn, User, LogOut, Heart } from "lucide-react";
import { IMAGE_BASE_URL } from "../api/config";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, [localStorage.getItem("user")]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    const menuItems = [
        { to: "/", label: "Home", icon: <Home size={20} /> },
        { to: "/about", label: "About", icon: <Info size={20} /> },
        { to: "/resturents", label: "Restaurants", icon: <Utensils size={20} /> },
        { to: "/favorites", label: "Favorites", icon: <Heart size={20} /> }, // Add this
        { to: "/contact", label: "Contact", icon: <Phone size={20} /> },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100 h-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center h-full">

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
                                className="flex items-center gap-1 text-gray-600 font-bold hover:text-orange-600 transition-all duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {user ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                                <Link to="/profile" className="flex items-center gap-2 group">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all overflow-hidden border-2 border-orange-50">
                                        {user.profilePicture ?
                                            <img src={`${IMAGE_BASE_URL}${user.profilePicture}`} className="w-full h-full object-cover" /> :
                                            <User size={20} />
                                        }
                                    </div>
                                    <span className="font-black text-gray-900">{user.fullName}</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="bg-gray-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md text-sm"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                                <Link to="/login" className="text-gray-900 font-black hover:text-orange-600 transition-colors px-4">Login</Link>
                                <Link to="/signup" className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-black hover:bg-orange-700 hover:scale-105 transition-all shadow-md shadow-orange-100">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </nav>

                    <div className="lg:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-900 bg-gray-100 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 z-40 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

                <div className="relative bg-white w-72 h-full shadow-2xl p-6 flex flex-col space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-black text-2xl text-orange-600 uppercase tracking-tighter">Menu</span>
                        <button onClick={() => setIsOpen(false)} className="bg-gray-50 p-2 rounded-full"><X size={24} /></button>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 text-lg font-black text-gray-700 hover:text-orange-600 p-3 hover:bg-orange-50 rounded-2xl transition-all"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                        <hr className="my-4 border-gray-50" />
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                                    <User size={20} className="text-orange-600" />
                                    <span className="font-black text-gray-900">Profile</span>
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-4 p-3 text-red-500 font-black">
                                    <LogOut size={20} />
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center font-black py-4 border border-gray-100 rounded-2xl">Login</Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)} className="text-center font-black py-4 bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-100">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;