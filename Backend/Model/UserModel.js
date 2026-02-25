const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: false,
        },

        profilePicture: {
            type: String,
            default: "",

        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        Country: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        state: {
            type: String,
            default: "",
        },


        confirmPassword: {
            type: String,
            required: false,
            minlength: 6,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    }
);

module.exports = mongoose.model("User", UserSchema);