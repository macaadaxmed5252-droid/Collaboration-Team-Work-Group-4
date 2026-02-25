import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import axios from "axios";

function Hero() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await axios.get("http://localhost:3000/Resturant/");
                const data = res.data;
                const cities = [...new Set(data.map((item) => item.location))];
                setLocations(cities);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl px-6 text-center">

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                    Discover Food <span className="text-orange-500">Near You</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12">
                    Find the best local restaurants, explore menus and discover amazing
                    meals around you.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-full shadow-2xl w-full max-w-4xl mx-auto overflow-hidden">

                    <div className="flex items-center w-full md:flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                        <Search className="text-gray-400 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Search restaurant..."
                            className="w-full px-4 text-base text-gray-700 focus:outline-none bg-transparent"
                        />
                    </div>

                    <div className="flex items-center w-full md:flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                        <MapPin className="text-gray-400 w-6 h-6" />
                        <select className="w-full px-4 text-base text-gray-600 focus:outline-none bg-transparent appearance-none cursor-pointer">
                            <option value="">
                                {loading ? "Loading..." : "Select Location"}
                            </option>

                            {locations.map((loc, index) => (
                                <option key={index} value={loc.toLowerCase()}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 transition">
                        Search
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Hero;