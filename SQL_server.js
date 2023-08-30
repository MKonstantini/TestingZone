const express = require("express");
const app = express();

// PORT
require("dotenv").config();
const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log("connected to port", port);
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

// API
// middle-ware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// endpoints
app.get("/api", (req, res) => {
    res.send("welcome to root");
})
app.get("/api/pokemon", (req, res) => {
    connection.query("SELECT * FROM pokemon", (err, qRes) => {
        if (err) res.send(err);
        else res.send(qRes);
    })
})
app.get("/api/pokemon/:id", (req, res) => {
    connection.query(`SELECT * FROM pokemon WHERE id = ${req.params.id}`, (err, qRes) => {
        if (err) console.log(err);
        else res.send(qRes);
    })
})
app.post("/api/pokemon", (req, res) => {
    connection.query(`INSERT INTO pokemon VALUES (NULL, '${req.body.name}', '${req.body.level}', '${req.body.owner}')`, (err, qRes) => {
        if (err) console.log(err);
        else res.send("pokemon was added successfully")
    })
})
app.delete("/api/pokemon/:id", (req, res) => {
    connection.query(`DELETE FROM pokemon WHERE id = ${req.params.id}`, (err, qRes) => {
        if (err) console.log(err);
        else res.send(`pokemon with id: ${req.params.id} was deleted`)
    })
})
app.patch("/api/pokemon/:id", (req, res) => {
    connection.query("UPDATE pokemon SET name = ?, level = ?, owner = ?  WHERE id = ?",
    [req.body.name, req.body.level, req.body.owner, req.params.id],
     (err, qRes) => {
        if (err) console.log(err)
        else res.send("pokemon updated successfully")
    })
})

// secure SQL query
// let input = "100 OR 1=1" // <- SQL injection that will return all from table
// connection.query(
//     `SELECT * FROM pokemon WHERE id = ${input}`,
//     (err, res) => {
//         if (err) console.log(err);
//         else console.log(res)
//     }
// )
// Solve this issue using a placeholder:
// let input = "100 OR 1=1"
// connection.query(
//     `SELECT * FROM pokemon WHERE id = ?`,
//     [input],
//     (err, res) => {
//         if (err) console.log(err);
//         else console.log(res)
//     }
// )
// the placeholder will result in WHERE id = [100 OR 1 = 1]
// instead of WHERE id = 100 OR 1 = 1
// use this alongside client side validation (joi) for a secure website
// securing the above post request:
app.post("/api/pokemon", (req, res) => {
    connection.query(`INSERT INTO pokemon VALUES (?, ?, ?, ?)`,
    [NULL, req.body.name, req.body.level, req.body.owner],
     (err, qRes) => {
        if (err) console.log(err);
        else res.send("pokemon was added successfully")
    })
})
