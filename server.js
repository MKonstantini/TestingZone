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
// connect to db
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
})
connection.connect((err) => {
    if (err) console.log(err);
    else console.log("MySQL server is connected");
})
// create query
connection.query("SELECT * FROM pokemon", (err, res) => {
    if (err) console.log(err);
    else console.log(res)
})