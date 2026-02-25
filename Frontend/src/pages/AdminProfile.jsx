import React, { useState, useEffect } from "react";
import api, { IMAGE_BASE_URL } from "../api/config";
import Swal from "sweetalert2";
import { User, Mail, Camera, Save, Loader2, ShieldCheck, AtSign, CheckCircle2 } from "lucide-react";

function AdminProfile() {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const currentAdmin = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (currentAdmin) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get(`/Admin`);
            const admin = res.data.admins.find(a => a._id === currentAdmin.id);
            setAdminData(admin);
            if (admin.profilePicture) {
                setPreview(IMAGE_BASE_URL + admin.profilePicture);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = new FormData();
        data.append("username", adminData.username);
        data.append("email", adminData.email);
        if (image) data.append("profilePicture", image);

        try {
            const res = await api.put(`/Admin/update/${currentAdmin.id}`, data);

            // Sync local storage with new data
            const updatedAdmin = {
                ...currentAdmin,
                username: res.data.admin.username,
                email: res.data.admin.email,
                profilePicture: res.data.admin.profilePicture
            };
            localStorage.setItem("user", JSON.stringify(updatedAdmin));

            Swal.fire("Success!", "Super Admin profile updated.", "success");
        } catch (err) {
            Swal.fire("Error", "Cilad ayaa dhacday", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={48} /></div>;

    return (
        <div className="max-w-4xl mx-auto p-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-100 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 h-48 relative">
                    <div className="absolute -bottom-16 left-12 flex items-end gap-6">
                        <div className="relative group">
                            <img
                                src={preview || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-40 h-40 rounded-[2.5rem] object-cover border-8 border-white shadow-2xl"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-[2.5rem] opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm">
                                <Camera size={28} />
                                <input type="file" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <h1 className="text-3xl font-black text-white drop-shadow-md">Super Admin Settings</h1>
                            <div className="flex items-center gap-2 text-gray-300 font-bold">
                                <ShieldCheck size={18} className="text-orange-500" />
                                <span>Master Configuration</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-24 p-12">
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <AtSign size={16} className="text-orange-500" /> Username
                            </label>
                            <input
                                type="text"
                                value={adminData?.username}
                                onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none font-bold text-gray-900 transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Mail size={16} className="text-orange-500" /> Administrative Email
                            </label>
                            <input
                                type="email"
                                value={adminData?.email}
                                onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none font-bold text-gray-900 transition-all"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-3">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={16} className="text-orange-500" /> Account Privilege
                            </label>
                            <div className="w-full px-6 py-4 bg-orange-50 border border-orange-100 rounded-2xl font-black text-orange-600 flex justify-between items-center capitalize">
                                <span>{adminData?.role} Level Access</span>
                                <CheckCircle2 size={24} />
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-3 px-12 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-gray-200 active:scale-95 disabled:bg-gray-400"
                            >
                                {saving ? <Loader2 className="animate-spin" /> : <><Save size={24} /> Commit Changes</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
