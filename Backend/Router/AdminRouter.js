const express = require("express");
const router = express.Router();
const { CreateAdmin, LoginAdmin, UpdateAdmin, GetAllAdmins } = require("../Controller/AdminCont");
const UploadImage = require("../middleware/UploadImage");

router.post("/register", UploadImage.single("profilePicture"), CreateAdmin);
router.post("/login", LoginAdmin);
router.get("/", GetAllAdmins);
router.put("/update/:id", UploadImage.single("profilePicture"), UpdateAdmin);

module.exports = router;
