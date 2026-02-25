const express = require("express");
const router = express.Router();
const { CreateUser, UpdateUser, LoginUser, DeleteUser, GetAllUsers, ToggleFavorite, GetFavorites } = require("../Controller/UserCont");
const UploadImage = require("../middleware/UploadImage");

router.post("/register", UploadImage.single("profilePicture"), CreateUser);
router.post("/login", LoginUser);
router.get("/", GetAllUsers);
router.put("/update/:id", UploadImage.single("profilePicture"), UpdateUser);
router.delete("/delete/:id", DeleteUser);
router.post("/favorite", ToggleFavorite);
router.get("/favorites/:id", GetFavorites);

module.exports = router;