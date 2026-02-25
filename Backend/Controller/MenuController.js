const MenuModel = require("../Model/menu");
const RestaurantModel = require("../Model/RestaurantModel");

const CreateMenuItem = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Fadlan sawirka soo geli!" });
        }

        const restaurant = await RestaurantModel.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant-ka lama helin" });
        }

        const newMenuItem = await MenuModel.create({
            restaurantId: req.body.restaurantId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            Image: req.file.filename
        });

        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

const GetAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuModel.find().populate("restaurantId", "name city");
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

const GetMenuByRestaurant = async (req, res) => {
    try {
        const menuItems = await MenuModel.find({ restaurantId: req.params.restaurantId });
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

const UpdateMenuItem = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.Image = req.file.filename;

        const updatedMenuItem = await MenuModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedMenuItem) return res.status(404).json({ message: "Menu item not found" });

        res.status(200).json(updatedMenuItem);
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

const DeleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await MenuModel.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};

module.exports = {
    CreateMenuItem,
    GetAllMenuItems,
    GetMenuByRestaurant,
    UpdateMenuItem,
    DeleteMenuItem
};