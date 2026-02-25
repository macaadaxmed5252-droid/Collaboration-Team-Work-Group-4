import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/config";
import Swal from "sweetalert2";
import { Lock, Mail, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isConfirmed) {
            Swal.fire({
                title: "Xaqiijin Maamul",
                text: "Ma hubtaa inaad tahay maamulaha nidaamka?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Haa, waan ahay",
                cancelButtonText: "Maya",
                confirmButtonColor: "#ea580c"
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsConfirmed(true);
                }
            });
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/Admin/login", { email, password });

            // Store admin in localStorage
            localStorage.setItem("user", JSON.stringify(res.data));

            Swal.fire({
                title: "Soo dhawaaw!",
                text: `Mudane ${res.data.username}, nidaamka maamulka si guul leh ayaad u gashay.`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            navigate("/admin");
        } catch (err) {
            Swal.fire({
                title: "Cilad!",
                text: err.response?.data?.message || "Email ama Password waa khalad!",
                icon: "error",
                confirmButtonColor: "#ea580c"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -ml-48 -mb-48"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-100 p-10 md:p-12">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-200 rotate-3 hover:rotate-0 transition-transform duration-300">
                            <ShieldCheck size={40} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin <span className="text-orange-600">Portal</span></h1>
                        <p className="text-gray-400 font-medium mt-2">Fadlan geli macluumaadkaaga maamulka.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Admin Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@localfood.com"
                                    className="w-full pl-14 pr-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                            <input
                                type="checkbox"
                                id="confirm"
                                checked={isConfirmed}
                                onChange={(e) => setIsConfirmed(e.target.checked)}
                                className="w-5 h-5 accent-orange-600 rounded-lg cursor-pointer"
                            />
                            <label htmlFor="confirm" className="text-sm font-bold text-orange-800 cursor-pointer">
                                Waxaan xaqiijinayaa inaan ahay Maamule.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-4 bg-gray-900 hover:bg-black text-white py-6 rounded-2xl font-black tracking-widest uppercase text-sm shadow-xl shadow-gray-200 transition-all active:scale-95 disabled:bg-gray-400"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Access Dashboard <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center px-4">
                        <button
                            onClick={() => navigate("/")}
                            className="text-gray-400 hover:text-orange-600 text-sm font-black transition-colors"
                        >
                            ← Back to Website
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
