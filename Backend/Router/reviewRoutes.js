const express = require("express");
const router = express.Router();
const {
    CreateReview,
    GetReviewsByRestaurant,
    DeleteReview
} = require("../Controller/Reviewcont");


router.post("/", CreateReview);
router.get("/:restaurantId", GetReviewsByRestaurant);
router.delete("/:id", DeleteReview);

module.exports = router;