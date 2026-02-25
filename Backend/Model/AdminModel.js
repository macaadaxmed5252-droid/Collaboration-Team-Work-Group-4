const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            default: "admin"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
