import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/config";
import Swal from "sweetalert2";
import { User, Mail, Lock, ShieldPlus, Loader2, Camera, ArrowRight } from "lucide-react";

function AdminSignup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePicture") {
            const file = files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return Swal.fire("Cilad!", "Passwords-ka isku mid ma ahan!", "error");
        }

        setLoading(true);
        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("confirmPassword", formData.confirmPassword);
        if (image) data.append("profilePicture", image);

        try {
            await api.post("/Admin/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            Swal.fire({
                title: "Guul!",
                text: "Admin cusub ayaa si guul leh loogu diiwaangeliyay.",
                icon: "success",
                confirmButtonColor: "#ea580c"
            });
            navigate("/admin-login");
        } catch (err) {
            Swal.fire("Cilad!", err.response?.data?.message || "Diiwaangelinta waa ay fashilantay.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full -ml-48 -mt-48 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mb-48"></div>

            <div className="w-full max-w-xl relative z-10">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-100 p-10 md:p-12">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <ShieldPlus size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight tracking-tighter">Admin <span className="text-orange-600">Registration</span></h1>
                        <p className="text-gray-400 font-medium">Create a new administrative account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center group-hover:border-orange-500 transition-all">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="text-gray-300" size={32} />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name="profilePicture"
                                    onChange={handleChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <Camera size={16} />
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-3">Upload Profile Image</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Username</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="johndoe"
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="admin@localfood.com"
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-4 bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm shadow-xl shadow-orange-100 transition-all active:scale-95 disabled:bg-gray-400"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Register Admin <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-400 font-bold text-sm">
                        Horey ayaad u lahayd account? <Link to="/admin-login" className="text-orange-600 hover:underline">Halkan ka gal</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;
