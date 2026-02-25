import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api, { IMAGE_BASE_URL } from "../api/config";
import Swal from "sweetalert2";
import { Star, MapPin, Clock, Utensils, Send, Loader2, Heart, Trash2 } from "lucide-react";

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [isFavorite, setIsFavorite] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchData();
        if (user) checkFavorite();
    }, [id]);

    const fetchData = async () => {
        try {
            const [resRest, resMenu, resReviews] = await Promise.all([
                api.get(`/Resturant/${id}`),
                api.get(`/Menu/restaurant/${id}`),
                api.get(`/Review/${id}`)
            ]);
            setRestaurant(resRest.data);
            setMenu(resMenu.data);
            setReviews(resReviews.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const checkFavorite = async () => {
        try {
            const res = await api.get(`/User/favorites/${user.id}`);
            const found = res.data.some(f => f._id === id);
            setIsFavorite(found);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleFavorite = async () => {
        if (!user) return Swal.fire("Login Required", "Fadlan marka hore soo gal nidaamka si aad u calaamadsato (favorite) makhaayadaha!", "warning");
        try {
            const res = await api.post("/User/favorite", { userId: user.id, restaurantId: id });
            setIsFavorite(!isFavorite);
            Swal.fire({
                title: res.data.message,
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        if (!user) return Swal.fire("Login Required", "Fadlan marka hore soo gal nidaamka si aad u rate-gareyso makhaayadaha!", "warning");
        try {
            await api.post("/Review", { restaurantId: id, userId: user.id, rating, comment });
            setComment("");
            fetchData();
            Swal.fire("Success", "Review-gaaga waa la diray", "success");
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Cilad ayaa dhacday", "error");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={48} /></div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <div className="relative h-[400px] overflow-hidden">
                <img
                    src={IMAGE_BASE_URL + restaurant?.Image}
                    alt={restaurant?.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto flex justify-between items-end">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-orange-600 rounded-full text-xs font-black uppercase tracking-wider">
                                {restaurant?.category}
                            </span>
                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                {restaurant?.averageRating?.toFixed(1) || "0.0"}
                            </div>
                        </div>
                        <h1 className="text-5xl font-black mb-2">{restaurant?.name}</h1>
                        <div className="flex items-center gap-4 text-gray-200 font-medium">
                            <div className="flex items-center gap-1"><MapPin size={18} /> {restaurant?.location}, {restaurant?.city}</div>
                            <div className="flex items-center gap-1"><Clock size={18} /> {restaurant?.openingHours}</div>
                        </div>
                    </div>
                    <button
                        onClick={toggleFavorite}
                        className={`p-4 rounded-2xl transition-all shadow-xl ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-900 overflow-hidden'}`}
                    >
                        <Heart size={28} className={isFavorite ? 'fill-white' : ''} />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Left: Menu */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
                        <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                            <Utensils className="text-orange-600" /> Menu Items
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {menu.map((item) => (
                                <div key={item._id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
                                    <img
                                        src={IMAGE_BASE_URL + item.Image}
                                        className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-black text-gray-900 group-hover:text-orange-600">{item.name}</h3>
                                            <span className="font-black text-orange-600">${item.price}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1 font-medium">{item.description}</p>
                                        <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold uppercase">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {menu.length === 0 && <p className="text-gray-400 font-medium col-span-2">No menu items available yet.</p>}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
                        <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                            <Star className="text-orange-600" /> Customer Reviews
                        </h2>
                        <div className="space-y-6">
                            {reviews.map((rev) => (
                                <div key={rev._id} className="p-6 rounded-2xl bg-gray-50/50 border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-black">
                                                {rev.userId?.fullName?.charAt(0) || "U"}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900">{rev.userId?.fullName}</h4>
                                                <div className="flex gap-0.5 mt-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {new Date(rev.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 font-medium italic leading-relaxed">"{rev.comment}"</p>
                                </div>
                            ))}
                            {reviews.length === 0 && <p className="text-gray-400 font-medium">Be the first to review this restaurant!</p>}
                        </div>
                    </div>
                </div>

                {/* Right: Info & Add Review */}
                <div className="space-y-8">
                    {/* Add Review */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 sticky top-24">
                        <h3 className="text-2xl font-black mb-4">Add Your Review</h3>
                        <form onSubmit={handleReview} className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setRating(s)}
                                            className={`p-2 rounded-xl transition-all ${rating >= s ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            <Star size={24} className={rating >= s ? 'fill-yellow-400' : ''} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us about your experience..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none min-h-[120px] font-medium resize-none"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                            >
                                <Send size={20} /> Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetails;
