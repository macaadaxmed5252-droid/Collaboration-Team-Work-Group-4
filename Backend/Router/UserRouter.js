const express = require("express");
const router = express.Router();
const { CreateUser, UpdateUser, LoginUser, DeleteUser, GetAllUsers } = require("../Controller/UserCont");
const UploadImage = require("../middleware/UploadImage");

router.post("/register", UploadImage.single("profilePicture"), CreateUser);
router.post("/login", LoginUser);
router.get("/", GetAllUsers);
router.put("/update/:id", UploadImage.single("profilePicture"), UpdateUser);
router.delete("/delete/:id", DeleteUser);

module.exports = router;