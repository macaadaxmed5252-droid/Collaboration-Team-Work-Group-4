import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Save, ArrowLeft, Upload, Utensils, MapPin, Tag, Info, Building2 } from 'lucide-react';

function EditRestaurant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [Update, setUpdate] = useState({
        name: "",
        description: "",
        location: "",
        city: "",
        category: "",
        Image: ""
    });

    useEffect(() => {
        const getSingleResturent = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/Resturant/${id}`);
                const data = res.data.data || res.data;
                setUpdate({
                    name: data.name,
                    description: data.description,
                    location: data.location,
                    city: data.city,
                    category: data.category,
                    Image: data.Image
                });
                if (data.Image) {
                    setPreview(`http://localhost:3000/Images/${data.Image}`);
                }
            } catch (err) {
                console.log("Error fetching restaurant", err);
            }
        };
        getSingleResturent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "Image") {
            const file = files[0];
            setUpdate({ ...Update, Image: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setUpdate({ ...Update, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", Update.name);
        formData.append("description", Update.description);
        formData.append("location", Update.location);
        formData.append("city", Update.city);
        formData.append("category", Update.category);
        formData.append("Image", Update.Image);

        try {
            await axios.put(`http://localhost:3000/Resturant/${id}`, formData);
            
            Swal.fire({
                title: 'Waa la guulaystay!',
                text: 'Xogta makhaayadda waa la cusboonaysiiyay.',
                icon: 'success',
                confirmButtonColor: '#f97316',
            });

            navigate("/admin/manage-restaurant"); // ✅ SAXID: Route-ka saxda ah
        } catch (err) {
            Swal.fire('Cilad!', 'Ma suurtagalin in xogta la beddelo.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Area */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-bold mb-2"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Edit Restaurant</h1>
                        <p className="text-gray-500 font-medium">Beddel macluumaadka makhaayadda si aad u cusboonaysiiso.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Side: Image Upload */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 sticky top-8">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Restaurant Image</label>
                            <div className="relative group cursor-pointer">
                                <div className="aspect-square rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 group-hover:border-orange-400 transition-all relative bg-gray-50">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                            <Upload size={40} strokeWidth={1} />
                                            <span className="text-xs font-bold mt-2">Upload Image</span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        name="Image" 
                                        onChange={handleChange} 
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400 leading-relaxed text-center font-medium">
                                Isticmaal sawir tayo leh (PNG, JPG) si makhaayaddaadu u muuqato mid soo jiidasho leh.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Form Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="space-y-2 col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-tighter">
                                        <Utensils size={16} className="text-orange-500" /> Restaurant Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={Update.name} 
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 transition-all font-bold text-gray-900"
                                        placeholder="Tusaale: C plus"
                                        required
                                    />
                                </div>

                                {/* Category Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-tighter">
                                        <Tag size={16} className="text-blue-500" /> Category
                                    </label>
                                    <input 
                                        type="text" 
                                        name="category" 
                                        value={Update.category} 
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-gray-900"
                                        placeholder="Fast Food"
                                    />
                                </div>

                                {/* City Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-tighter">
                                        <Building2 size={16} className="text-purple-500" /> City
                                    </label>
                                    <input 
                                        type="text" 
                                        name="city" 
                                        value={Update.city} 
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500/20 transition-all font-bold text-gray-900"
                                        placeholder="Mogadishu"
                                    />
                                </div>

                                {/* Location Input */}
                                <div className="space-y-2 col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-tighter">
                                        <MapPin size={16} className="text-red-500" /> Exact Location
                                    </label>
                                    <input 
                                        type="text" 
                                        name="location" 
                                        value={Update.location} 
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 transition-all font-bold text-gray-900"
                                        placeholder="Maka al Mukarama"
                                    />
                                </div>

                                {/* Description Input */}
                                <div className="space-y-2 col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-tighter">
                                        <Info size={16} className="text-green-500" /> Description
                                    </label>
                                    <textarea 
                                        rows="4"
                                        name="description" 
                                        value={Update.description} 
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500/20 transition-all font-bold text-gray-900 resize-none"
                                        placeholder="Ka sheekee makhaayaddaada..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white p-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Cusboonaysiin..." : <><Save size={24} /> Update Restaurant Details</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditRestaurant;