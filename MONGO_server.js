const express = require("express");
const app = express();

// PORT
require("dotenv").config();
const port = process.env.port || 8001;
app.listen(port, () => {
    console.log("connected to port", port);
})

// API
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/api", (req, res) => {
    res.send("welcome to root")
})