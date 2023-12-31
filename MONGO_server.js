const express = require("express");
const app = express();

// PORT
require("dotenv").config();
const port = process.env.PORT || 8001;
app.listen(port, () => console.log("connected to port", port));

// API
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// routes
const r_employees = require("./routes/r_employees")
app.use("/api/employees", r_employees)
app.get("/api", (req, res) => {
    res.send("welcome to root");
})

// DB - Mongoose
// connect
const mongoose = require("mongoose")
mongoose
    .connect(process.env.DB, {useNewUrlParser: true}) 
    .then(() => console.log("connected to database MK-Cluster"))
    .catch((err) => console.log(err))

