import express from "express";
const app       = express();
const dotenv    = require('dotenv');
const userLocal = process.env.USERNAME;

console.log("PALOMARESSS");

app.listen(3560);
app.get('/', function(req, res) {
    res.status(201).json({userLocal});
});