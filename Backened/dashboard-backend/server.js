const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD
    database: "dashboard_app"
});

db.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
        return;
    }
    console.log("MySQL connected");
});

// ROOT ROUTE (this fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API: get users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

// API: add user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ id: result.insertId });
        }
    });
});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
