import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/config";
import Swal from "sweetalert2";
import { LogIn, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/User/login", { email, password });
            localStorage.setItem("user", JSON.stringify(res.data));
            Swal.fire({
                title: "Welcome Back!",
                text: "Login successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Login failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-gray-200 overflow-hidden border border-gray-100">
                <div className="bg-orange-600 p-8 text-white text-center">
                    <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-3xl font-black">Login</h2>
                    <p className="text-orange-100 mt-2 font-medium">Ku soo dhawaaw mar kale!</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Mail size={18} className="text-orange-500" /> Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tusaale@gmail.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Lock size={18} className="text-orange-500" /> Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200 disabled:bg-gray-400"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Login <ArrowRight size={20} /></>}
                    </button>

                    <p className="text-center text-gray-600 font-medium pt-4">
                        Ma haysatid account?{" "}
                        <Link to="/signup" className="text-orange-600 hover:underline font-bold">Sign Up halkan</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
