"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PORT } = process.env;
const express = require("express");
const app = express();
//server.js
app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});
app.use((err, req, res, next) => {
    if (res.statusCode === 200)
        res.status(400);
    console.log(err);
    res.json({ error: err });
});
app.listen(PORT || 3001, () => {
    console.log("server started");
});
