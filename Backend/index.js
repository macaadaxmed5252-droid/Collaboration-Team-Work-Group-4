const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path'); // Hubi inuu halkan joogo

const ResturentRouter = require("./Router/ResturentRouter");
const UserRouter = require("./Router/UserRouter");
const MenuRouter = require("./Router/MenuRouter");
const ReviewRouter = require("./Router/reviewRoutes");
const ContuctRouter=require("./Router/ContuctRouter")

const app = express();

// 1. Middleware-yada ugu muhiimsan
app.use(cors());
app.use(express.json());

// 2. static folder - Kan soo hor mari Router-ka (MUHIIM)
// Waxaan hubinaa inuu garto folder-ka "Images" ee root-ka ku yaalla
app.use("/Images", express.static(path.join(__dirname, 'Images')));

// 3. Router-yada
app.use("/Resturant", ResturentRouter);
app.use("/User", UserRouter);
app.use("/menu", MenuRouter);
app.use("/reviews", ReviewRouter);
app.use("/contuct",ContuctRouter)

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