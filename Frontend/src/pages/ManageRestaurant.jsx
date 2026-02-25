import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Edit3, Trash2, MapPin, Tag, Utensils, Plus, Loader2, MoreHorizontal } from 'lucide-react';
import api, { IMAGE_BASE_URL } from '../api/config';

function ManageRestaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const GetAllResturents = async () => {
        try {
            const res = await api.get("/Resturant");
            setRestaurants(res.data);
        } catch (err) {
            console.log("Error fetching restaurants", err);
        } finally {
            setLoading(false);
        }
    }

    const deleteRestaurant = async (id) => {
        Swal.fire({
            title: 'Ma hubtaa?',
            text: "Xogtan dib looma soo celin karo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Haye, tirtir!',
            cancelButtonText: 'Iska dhaaf'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/Resturant/${id}`);
                    setRestaurants(restaurants.filter(r => r._id !== id));
                    Swal.fire('La tirtiray!', 'Makhaayadda waa la saaray.', 'success');
                } catch (err) {
                    Swal.fire('Cilad!', 'Ma suurtagalin in la tirtiro.', 'error');
                }
            }
        });
    }

    useEffect(() => {
        GetAllResturents();
    }, []);

    return (
        <div className="p-6 bg-gray-50/50 min-h-screen">
            {/* Upper Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Restaurant Fleet</h1>
                    <p className="text-gray-500 font-medium">Maamul dhammaan makhaayadahaaga hal meel.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/create-restaurant')}
                    className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
                >
                    <Plus size={20} /> Add New Entry
                </button>
            </div>

            {/* Modern Table Container */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-gray-400 text-sm uppercase tracking-widest">
                                <th className="px-6 py-5 font-black text-left">Info</th>
                                <th className="px-6 py-5 font-black text-left">Category</th>
                                <th className="px-6 py-5 font-black text-left">Location</th>
                                <th className="px-6 py-5 font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-orange-600" size={40} />
                                    </td>
                                </tr>
                            ) : restaurants.map((rest) => (
                                <tr key={rest._id} className="group bg-white hover:bg-orange-50/30 transition-all duration-300">
                                    {/* Info Column */}
                                    <td className="px-6 py-4 first:rounded-l-2xl border-y border-l border-gray-50 group-hover:border-orange-100">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-14 h-14 shrink-0">
                                                <img
                                                    src={rest.Image ? `${IMAGE_BASE_URL}${rest.Image}` : "https://via.placeholder.com/100"}
                                                    className="w-full h-full object-cover rounded-2xl shadow-sm border border-gray-100"
                                                    alt={rest.name}
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg leading-none mb-1">{rest.name}</p>
                                                <p className="text-sm text-gray-400 font-medium truncate max-w-[180px]">{rest.description}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category Column */}
                                    <td className="px-6 py-4 border-y border-gray-50 group-hover:border-orange-100">
                                        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-tighter">
                                            {rest.category}
                                        </span>
                                    </td>

                                    {/* Location Column */}
                                    <td className="px-6 py-4 border-y border-gray-50 group-hover:border-orange-100">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-bold text-sm">{rest.city}</span>
                                            <span className="text-gray-400 text-xs flex items-center gap-1">
                                                <MapPin size={12} /> {rest.location}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-6 py-4 last:rounded-r-2xl border-y border-r border-gray-50 group-hover:border-orange-100 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => navigate(`/admin/edit-restaurant/${rest._id}`)}
                                                className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteRestaurant(rest._id)}
                                                className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageRestaurant;