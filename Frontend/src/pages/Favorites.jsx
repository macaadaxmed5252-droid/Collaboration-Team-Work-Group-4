import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { IMAGE_BASE_URL } from "../api/config";
import { Heart, Star, MapPin, Loader2, Utensils, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await api.get(`/User/favorites/${user.id}`);
            setFavorites(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (e, restaurantId) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await api.post("/User/favorite", { userId: user.id, restaurantId });
            setFavorites(favorites.filter(f => f._id !== restaurantId));
            Swal.fire({
                title: "Waa la tirtiray!",
                text: "Makhaayadda waa laga saaray Favorites-kaaga.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        } catch (err) {
            Swal.fire("Error", "Cilad ayaa dhacday", "error");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={48} /></div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center px-6">
                <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-lg">
                    <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Heart size={40} className="fill-current" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Login Required</h2>
                    <p className="text-gray-500 font-medium mb-8">Fadlan marka hore soo gal nidaamka si aad u aragto makhaayadaha aad jeceshahay.</p>
                    <Link to="/login" className="inline-block bg-orange-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-100 hover:scale-105 transition-all">
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Your <span className="text-orange-600">Favorites</span></h1>
                    <p className="text-gray-500 font-medium mt-2">Makhaayadaha aad calaamadsatay inaad jeceshahay.</p>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favorites.map((r) => (
                            <Link
                                to={`/restaurant/${r._id}`}
                                key={r._id}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100 border border-gray-100 group relative"
                            >
                                <div className="relative h-64">
                                    <img
                                        src={IMAGE_BASE_URL + r.Image}
                                        alt={r.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <button
                                        onClick={(e) => removeFavorite(e, r._id)}
                                        className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
                                    >
                                        <Heart size={20} className="fill-white" />
                                    </button>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                            {r.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{r.name}</h3>
                                        <div className="flex items-center gap-1 font-black text-orange-600">
                                            <Star size={16} className="fill-orange-600" />
                                            {r.averageRating?.toFixed(1) || "0.0"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-6">
                                        <MapPin size={16} className="text-orange-500" />
                                        {r.location}, {r.city}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Utensils size={14} /> View Details
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-6 bg-white rounded-[3rem] shadow-xl border border-gray-100 max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={40} className="text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No Favorites Yet</h3>
                        <p className="text-gray-500 font-medium mb-8">Weliba ma haysid makhaayado aad calaamadsatay. Bilow hadda si aad u hesho kuwa ugu fiican!</p>
                        <Link to="/resturents" className="inline-block bg-orange-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-100 hover:scale-105 transition-all">
                            Browse Restaurants
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;
