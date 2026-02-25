const RestaurantModel = require("../Model/RestaurantModel");

const CreateResturant = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ message: "Fadlan sawirka soo geli (Image is required)" });
        }

        const newResturant = await RestaurantModel.create({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            city: req.body.city,
            category: req.body.category,
            averageRating: req.body.averageRating,
            Image: req.file.filename 
        });

        res.status(201).json(newResturant);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
}

const GetAllResturants = async (req, res) => {
    try {
        const resturants = await RestaurantModel.find();
        res.status(200).json(resturants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    } 
}

const GetResturantById = async (req, res) => {
    try {
        const resturant = await RestaurantModel.findById(req.params.id);
        if (!resturant) {
            return res.status(404).json({ message: "Resturant not found" });
        }
        res.status(200).json(resturant);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
}

const UpdateResturant = async (req, res) => {
    try {
        const updatedResturant = await RestaurantModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedResturant) {
            return res.status(404).json({ message: "Resturant not found" });
        }
        res.status(200).json(updatedResturant);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
}

const DeleteResturant = async (req, res) => {
    try {
        const deletedResturant = await RestaurantModel.findByIdAndDelete(req.params.id);
        if (!deletedResturant) {
            return res.status(404).json({ message: "Resturant not found" });
        }
        res.status(200).json({ message: "Resturant deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cilad ayaa dhacday", details: err.message });
    }
}

module.exports = { CreateResturant, GetAllResturants, GetResturantById, UpdateResturant, DeleteResturant };