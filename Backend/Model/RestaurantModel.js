const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    category: { type: String, required: true },
    Image: { type: String, required: true }, 
    averageRating: { type: Number, default: 0 },
    openingHours: { type: String, default: "9:00 AM - 10:00 PM" }
});

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
module.exports = RestaurantModel;