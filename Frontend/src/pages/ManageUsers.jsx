import React, { useState, useEffect } from "react";
import api, { IMAGE_BASE_URL } from "../api/config";
import Swal from "sweetalert2";
import { User, Mail, Trash2, Shield, Loader2, Search } from "lucide-react";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/User");
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "User-kan mar dambe lama soo celin karo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Haa, Tirtir!"
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/User/delete/${id}`);
                setUsers(users.filter(u => u._id !== id));
                Swal.fire("Tirtiray!", "User-ka waa la tirtiray.", "success");
            } catch (err) {
                Swal.fire("Error", "Cilad ayaa dhacday", "error");
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin text-orange-600 mx-auto" size={48} /></div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Manage Users</h1>
                    <p className="text-gray-500 font-medium pt-1">Maamul dadka iska diiwaangeliyay nidaamka.</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium min-w-[300px] shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">User</th>
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Email</th>
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Role</th>
                            <th className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((u) => (
                            <tr key={u._id} className="hover:bg-orange-50/30 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={u.profilePicture ? IMAGE_BASE_URL + u.profilePicture : "https://via.placeholder.com/40"}
                                                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white group-hover:ring-orange-200 transition-all shadow-md"
                                            />
                                            {u.role === 'admin' && (
                                                <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-lg shadow-sm ring-2 ring-white">
                                                    <Shield size={10} fill="currentColor" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">{u.fullName}</p>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">@{u.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                                        <Mail size={16} />
                                        {u.email}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${u.role === 'admin' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(u._id)}
                                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <User size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black text-xl">No users found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageUsers;
