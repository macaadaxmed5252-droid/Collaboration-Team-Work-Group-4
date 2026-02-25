const AdminModel = require("../Model/AdminModel");

const CreateAdmin = async (req, res) => {
    try {
        const { password, confirmPassword, email, username } = req.body;
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords-ka isku mid ma ahan!" });

        const existingAdmin = await AdminModel.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
        if (existingAdmin) return res.status(400).json({ message: "Admin hore ayaa loogu diiwaangeliyay xogtan!" });

        const profilePicture = req.file ? req.file.filename : "";
        const admin = await AdminModel.create({ ...req.body, profilePicture, email: email.toLowerCase() });

        res.status(201).json({ message: "Admin Created Successfully", admin });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

const LoginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email: email.toLowerCase(), password });
        if (!admin) return res.status(404).json({ message: "Email ama Password waa khalad!" });

        res.status(200).json({
            id: admin._id,
            username: admin.username,
            email: admin.email,
            profilePicture: admin.profilePicture,
            role: "admin",
            isAdminAccount: true // Flag to distinguish from regular user objects
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

const UpdateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        if (req.file) {
            updateData.profilePicture = req.file.filename;
        }

        const updatedAdmin = await AdminModel.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ message: "Admin Profile Updated", admin: updatedAdmin });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

const GetAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find().select("-password");
        res.status(200).json({ admins });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { CreateAdmin, LoginAdmin, UpdateAdmin, GetAllAdmins };
