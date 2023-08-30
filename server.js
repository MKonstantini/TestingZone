const express = require("express");
const app = express();

// PORT
require("dotenv").config();
const port = process.env.port || 8001;
app.listen(port, () => {
    console.log("connected to port", port);
})

// API
// middle-ware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// endpoints
app.get("/api", (req, res) => {
    res.send("welcome to root");
})

// DB
const mysql = require("mysql");
