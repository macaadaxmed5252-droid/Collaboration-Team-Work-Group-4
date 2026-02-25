const express = require("express");
const router = express.Router();
const {
    CreateReview,
    GetReviewsByRestaurant,
    DeleteReview,
    GetAllReviews
} = require("../Controller/Reviewcont");


router.post("/", CreateReview);
router.get("/", GetAllReviews);
router.get("/:restaurantId", GetReviewsByRestaurant);
router.delete("/:id", DeleteReview);

module.exports = router;