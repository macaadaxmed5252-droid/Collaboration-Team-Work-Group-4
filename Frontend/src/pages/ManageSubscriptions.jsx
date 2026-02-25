import React, { useState, useEffect } from "react";
import api from "../api/config";
import Swal from "sweetalert2";
import { Mail, Trash2, Loader2, Calendar, User, Search } from "lucide-react";

function ManageSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const res = await api.get("/Subscription");
            setSubscriptions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Ma rabtaa inaad tirtirto subscription-kan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Haa, Tirtir"
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/Subscription/${id}`);
                setSubscriptions(subscriptions.filter(s => s._id !== id));
                Swal.fire("Deleted!", "Subscription-ka waa la tirtiray.", "success");
            } catch (err) {
                Swal.fire("Error", "Cilad ayaa dhacday", "error");
            }
        }
    };

    const filtered = subscriptions.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="animate-spin text-orange-600" size={48} />
        </div>
    );

    return (
        <div className="space-y-8 p-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Newsletter Subscriptions</h1>
                    <p className="text-gray-500 font-medium pt-1">Maamul dadka isku diwaangeliyay helitaanka wararka cusub.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Subscriber Email</th>
                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Subscribed Date</th>
                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filtered.map((sub) => (
                            <tr key={sub._id} className="hover:bg-orange-50/10 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                            <Mail size={18} />
                                        </div>
                                        <span className="font-bold text-gray-900">{sub.email}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-gray-500 font-bold">
                                        <Calendar size={16} className="text-gray-400" />
                                        {new Date(sub.subscribedAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(sub._id)}
                                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="3" className="px-8 py-20 text-center text-gray-400 font-black">
                                    Subscription-ka lama helin
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageSubscriptions;
