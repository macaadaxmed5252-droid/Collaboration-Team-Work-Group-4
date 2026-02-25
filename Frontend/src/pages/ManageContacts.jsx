import React, { useState, useEffect } from "react";
import api from "../api/config";
import Swal from "sweetalert2";
import { Mail, Trash2, Eye, Loader2, User, Clock, MessageSquare, Search, X } from "lucide-react";

function ManageContacts() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await api.get("/Contact");
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Hubi?",
            text: "Ma rabtaa inaad tirtirto fariintan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Haa, Tirtir",
            cancelButtonText: "Iska dhaaf"
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/Contact/${id}`);
                setMessages(messages.filter(m => m._id !== id));
                Swal.fire("Tirtiray!", "Fariinta waa la tirtiray.", "success");
            } catch (err) {
                Swal.fire("Error", "Cilad ayaa dhacday", "error");
            }
        }
    };

    const openMessage = (msg) => {
        setSelectedMessage(msg);
        setShowModal(true);
    };

    const filtered = messages.filter(m =>
        (m.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.message || "").toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Contact Messages</h1>
                    <p className="text-gray-500 font-medium pt-1">Kormeer oo maamul fariimaha ka imaanaya macaamiisha.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((msg) => (
                    <div key={msg._id} className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 hover:border-orange-200 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black text-xl">
                                    {msg.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 leading-none">{msg.name}</h3>
                                    <p className="text-xs text-gray-400 font-bold mt-1 truncate max-w-[150px]">{msg.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openMessage(msg)}
                                    className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-500 font-medium text-sm line-clamp-3 italic">
                                "{msg.message}"
                            </p>
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-50 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                <Clock size={12} />
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Recently"}
                            </div>
                        </div>

                        {/* Status tag */}
                        <div className="absolute top-0 right-0 p-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="bg-white p-20 rounded-[3rem] text-center shadow-xl shadow-gray-50 border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare size={32} className="text-gray-200" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-400">No messages found</h3>
                    <p className="text-gray-300 font-medium">Fariimo cusub wali lama helin.</p>
                </div>
            )}

            {/* Message Detail Modal */}
            {showModal && selectedMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
                        <div className="bg-orange-600 p-10 text-white relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                            >
                                <X size={24} />
                            </button>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center font-black text-4xl">
                                    {selectedMessage.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black">{selectedMessage.name}</h2>
                                    <p className="font-bold text-orange-100 flex items-center gap-2">
                                        <Mail size={16} /> {selectedMessage.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <MessageSquare size={14} className="text-orange-500" /> Full Fariin
                                </h4>
                                <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                                    <p className="text-gray-700 font-medium leading-relaxed italic text-lg">
                                        "{selectedMessage.message}"
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                                    <Clock size={14} /> Received: {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : "Just now"}
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black hover:bg-orange-600 transition-all shadow-lg"
                                >
                                    Close Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageContacts;
