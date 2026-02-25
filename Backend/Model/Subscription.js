const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        subscribedAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
