const ReviewModel = require("../Model/ReviewModel");
const RestaurantModel = require("../Model/RestaurantModel");

// ✅ Add Review
const CreateReview = async (req, res) => {
    try {
        // userId-ga waxaan ka soo qaadanaynaa body-ga si looga fogaado error-ka 'undefined'
        const { restaurantId, rating, comment, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Fadlan soo geli userId-ga qofka review-ga qoraya" });
        }

        const restaurant = await RestaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant-ka lama helin" });
        }

        const existingReview = await ReviewModel.findOne({ userId, restaurantId });
        if (existingReview) {
            return res.status(400).json({ message: "Hore ayaad review ugu qortay restaurant-kan" });
        }

        const newReview = await ReviewModel.create({
            userId,
            restaurantId,
            rating,
            comment
        });

        // 🔥 Recalculate Average Rating
        const reviews = await ReviewModel.find({ restaurantId });
        const avgRating = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

        restaurant.averageRating = avgRating;
        await restaurant.save();

        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

const GetReviewsByRestaurant = async (req, res) => {
    try {
        const reviews = await ReviewModel.find({
            restaurantId: req.params.restaurantId
        }).populate("userId", "fullName email"); // Hubi in magaca uu yahay fullName

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

const DeleteReview = async (req, res) => {
    try {
        const review = await ReviewModel.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        const restaurantId = review.restaurantId;
        await review.deleteOne();

        const reviews = await ReviewModel.find({ restaurantId });
        const restaurant = await RestaurantModel.findById(restaurantId);

        if (reviews.length === 0) {
            restaurant.averageRating = 0;
        } else {
            restaurant.averageRating = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
        }

        await restaurant.save();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

const GetAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find()
            .populate("userId", "fullName email")
            .populate("restaurantId", "name");
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

module.exports = { CreateReview, GetReviewsByRestaurant, DeleteReview, GetAllReviews };