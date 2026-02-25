const express = require("express");
const router = express.Router();
const { Create, GetUsers, GetUserById, DeleteUser } = require("../Controller/ContuctController");

router.post("/", Create);
router.get("/", GetUsers);
router.get("/:id", GetUserById);
router.delete("/:id", DeleteUser);

module.exports = router;
