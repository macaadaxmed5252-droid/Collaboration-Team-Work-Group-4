const express = require("express");
const mongoose = require("mongoose");
const ResturentRouter = require("./Router/ResturentRouter");

const app = express();

app.use(express.json());

app.use("/Resturant", ResturentRouter);

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