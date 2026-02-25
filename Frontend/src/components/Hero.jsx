import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import api from "../api/config";

function Hero({ onSearch }) {
    const [searchName, setSearchName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await api.get("/Resturant");
                const cities = [...new Set(res.data.map((item) => item.location))];
                setLocations(cities);
            } catch (error) {
                console.error("Error fetching locations:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ name: searchName, location: selectedLocation });
    };

    return (
        <div className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600')" }}
                ></div>
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                    Discover Food <span className="text-orange-500">Near You</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light">
                    Find the best local restaurants, explore menus and discover amazing meals around you.
                </p>

                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center bg-white rounded-2xl md:rounded-full shadow-2xl w-full max-w-4xl mx-auto p-2">
                    <div className="flex items-center flex-[1.5] px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                        <Search className="text-gray-400 w-5 h-5 flex-none" />
                        <input
                            type="text"
                            placeholder="Restaurant name..."
                            className="w-full px-4 text-gray-700 focus:outline-none bg-transparent"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center flex-1 px-6 py-3">
                        <MapPin className="text-gray-400 w-5 h-5 flex-none" />
                        <select
                            className="w-full px-4 text-gray-600 focus:outline-none bg-transparent appearance-none cursor-pointer"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            <option value="">{loading ? "Loading..." : "All Locations"}</option>
                            {locations.map((loc, index) => (
                                <option key={index} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-4 rounded-xl md:rounded-full transition duration-300">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Hero;