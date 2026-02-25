import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Utensils, Users, Award, Clock, Heart, ShieldCheck, Globe, Zap } from "lucide-react";

function About() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6 bg-gray-50 overflow-hidden relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
                            Our Story
                        </span>
                        <h1 className="text-6xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                            Bringing the Best <br />
                            <span className="text-orange-600">Local Flavors</span> <br />
                            to Your Doorstep.
                        </h1>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl">
                            LocalFood was founded with a simple mission: to connect food lovers with the most authentic,
                            high-quality local restaurants in the city. We believe that great food brings people
                            together, and we're here to make that connection seamless.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-white rounded-[4rem] shadow-2xl shadow-gray-200 overflow-hidden border-[12px] border-white rotate-3">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
                                alt="Delicious food"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative floating card */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                                    <shieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-lg">100% Verified</p>
                                    <p className="text-xs font-bold text-gray-400">Quality Assured Restaurants</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Values */}
            <div className="py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">Why Choose LocalFood?</h2>
                    <p className="text-gray-400 font-medium max-w-2xl mx-auto">Waxaan ahayn kuwo ka duwan inta kale, waayo waxaan qiimaynaynaa tayada iyo raaxada macaamiisheena.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            title: "Tayada Cuntada",
                            desc: "Waxaan la shaqaynaa makhaayadaha ugu magaca dheer ee bixiya cuntada ugu macaan uguna tayada badan.",
                            icon: Utensils,
                            color: "bg-blue-500"
                        },
                        {
                            title: "Gaarsiin Degdeg ah",
                            desc: "Dalabkaaga wuxuu kugu soo gaarayaa waqti aad u gaaban, isagoo kulul oo diyaar ah.",
                            icon: Zap,
                            color: "bg-orange-500"
                        },
                        {
                            title: "Amman Buuxa",
                            desc: "Xogtaada iyo bixinta lacagtaadu waa mid si weyn loo ilaaliyo oo ammaan ah.",
                            icon: ShieldCheck,
                            color: "bg-green-500"
                        },
                        {
                            title: "Taageero 24/7",
                            desc: "Kooxdayada taageerada macaamiisha waxay diyaar u yihiin inay ku caawiyaan saacad kasta.",
                            icon: Clock,
                            color: "bg-purple-500"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all group">
                            <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-900 py-32 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
                    <div>
                        <div className="text-6xl font-black mb-2 text-orange-600 tracking-tighter">50+</div>
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Restaurants</p>
                    </div>
                    <div>
                        <div className="text-6xl font-black mb-2 tracking-tighter">10k+</div>
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Happy Customers</p>
                    </div>
                    <div>
                        <div className="text-6xl font-black mb-2 tracking-tighter">150+</div>
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Daily Deliveries</p>
                    </div>
                    <div>
                        <div className="text-6xl font-black mb-2 text-blue-500 tracking-tighter">4.9/5</div>
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">User Rating</p>
                    </div>
                </div>
                {/* Decorative background effects */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <Globe size={800} className="text-gray-400 -ml-[400px] -mt-[400px]" />
                </div>
            </div>

            {/* Our Vision */}
            <div className="py-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                <div className="flex-1 grid grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="h-64 bg-gray-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-10 bg-orange-600 rounded-3xl text-white">
                            <Heart size={40} className="mb-4" />
                            <h4 className="text-2xl font-black tracking-tight mb-2">Passion for Food</h4>
                            <p className="text-sm font-bold opacity-80">Waxaan jecelnahay cuntada macaan.</p>
                        </div>
                    </div>
                    <div className="space-y-6 pt-12">
                        <div className="p-10 bg-gray-900 rounded-3xl text-white">
                            <Users size={40} className="mb-4 text-orange-500" />
                            <h4 className="text-2xl font-black tracking-tight mb-2">Community First</h4>
                            <p className="text-sm font-bold opacity-80">Dadkeena ayaan u adeegnaa.</p>
                        </div>
                        <div className="h-64 bg-gray-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-5xl font-black text-gray-900 mb-8 tracking-tight uppercase leading-tight">
                        Our Vision for <br />the <span className="text-orange-600">Future</span>
                    </h3>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
                        LocalFood maahan kaliya meel cunto laga dalbado, waa nidaam isku xira koboca dhaqaalaha
                        yar-yar ee magaalada iyo baahida macaamiisha. Hiigsiigayagu waa inaan ballaarinno adeegga
                        inaan gaadhno gobollada dalka oo dhan, innagoo adeegsanayna tignoolajiyada ugu dambeysa.
                    </p>
                    <button className="flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 hover:scale-105 transition-all shadow-xl shadow-orange-100">
                        Join Our Journey <Award size={18} />
                    </button>
                </div>
            </div>

        
        </div>
    );
}

export default About;