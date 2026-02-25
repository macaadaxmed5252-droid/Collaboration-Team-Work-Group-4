const SubscriptionModel = require("../Model/Subscription");

const Subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const existing = await SubscriptionModel.findOne({ email });
        if (existing) return res.status(400).json({ message: "Horey ayaad u iska diiwaangelisay!" });

        const newSub = await SubscriptionModel.create({ email });
        res.status(201).json({ message: "Waad ku mahadsantahay is diiwaangelintaada!", subscription: newSub });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const GetAllSubscriptions = async (req, res) => {
    try {
        const subs = await SubscriptionModel.find().sort({ subscribedAt: -1 });
        res.status(200).json(subs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const DeleteSubscription = async (req, res) => {
    try {
        await SubscriptionModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Subscription deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { Subscribe, GetAllSubscriptions, DeleteSubscription };
