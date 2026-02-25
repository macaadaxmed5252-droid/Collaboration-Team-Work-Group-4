const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ResturentRouter = require("./Router/ResturentRouter");
const UserRouter = require("./Router/UserRouter");
const MenuRouter = require("./Router/MenuRouter");
const ReviewRouter = require("./Router/reviewRoutes");
<<<<<<< HEAD
const contuctRouter=require("./Router/ContuctRouter")
=======
const path = require('path');
>>>>>>> 4be2dda21e579937eaf21503c4bf3e649daaaa90

const app = express();


app.use(express.json());
app.use(cors());
app.use("/Resturant", ResturentRouter);
app.use("/User", UserRouter);
app.use("/menu", MenuRouter); 
app.use("/reviews", ReviewRouter);
app.use("/contuct", contuctRouter);





app.use("/Images", express.static(path.join(__dirname, 'Images')));

mongoose.connect("mongodb://127.0.0.1:27017/GroupProject")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });