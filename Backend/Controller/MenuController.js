const MenuModel = require("../Model/MenuModel");
const RestaurantModel = require("../Model/RestaurantModel");


// ✅ Create Menu Item (Image Required)
const CreateMenuItem = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "Fadlan sawirka soo geli (Image is required)" });
        }

        // Check if restaurant exists
        const restaurant = await RestaurantModel.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const newMenuItem = await MenuModel.create({
            restaurantId: req.body.restaurantId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename
        });

        res.status(201).json(newMenuItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};



// ✅ Get All Menu Items
const GetAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuModel.find().populate("restaurantId", "name city");
        res.status(200).json(menuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};



// ✅ Get Menu By Restaurant
const GetMenuByRestaurant = async (req, res) => {
    try {
        const menuItems = await MenuModel.find({
            restaurantId: req.params.restaurantId
        });

        res.status(200).json(menuItems);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};



// ✅ Update Menu Item (Optional Image Update)
const UpdateMenuItem = async (req, res) => {
    try {

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        };

        // If new image uploaded
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedMenuItem = await MenuModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedMenuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json(updatedMenuItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
};



// ✅ Delete Menu Item
const DeleteMenuItem = async (req, res) => {
    try {

        const deletedMenuItem = await MenuModel.findByIdAndDelete(req.params.id);

        if (!deletedMenuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: "Menu item deleted successfully" });

    } catch (err) {
        console.error(err);
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