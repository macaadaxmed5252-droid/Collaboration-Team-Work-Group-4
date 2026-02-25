import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { IMAGE_BASE_URL } from "../api/config";
import { Star, MapPin, Search, Filter, Loader2, Utensils, ArrowRight } from "lucide-react";

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const res = await api.get("/Resturant");
            setRestaurants(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ["All", "Fast Food", "Traditional", "Sea Food", "Bakery"];

    const filtered = restaurants.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "All" || r.category === category;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={48} /></div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Explore Restaurants</h1>
                        <p className="text-gray-500 font-medium">Find the best food in your city.</p>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scroll-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-6 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${category === cat
                                            ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                                            : "bg-white text-gray-500 hover:bg-orange-50"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((r) => (
                        <Link
                            to={`/restaurant/${r._id}`}
                            key={r._id}
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100 border border-gray-100 group hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="relative h-64">
                                <img
                                    src={IMAGE_BASE_URL + r.Image}
                                    alt={r.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 font-black text-sm shadow-sm ring-1 ring-black/5">
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                    {r.averageRating?.toFixed(1) || "0.0"}
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        {r.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{r.name}</h3>
                                <div className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-4">
                                    <MapPin size={16} className="text-orange-500" />
                                    {r.location}, {r.city}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Utensils size={14} /> View Menu
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 px-6 bg-white rounded-[3rem] shadow-xl shadow-gray-50 border border-gray-100">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Utensils size={40} className="text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400">No restaurants found</h3>
                        <p className="text-gray-300 font-medium">Try searching for something else or change the category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Restaurants;