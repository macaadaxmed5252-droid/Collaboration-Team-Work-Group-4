import React, { useState } from "react";
import Hero from "../components/Hero";
import FeaturedRestaurants from "../components/FeaturedRestaurants";

function Home() {
    const [searchTerms, setSearchTerms] = useState({ name: "", location: "" });

    return (
        <div>
            <Hero onSearch={(data) => setSearchTerms(data)} />
            <FeaturedRestaurants searchTerms={searchTerms} />
        </div>
    );
}

export default Home;