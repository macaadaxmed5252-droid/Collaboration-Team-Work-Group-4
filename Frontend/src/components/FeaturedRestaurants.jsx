import React, { useState, useEffect } from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import axios from 'axios';

function FeaturedRestaurants({ searchTerms }) {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Resturant/');
                setAllRestaurants(response.data);
                setFilteredData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    useEffect(() => {
        let results = allRestaurants;

        if (searchTerms.name) {
            results = results.filter(res =>
                res.name.toLowerCase().includes(searchTerms.name.toLowerCase())
            );
        }

        if (searchTerms.location) {
            results = results.filter(res =>
                res.location.toLowerCase() === searchTerms.location.toLowerCase()
            );
        }

        setFilteredData(results);
    }, [searchTerms, allRestaurants]);

    if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        {searchTerms.name || searchTerms.location ? "Search Results" : "Featured Restaurants"}
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg font-light">
                        {filteredData.length} restaurants found.
                    </p>
                </div>
                <button className="flex items-center text-orange-600 font-bold group">
                    View all <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
                {filteredData.length > 0 ? (
                    filteredData.map((res) => (
                        <div key={res._id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full">
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 flex-none">
                                <img
                                    src={`http://localhost:3000/Images/${res.Image}`}
                                    alt={res.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found'}
                                />
                            </div>
                            <div className="p-7 flex flex-col flex-1 justify-between">
                                <div>
                                    <div className="flex justify-between items-start gap-4 mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                            {res.name}
                                        </h3>
                                        <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full flex-none">
                                            <Star className="w-3.5 h-3.5 text-orange-500 fill-current mr-1.5" />
                                            <span className="font-bold text-orange-700 text-sm">
                                                {res.averageRating || "0.0"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-500 font-medium">
                                        <MapPin className="w-4 h-4 mr-2 text-orange-500 flex-none" />
                                        <p className="text-sm line-clamp-1">{res.location}, {res.city}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-[2.5rem]">
                        <p className="text-xl text-gray-500 font-medium">No restaurants found matching your search!</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-orange-600 font-bold underline"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default FeaturedRestaurants;