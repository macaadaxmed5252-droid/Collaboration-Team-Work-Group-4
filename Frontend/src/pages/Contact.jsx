import React, { useState } from "react";
import api from "../api/config";
import Swal from "sweetalert2";
import { MapPin, Phone, Mail, Send, MessageCircle, Map as MapIcon, Loader2 } from "lucide-react";

const Contact = () => {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/Contact", contact);
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent, thank you!",
        icon: "success",
        confirmButtonColor: "#ea580c"
      });
      setContact({ name: "", email: "", message: "" });
    } catch (err) {
      Swal.fire("Error!", "Something went wrong while sending your message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Contact <span className="text-orange-600">Us</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Get in touch with us for any questions or feedback. We are here to help you as quickly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 hover:border-orange-200 transition-all flex items-center gap-6 group">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Location</h4>
                <p className="font-bold text-gray-600">Mogadishu, Somalia</p>
              </div>
            </div>

            <a href="tel:+252615009890" className="block outline-none">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 hover:border-blue-200 transition-all flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Phone</h4>
                  <p className="font-bold text-gray-600">+252 615009890</p>
                </div>
              </div>
            </a>

            <a href="mailto:julia87@gmail.com" className="block">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 hover:border-green-200 transition-all flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Email</h4>
                  <p className="font-bold text-gray-600">julia87@gmail.com</p>
                </div>
              </div>
            </a>

            <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <MapIcon className="text-orange-500" /> Our Location
                </h4>
                <div className="h-40 bg-white/5 rounded-2xl border border-white/10 overflow-hidden mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127595.31823758151!2d45.241570743359375!3d2.034874000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d5842595579fa03%3A0x3c3013ba09e1e35a!2sMogadishu!5e0!3m2!1sen!2sso!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
                <button className="w-full py-4 bg-orange-600 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 transition-all">
                  Open in Google Maps
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-orange-600/40 transition-all"></div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100 border border-gray-100 h-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gray-50 rounded-2xl">
                   <MessageCircle size={32} className="text-gray-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Send Us a Message</h2>
                  <p className="text-gray-400 font-medium">We will respond to you within 24 hours.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={contact.name}
                      onChange={handleChange}
                      required
                      className="w-full px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      value={contact.email}
                      onChange={handleChange}
                      required
                      className="w-full px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Your Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="How can we help you?"
                    value={contact.message}
                    onChange={handleChange}
                    required
                    className="w-full px-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-900 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-4 bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-[2rem] font-black tracking-widest uppercase text-sm shadow-xl shadow-orange-100 transition-all active:scale-95 disabled:bg-gray-400"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={20} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;