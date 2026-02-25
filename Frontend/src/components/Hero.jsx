import React from 'react';
import { Search } from 'lucide-react';

function Hero() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl px-6 text-left md:text-left lg:ml-20">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    Discover Food <span className="text-orange-500">Near You</span>
                </h1>

                <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl font-light">
                    Find the best local restaurants, explore menus, and read reviews from your community.
                </p>

                <div className="mt-10 flex w-full max-w-2xl items-center bg-white rounded-xl md:rounded-full p-2 shadow-2xl">
                    <div className="flex items-center flex-grow px-4">
                        <Search className="text-gray-400 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Search restaurants or cuisines..."
                            className="w-full px-4 py-3 text-gray-700 focus:outline-none bg-transparent"
                        />
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg md:rounded-full transition-all duration-300 shadow-md">
                        Search
                    </button>
                </div>
            </div>


        </div>
    );
}

export default Hero;