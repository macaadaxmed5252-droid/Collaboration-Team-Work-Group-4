import React, { useState, useEffect } from "react";
import api, { IMAGE_BASE_URL } from "../api/config";
import Swal from "sweetalert2";
import { User, Mail, Phone, MapPin, Camera, Save, Loader2, Heart } from "lucide-react";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (currentUser) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get(`/User`); // We'll filter by ID in a real app, for now let's find the current user
            const user = res.data.users.find(u => u._id === currentUser.id);
            setUserData(user);
            if (user.profilePicture) {
                setPreview(IMAGE_BASE_URL + user.profilePicture);
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
        data.append("fullName", userData.fullName);
        data.append("phone", userData.phone);
        data.append("city", userData.city);
        if (image) data.append("profilePicture", image);

        try {
            const res = await api.put(`/User/update/${currentUser.id}`, data);
            localStorage.setItem("user", JSON.stringify({ ...currentUser, ...res.data.user, id: res.data.user._id }));
            Swal.fire("Guul!", "Profile-kaaga waa la cusbeysiiyay", "success");
        } catch (err) {
            Swal.fire("Error", "Cilad ayaa dhacday", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={48} /></div>;

    return (
        <div className="max-w-4xl mx-auto p-6 pt-24">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-orange-600 h-32 relative">
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative group">
                            <img
                                src={preview || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg shadow-gray-200"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-3xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                <Camera size={24} />
                                <input type="file" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-20 p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900">{userData?.fullName}</h1>
                            <p className="text-gray-500 font-medium">@{userData?.username}</p>
                        </div>
                        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-bold text-sm uppercase">
                            {userData?.role}
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                value={userData?.fullName}
                                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={userData?.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Email (Cannot change)</label>
                            <input
                                type="email"
                                value={userData?.email}
                                disabled
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl font-medium text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">City</label>
                            <input
                                type="text"
                                value={userData?.city}
                                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-medium"
                            />
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95 disabled:bg-gray-400"
                            >
                                {saving ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
