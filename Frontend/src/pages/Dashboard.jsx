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
    Loader2
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";

function Dashboard() {
    const [stats, setStats] = useState({
        users: 0,
        restaurants: 0,
        reviews: 0,
        menuItems: 0,
        subscriptions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [users, rest, reviews, menu, subs] = await Promise.all([
                api.get("/User"),
                api.get("/Resturant"),
                api.get("/Review"),
                api.get("/Menu"),
                api.get("/Subscription")
            ]);
            setStats({
                users: users.data.users.length,
                restaurants: rest.data.length,
                reviews: reviews.data.length,
                menuItems: menu.data.length,
                subscriptions: subs.data.length
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const data = [
        { name: "Mon", reviews: 12, users: 4 },
        { name: "Tue", reviews: 19, users: 7 },
        { name: "Wed", reviews: 15, users: 5 },
        { name: "Thu", reviews: 22, users: 10 },
        { name: "Fri", reviews: 30, users: 15 },
        { name: "Sat", reviews: 25, users: 12 },
        { name: "Sun", reviews: 18, users: 8 },
    ];

    if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin text-orange-600 mx-auto" size={48} /></div>;

    const cards = [
        { title: "Total Users", value: stats.users, icon: Users, color: "bg-blue-500", trend: "+12%" },
        { title: "Restaurants", value: stats.restaurants, icon: Utensils, color: "bg-orange-500", trend: "+5%" },
        { title: "Reviews", value: stats.reviews, icon: MessageSquare, color: "bg-green-500", trend: "+24%" },
        { title: "Subscriptions", value: stats.subscriptions, icon: Mail, color: "bg-purple-500", trend: "+8%" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">System Analytics</h1>
                <p className="text-gray-500 font-medium pt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 group hover:scale-[1.02] transition-all cursor-default">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 ${card.color} text-white rounded-2xl shadow-lg ring-4 ring-white`}>
                                <card.icon size={25} />
                            </div>
                            <div className="flex items-center gap-1 text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs font-black">
                                <TrendingUp size={14} />
                                {card.trend}
                            </div>
                        </div>
                        <h3 className="text-gray-400 font-black text-xs uppercase tracking-widest mb-1">{card.title}</h3>
                        <div className="text-4xl font-black text-gray-900">{card.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100 border border-gray-100">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900">Activity Growth</h3>
                            <p className="text-gray-400 font-medium text-sm">Review engagement and new user signups</p>
                        </div>
                        <select className="bg-gray-50 border-none rounded-xl px-4 py-2 font-black text-xs uppercase tracking-widest outline-none ring-1 ring-gray-100">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontWeight: 600, fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontWeight: 600, fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 900 }}
                                />
                                <Area type="monotone" dataKey="reviews" stroke="#ea580c" strokeWidth={4} fillOpacity={1} fill="url(#colorReviews)" />
                                <Area type="monotone" dataKey="users" stroke="#000" strokeWidth={4} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gray-900 p-10 rounded-[3rem] shadow-2xl shadow-gray-200 text-white relative overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black mb-2">Popular Cities</h3>
                            <p className="text-gray-400 font-medium text-sm mb-8">Where are the most restaurants?</p>

                            <div className="space-y-6">
                                {[
                                    { city: "Mogadishu", val: 45, color: "bg-orange-500" },
                                    { city: "Hargeisa", val: 32, color: "bg-blue-500" },
                                    { city: "Garowe", val: 28, color: "bg-green-500" },
                                    { city: "Kismayo", val: 15, color: "bg-yellow-500" },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                                            <span>{item.city}</span>
                                            <span className="text-gray-400">{item.val}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                            <div className={`${item.color} h-full`} style={{ width: `${item.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-600 rounded-2xl shadow-lg">
                                    <Star size={20} fill="white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic leading-none">Top Rated</p>
                                    <p className="font-black text-lg">Blue Ocean Grill</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] -ml-32 -mb-32 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;