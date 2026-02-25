import { useState } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/contact", contact);
      setSuccess("Message sent successfully!");
      setContact({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSuccess("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-200"></div>

          {/* LEFT SIDE – INFORMATION & MAP */}
          <div className="pr-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-3">Information</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              For any questions or help, feel free to reach out. We are available 7 days a week.
            </p>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="bg-red-100 p-4 rounded-2xl"><MapPin className="text-red-500" /></div>
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <p className="text-gray-500">Mogadishu, Somalia</p>
                </div>
              </div>

              {/* WhatsApp Link */}
              <a 
                href="https://wa.me/252770895033" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-5 group"
              >
                <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-200 transition">
                  <Phone className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">WhatsApp</h4>
                  <p className="text-gray-500 group-hover:text-red-600 transition">+252 770895033</p>
                </div>
              </a>

              {/* Gmail Link */}
              <a 
                href="mailto:Mufakar2002@gmail.com" 
                className="flex items-start gap-5 group"
              >
                <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-200 transition">
                  <Mail className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-500 group-hover:text-red-600 transition">Mufakar2002@gmail.com</p>
                </div>
              </a>
            </div>

            {/* MAP SECTION */}
            <div className="mt-10 rounded-2xl overflow-hidden shadow-md">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127595.04834863336!2d45.2443657!3d2.0469343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58425955099395%3A0x6336338e55e5b38a!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2s!4v1710000000000"
                className="w-full h-64 border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* RIGHT SIDE – FORM */}
          <div className="pl-0 md:pl-12">
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={contact.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={contact.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="How can we help you?"
                value={contact.message}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition"
              ></textarea>

              {success && (
                <p className={`font-medium ${success.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;