import React, { useState } from "react";
import { UtensilsCrossed, Facebook, Instagram, Twitter, Mail, Loader2, Send } from 'lucide-react';
import api from "../api/config";
import Swal from "sweetalert2";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post("/Subscription", { email });
      Swal.fire({
        title: "Guul!",
        text: "Waad ku mahadsantahay is diiwaangelintaada!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
      setEmail("");
    } catch (err) {
      Swal.fire("Cilad!", err.response?.data?.message || "Cilad ayaa dhacday", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0f0f14] text-gray-300 mt-20">
      <div className="text-center py-14 px-6 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Get the <span className="text-orange-500">Latest Flavors</span>
        </h2>
        <p className="text-gray-400 mt-3 text-sm font-medium">
          Sign up to receive discounts and updates on new restaurants.
        </p>

        <form onSubmit={handleSubscribe} className="mt-8 flex justify-center max-w-md mx-auto">
          <div className="relative w-full flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="px-5 py-4 w-full bg-gray-900 border border-gray-800 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition-all"
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-r-2xl text-white text-sm font-black transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:bg-gray-700"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Subscribe"}
            </button>
          </div>
        </form>
      </div>

      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 py-16 px-6 text-sm">

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-xl">
              <UtensilsCrossed className="text-white" size={24} />
            </div>
            <h3 className="text-white text-2xl font-black tracking-tighter">
              Local<span className="text-orange-500">Food</span>
            </h3>
          </div>
          <p className="text-gray-400 leading-relaxed font-medium">
            Bringing you the authentic flavors of your community. Order quality food from the comfort of your home.
          </p>

       
          <div className="flex gap-4 pt-2">
            <a href="https://facebook.com/kingMaalid" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com/king_maalid" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com/king_maalid" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="mailto:macaadaxmed5252@gmail.com" className="hover:text-orange-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6 border-l-4 border-orange-500 pl-3">Explore</h4>
          <ul className="space-y-3 font-medium">
            <li><a href="/resturents" className="hover:text-orange-500 transition-colors">Browse Restaurants</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Popular Foods</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Special Offers</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Discounts</a></li>
          </ul>
        </div>

    
        <div>
          <h4 className="text-white font-bold text-base mb-6 border-l-4 border-orange-500 pl-3">Support</h4>
          <ul className="space-y-3 font-medium">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Payment Methods</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Info</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6 border-l-4 border-orange-500 pl-3">Company</h4>
          <ul className="space-y-3 font-medium">
            <li><a href="/about" className="hover:text-orange-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Become a Partner</a></li>
            <li><a href="/contact" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
            <li><a href="/resturents" className="hover:text-orange-500 transition-colors">Resturent</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800/50 bg-[#0a0a0e] text-center py-8 text-xs text-gray-500 font-medium">
        <p>© 2026 <span className="text-gray-400 font-bold">LocalFood</span>. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;