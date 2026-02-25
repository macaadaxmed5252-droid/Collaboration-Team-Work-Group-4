import React, { useState } from "react";
import api from "../api/config";
import Swal from "sweetalert2";
import { Utensils, MapPin, Building2, Tag, AlignLeft, ImagePlus, Loader2 } from "lucide-react";

function CreateRestaurant() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        city: "",
        category: ""
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            return Swal.fire("Error", "Fadlan sawirka soo geli", "error");
        }

        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("location", formData.location);
        data.append("city", formData.city);
        data.append("category", formData.category);
        data.append("Image", image);

        try {
            const response = await api.post("/Resturant", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.status === 201) {
                Swal.fire({
                    title: "Guul!",
                    text: "Makhaayadda si guul leh ayaa loo abuuray",
                    icon: "success",
                    confirmButtonColor: "#ea580c"
                });
                setFormData({ name: "", description: "", location: "", city: "", category: "" });
                setImage(null);
                e.target.reset();
            }
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Cilad ayaa dhacday", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-gray-100 overflow-hidden border border-gray-100">
            <div className="bg-orange-600 p-8 text-white">
                <h2 className="text-3xl font-black flex items-center gap-3">
                    <Utensils size={32} /> Add New Restaurant
                </h2>
                <p className="text-orange-100 mt-2 font-medium">Buuxi xogta si aad u diiwaangeliso makhaayad cusub.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Utensils size={18} className="text-orange-500" /> Restaurant Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Blue Ocean"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Tag size={18} className="text-orange-500" /> Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium appearance-none"
                    >
                        <option value="">Select Category</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Sea Food">Sea Food</option>
                        <option value="Bakery">Bakery</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <MapPin size={18} className="text-orange-500" /> Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Maka Al Mukarama Street"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Building2 size={18} className="text-orange-500" /> City
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Mogadishu"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <AlignLeft size={18} className="text-orange-500" /> Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Write something about the restaurant..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium resize-none"
                    ></textarea>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <ImagePlus size={18} className="text-orange-500" /> Restaurant Image
                    </label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:bg-orange-50/50 hover:border-orange-300 transition-all text-center cursor-pointer group">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-full group-hover:scale-110 transition-transform">
                                <ImagePlus size={28} />
                            </div>
                            <p className="text-gray-600 font-semibold">
                                {image ? image.name : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-gray-400 font-medium italic">PNG, JPG, WebP (Max 5MB)</p>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200 disabled:bg-gray-400"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Save Restaurant"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateRestaurant;