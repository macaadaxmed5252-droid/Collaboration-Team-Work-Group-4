const express = require("express");
const router = express.Router();
const { CreateResturant, GetAllResturants, GetResturantById, UpdateResturant, DeleteResturant } = require("../Controller/ResturantCont");
const UploadImage = require("../middleware/UploadImage");

router.post("/", UploadImage.single("Image"), CreateResturant);

router.get("/", GetAllResturants);

router.get("/:id", GetResturantById);

router.put("/:id", UploadImage.single("Image"), UpdateResturant);

router.delete("/:id", DeleteResturant);

module.exports = router;