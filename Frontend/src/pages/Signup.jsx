import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/config";
import Swal from "sweetalert2";
import { UserPlus, Mail, Lock, User, Phone, ImagePlus, Loader2, ArrowRight } from "lucide-react";

function Signup() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return Swal.fire("Error", "Passwords-ka isku mid ma ahan!", "error");
        }
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append("profilePicture", image);

        try {
            await api.post("/User/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            Swal.fire({
                title: "Guul!",
                text: "Account-gaaga waa la abuuray",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            navigate("/login");
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Diiwaangelintu way fashilantay", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 pt-20">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl shadow-gray-200 overflow-hidden border border-gray-100">
                <div className="bg-orange-600 p-8 text-white text-center">
                    <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="text-3xl font-black">Create Account</h2>
                    <p className="text-orange-100 mt-2 font-medium">Ku soo biir qoyskayaga maanta!</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <User size={18} className="text-orange-500" /> Full Name
                        </label>
                        <input
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <User size={18} className="text-orange-500" /> Username
                        </label>
                        <input
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Mail size={18} className="text-orange-500" /> Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Phone size={18} className="text-orange-500" /> Phone Number
                        </label>
                        <input
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Lock size={18} className="text-orange-500" /> Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Lock size={18} className="text-orange-500" /> Confirm Password
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <ImagePlus size={18} className="text-orange-500" /> Profile Picture
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                        />
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200 disabled:bg-gray-400"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Sign Up <ArrowRight size={20} /></>}
                        </button>
                    </div>

                    <p className="md:col-span-2 text-center text-gray-600 font-medium pt-2">
                        Horey miyad u lahayd account?{" "}
                        <Link to="/login" className="text-orange-600 hover:underline font-bold">Login halkan</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
