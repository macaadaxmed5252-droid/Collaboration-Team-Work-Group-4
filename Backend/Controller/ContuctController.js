const contuctmodel = require("../Model/Contuct");

const Create = async (req, res) => {
  try {
    const newItem = await contuctmodel.create({
      name: req.body.name,
      message: req.body.message,
      email: req.body.email,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GetUsers = async (req, res) => {
  try {
    const read = await contuctmodel.find();
    res.status(200).json(read);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const GetUserById = async (req, res) => {
  try {
    const readById = await contuctmodel.findById(req.params.id);

    if (!readById) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(readById);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const deleted = await contuctmodel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

module.exports = {
  Create,
  GetUsers,
  GetUserById,
  DeleteUser,
};