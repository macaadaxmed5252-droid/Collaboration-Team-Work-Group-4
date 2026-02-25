const UserModel = require("../Model/UserModel");


const CreateUser = async (req, res) => {
    try {
        const { password, confirmPassword, email, username } = req.body;
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords-ka isku mid ma ahan!" });

        const existingUser = await UserModel.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
        if (existingUser) return res.status(400).json({ message: "Email ama Username hore ayaa loo isticmaalay!" });

        const profilePicture = req.file ? req.file.filename : "";
        const user = await UserModel.create({ ...req.body, profilePicture, email: email.toLowerCase() });

        res.status(201).json({ message: "User Created Successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        if (req.file) {
            updateData.profilePicture = req.file.filename;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ message: "Profile Updated", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};


const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email.toLowerCase(), password });
        if (!user) return res.status(404).json({ message: "Email ama Password waa khalad!" });

        res.status(200).json({
            id: user._id, fullName: user.fullName, email: user.email,
            profilePicture: user.profilePicture, role: user.role
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


const DeleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User is deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const ToggleFavorite = async (req, res) => {
    try {
        const { userId, restaurantId } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const index = user.favorites.indexOf(restaurantId);
        if (index === -1) {
            user.favorites.push(restaurantId);
            await user.save();
            res.status(200).json({ message: "Added to favorites", favorites: user.favorites });
        } else {
            user.favorites.splice(index, 1);
            await user.save();
            res.status(200).json({ message: "Removed from favorites", favorites: user.favorites });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const GetFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).populate("favorites");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { CreateUser, UpdateUser, LoginUser, DeleteUser, GetAllUsers, ToggleFavorite, GetFavorites };