import { useState } from "react"; 
import axios from "axios";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const Contact = () => {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/contuct", contact);
      alert("Message sent successfully!");
      setContact({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT SIDE – INFORMATION */}
        <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col justify-between border-l-8 border-orange-500">
          <div>
            <h2 className="text-4xl font-extrabold text-black mb-5">Contact Information</h2>
            <p className="text-gray-500 mb-10 text-base leading-relaxed">
              Have questions or need help? Reach out to us anytime — we are here 7 days a week.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin size={24} className="text-orange-500" />,
                  title: "Address",
                  text: "Mogadishu, Somalia",
                  link: null,
                },
                {
                  icon: <Phone size={24} className="text-orange-500" />,
                  title: "Call Us",
                  text: "+252 770895033",
                  link: "https://wa.me/252614395252",
                },
                {
                  icon: <Mail size={24} className="text-orange-500" />,
                  title: "Email Us",
                  text: "Mufakar2002@gmail.com",
                  link: "Mufakar2002@gmail.com",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="bg-orange-50 p-3 flex items-center justify-center rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 text-sm hover:text-orange-600 transition"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm">{item.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-black text-sm">Our Location</span>
              <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                Map
              </span>
            </div>
            <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11554.178230945108!2d45.3202!3d2.0469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58400e16b1b1fd%3A0x8f4db24d1c5fdbf0!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2sus!4v1708796800000!5m2!1sen!2sus"
                width="100%"
                height="220"
                className="rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-10 border-r-8 border-orange-500">
          <h2 className="text-4xl font-extrabold text-black mb-8">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-black mb-1">
                  {field === "name" ? "Full Name" : "Email Address"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field === "name" ? "Enter your name" : "email@example.com"}
                  value={contact[field]}
                  onChange={handlechange}
                  required
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition text-gray-700 placeholder:text-gray-400 rounded-lg shadow-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="How can we help you?"
                value={contact.message}
                onChange={handlechange}
                required
                className="w-full px-5 py-3 bg-gray-50 border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition text-gray-700 placeholder:text-gray-400 resize-none rounded-lg shadow-sm"
              ></textarea>
            </div>

            {success && (
              <p className={`text-sm font-medium ${success.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-5 bg-orange-600 hover:bg-orange-700 text-white py-3 mt-20 font-semibold tracking-wide shadow-md transition-all duration-300 active:scale-95 rounded-lg"
            >
              SEND MESSAGE <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;