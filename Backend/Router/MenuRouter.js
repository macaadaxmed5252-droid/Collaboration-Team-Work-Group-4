const express = require("express");
const router = express.Router();
const upload = require("../middleware/UploadImage"); 
const {
    CreateMenuItem,
    GetAllMenuItems,
    GetMenuByRestaurant,
    UpdateMenuItem,
    DeleteMenuItem
} = require("../Controller/MenuController");


router.post("/", upload.single("image"), CreateMenuItem);
router.get("/", GetAllMenuItems);
router.get("/restaurant/:restaurantId", GetMenuByRestaurant);
router.put("/:id", upload.single("image"), UpdateMenuItem);
router.delete("/:id", DeleteMenuItem);

module.exports = router;