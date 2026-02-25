const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/GroupProject").then(() => {
    console.log("Connected to MongoDb");
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    }) 
}).catch((err) => {
    console.log("error connecting to MongoDB", err)
})

