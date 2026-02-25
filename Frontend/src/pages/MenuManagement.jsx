import React, { useState, useEffect } from "react";
import api, { IMAGE_BASE_URL } from "../api/config";
import Swal from "sweetalert2";
import { Utensils, Plus, Trash2, Edit, Loader2, ImagePlus, Search, DollarSign, Tag } from "lucide-react";

function MenuManagement() {
    const [menuItems, setMenuItems] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        restaurantId: "",
        name: "",
        description: "",
        price: "",
        category: ""
    });
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [resMenu, resRest] = await Promise.all([
                api.get("/Menu"),
                api.get("/Resturant")
            ]);
            setMenuItems(resMenu.data);
            setRestaurants(resRest.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Hubi?",
            text: "Ma rabtaa in aad tirtirto cuntadan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Haa, Tirtir"
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/Menu/${id}`);
                setMenuItems(menuItems.filter(item => item._id !== id));
                Swal.fire("Success", "Cuntada waa la tirtiray", "success");
            } catch (err) {
                Swal.fire("Error", "Cilad ayaa dhacday", "error");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append("image", image);

        try {
            await api.post("/Menu", data);
            setShowModal(false);
            setFormData({ restaurantId: "", name: "", description: "", price: "", category: "" });
            setImage(null);
            fetchData();
            Swal.fire("Guul!", "Cunto cusub ayaa lagu daray", "success");
        } catch (err) {
            Swal.fire("Error", "Buuxi dhammaan meelaha banaan", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin text-orange-600 mx-auto" size={48} /></div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100">
                <div>
                    <h1 className="text-4xl font-black text-gray-900">Menu Management</h1>
                    <p className="text-gray-500 font-medium pt-1">Kudar ama maamul cuntooyinka makhaayadaha.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 hover:scale-105"
                >
                    <Plus size={24} /> Add Menu Item
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Item</th>
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Restaurant</th>
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Price</th>
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {menuItems.map((item) => (
                            <tr key={item._id} className="hover:bg-orange-50/20 transition-all group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <img src={IMAGE_BASE_URL + item.Image} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform" />
                                        <div>
                                            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">{item.name}</p>
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-black uppercase">{item.category}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="font-bold text-gray-600 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        {item.restaurantId?.name || "N/A"}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="font-black text-orange-600 text-lg">${item.price}</div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
                        <div className="p-10">
                            <h2 className="text-3xl font-black mb-8 text-gray-900">Add New Menu Item</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Restaurant</label>
                                    <select
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-bold appearance-none"
                                        value={formData.restaurantId}
                                        onChange={(e) => setFormData({ ...formData, restaurantId: e.target.value })}
                                    >
                                        <option value="">Select Restaurant</option>
                                        {restaurants.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Item Name</label>
                                        <input
                                            required
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-bold"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Price ($)</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-bold"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Category</label>
                                    <input
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-bold"
                                        placeholder="e.g. Pizza, Burger, Drink"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Description</label>
                                    <textarea
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-bold resize-none h-32"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Image</label>
                                    <input
                                        type="file"
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center justify-center"
                                    >
                                        {submitting ? <Loader2 className="animate-spin" /> : "Save Item"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuManagement;
