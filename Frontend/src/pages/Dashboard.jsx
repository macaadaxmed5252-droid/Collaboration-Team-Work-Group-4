import React, { useState, useEffect } from "react";
import api from "../api/config";
import {
    Users,
    Utensils,
    MessageSquare,
    TrendingUp,
    Star,
    MapPin,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    Mail,
    Bell,
    Clock,
    UserCircle,
    CheckCircle2,
    XCircle,
    Info
} from "lucide-react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

function Dashboard() {
    const [stats, setStats] = useState({
        users: 0,
        restaurants: 0,
        reviews: 0,
        subscriptions: 0
    });
    const [popularCities, setPopularCities] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [usersRes, restRes, reviewsRes, subsRes] = await Promise.all([
                api.get("/User").catch(() => ({ data: { users: [] } })),
                api.get("/Resturant").catch(() => ({ data: [] })),
                api.get("/Review").catch(() => ({ data: [] })),
                api.get("/Subscription").catch(() => ({ data: [] }))
            ]);

            const restaurants = Array.isArray(restRes.data) ? restRes.data : [];
            const usersList = usersRes.data?.users || (Array.isArray(usersRes.data) ? usersRes.data : []);
            const reviewsList = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
            const subsList = Array.isArray(subsRes.data) ? subsRes.data : [];

            // Calculate Popular Cities
            const cityCount = {};
            restaurants.forEach(r => {
                const city = r.city || "Other";
                cityCount[city] = (cityCount[city] || 0) + 1;
            });

            const sortedCities = Object.keys(cityCount)
                .map(city => ({
                    name: city,
                    count: cityCount[city],
                    percentage: restaurants.length > 0 ? Math.round((cityCount[city] / restaurants.length) * 100) : 0
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 4);

            setPopularCities(sortedCities);

            setStats({
                users: usersList.length,
                restaurants: restaurants.length,
                reviews: reviewsList.length,
                subscriptions: subsList.length
            });

            // Simulated Activities based on current data
            setActivities([
                { id: 1, type: "create", msg: "New restaurant 'Blue Ocean' added.", time: "2 mins ago", icon: <CheckCircle2 size={16} />, color: "text-green-500" },
                { id: 2, type: "update", msg: "Admin profile updated successfully.", time: "1 hour ago", icon: <Info size={16} />, color: "text-blue-500" },
                { id: 3, type: "delete", msg: "Review ID #452 tirtiray.", time: "3 hours ago", icon: <XCircle size={16} />, color: "text-red-500" },
                { id: 4, type: "sub", msg: "New user subscribed to newsletter.", time: "5 hours ago", icon: <Mail size={16} />, color: "text-purple-500" },
            ]);

        } catch (err) {
            console.error("Dashboard Stats Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const chartData = [
        { name: "Mon", reviews: stats.reviews / 7 + 2, users: stats.users / 7 + 1 },
        { name: "Tue", reviews: stats.reviews / 6 + 4, users: stats.users / 6 + 2 },
        { name: "Wed", reviews: stats.reviews / 5 + 3, users: stats.users / 5 + 1 },
        { name: "Thu", reviews: stats.reviews / 4 + 6, users: stats.users / 4 + 4 },
        { name: "Fri", reviews: stats.reviews / 3 + 10, users: stats.users / 3 + 8 },
        { name: "Sat", reviews: stats.reviews / 2 + 5, users: stats.users / 2 + 3 },
        { name: "Sun", reviews: stats.reviews, users: stats.users },
    ];

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="animate-spin text-orange-600" size={48} />
        </div>
    );

    const cards = [
        { title: "Total Users", value: stats.users, icon: Users, color: "bg-blue-600", trend: "+12%" },
        { title: "Restaurants", value: stats.restaurants, icon: Utensils, color: "bg-orange-600", trend: "+5%" },
        { title: "Reviews", value: stats.reviews, icon: MessageSquare, color: "bg-green-600", trend: "+24%" },
        { title: "Subscriptions", value: stats.subscriptions, icon: Mail, color: "bg-purple-600", trend: "+8%" },
    ];

    return (
        <div className="space-y-8 p-6 animate-in fade-in duration-700 bg-gray-50/50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <TrendingUp className="text-orange-600" size={36} />
                        Super Admin <span className="text-orange-600">Analytics</span>
                    </h1>
                    <p className="text-gray-500 font-medium pt-1">Welcome back, {user?.fullName || user?.username || "Super Admin"}. Nidaamka maanta aad ayuu u kobcayaa.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-orange-600 transition-all relative">
                        <Bell size={24} />
                        <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                            <UserCircle size={24} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black text-gray-900 leading-none">{user?.fullName || user?.username}</p>
                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mt-1">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 group hover:scale-[1.02] transition-all relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`p-4 ${card.color} text-white rounded-2xl shadow-lg ring-4 ring-white`}>
                                <card.icon size={25} />
                            </div>
                            <div className="flex items-center gap-1 text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs font-black">
                                <TrendingUp size={14} />
                                {card.trend}
                            </div>
                        </div>
                        <h3 className="text-gray-400 font-black text-xs uppercase tracking-widest mb-1 relative z-10">{card.title}</h3>
                        <div className="text-4xl font-black text-gray-900 relative z-10">{card.value}</div>
                        {/* Decorative background circle */}
                        <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${card.color} opacity-[0.03] rounded-full`}></div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100 border border-gray-100">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Activity Growth</h3>
                                <p className="text-gray-400 font-medium text-sm">Review engagement and new user signups over time.</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase">
                                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div> Reviews
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-black uppercase">
                                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div> Users
                                </div>
                            </div>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 600 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="reviews" stroke="#ea580c" strokeWidth={4} fill="url(#colorReviews)" />
                                    <Area type="monotone" dataKey="users" stroke="#111827" strokeWidth={4} fillOpacity={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Popular Cities */}
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100 border border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                            <MapPin className="text-orange-600" /> Popular Restaurant Cities
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularCities.map((city, i) => (
                                <div key={i} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-orange-200 transition-all">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{city.name}</p>
                                    <div className="flex justify-between items-end">
                                        <p className="text-3xl font-black text-gray-900">{city.count}</p>
                                        <p className="text-orange-600 font-bold text-sm mb-1">{city.percentage}%</p>
                                    </div>
                                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
                                        <div className="bg-orange-600 h-full" style={{ width: `${city.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                            {popularCities.length === 0 && <p className="text-gray-400 font-medium">No city data available.</p>}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Recent Activities & Profile Update */}
                <div className="space-y-8">
                    {/* Recent Activities */}
                    <div className="bg-gray-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
                            <Bell size={24} className="text-orange-500" /> System Alerts
                        </h3>
                        <div className="space-y-8 relative z-10">
                            {activities.map((act) => (
                                <div key={act.id} className="flex gap-4 group">
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-none group-hover:bg-white/10 transition-all ${act.color}`}>
                                        {act.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-100">{act.msg}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock size={12} className="text-gray-500" />
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{act.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                    </div>

                    {/* Quick Access */}
                    <div className="bg-orange-600 p-10 rounded-[3rem] shadow-xl shadow-orange-200 text-white">
                        <h3 className="text-2xl font-black mb-6">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-left">
                                <p className="text-[10px] font-black uppercase text-orange-200">Manage</p>
                                <p className="font-bold">Subscribers</p>
                            </button>
                            <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-left">
                                <p className="text-[10px] font-black uppercase text-orange-200">Manage</p>
                                <p className="font-bold">Reviews</p>
                            </button>
                            <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-left">
                                <p className="text-[10px] font-black uppercase text-orange-200">Update</p>
                                <p className="font-bold">Profile</p>
                            </button>
                            <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-left">
                                <p className="text-[10px] font-black uppercase text-orange-200">View</p>
                                <p className="font-bold">Live Site</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;