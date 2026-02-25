const express = require("express");
const router = express.Router();
const { Subscribe, GetAllSubscriptions, DeleteSubscription } = require("../Controller/SubscriptionCont");

router.post("/", Subscribe);
router.get("/", GetAllSubscriptions);
router.delete("/:id", DeleteSubscription);

module.exports = router;
