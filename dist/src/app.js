"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const bodyparser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const uid2 = require("uid2");
const isValidURL_1 = require("./utils/isValidURL");
const urls_1 = require("./db/urls");
const routes_1 = require("./constant/routes");
const mongodb_1 = require("./constant/mongodb");
const schema_1 = require("./schema");
// Main App
const app = express();
app.use(helmet());
app.use(compression());
// app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
// Parse application/json
app.use(bodyparser.json());
app.use("/", cors());
/////////////////////////
// DATABASE CONNECTION //
/////////////////////////
mongoose.connect(mongodb_1.MONGODB_URI || `mongodb://localhost/short-url`, {
    useNewUrlParser: true
});
////////////////////////
// GRAPHQL DECLARATION //
////////////////////////
app.use("/graphiql", cors(), graphqlHTTP(request => {
    const startTime = Date.now();
    return {
        schema: schema_1.graphqlSchema,
        graphiql: true,
        extensions({ document, variables, operationName, result }) {
            return { runTime: Date.now() - startTime };
        }
    };
}));
/////////////////////////////////
// REST API ROUTES DECLARATION //
/////////////////////////////////
app.get("/", (req, res) => {
    res.send({
        home: {
            message: "Welcome to the SHORT-URL REST API",
            urlList: routes_1.ROUTE_URL
        }
    });
});
// CREATE: SHORTEN URL
// Params body: url
app.post(routes_1.ROUTE_SHORTEN, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regex = new RegExp("^(http|https)://", "i");
        let inputUrl = req.body.url;
        const shortUrl = uid2(5);
        if (isValidURL_1.default(inputUrl)) {
            if (!regex.test(inputUrl)) {
                inputUrl = "https://" + inputUrl;
            }
            const url = new urls_1.UrlModel({
                original: inputUrl,
                short: shortUrl,
                visits: 0
            });
            yield url.save();
            res.json(url);
        }
        else {
            res.json({
                message: "missing or incorrect url"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}));
// READ: get all URLS
app.get(routes_1.ROUTE_URL, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield urls_1.UrlModel.find();
        const count = yield urls_1.UrlModel.countDocuments();
        if (count > 0) {
            res.json({
                count: count,
                urls
            });
        }
        else {
            res.json({
                message: "no urls on file"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}));
// READ: Redirect
// params req.params.id of short url
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const short = req.params.id;
        const url = yield urls_1.UrlModel.find({ short: short });
        if (url) {
            res.redirect(url[0].original);
        }
        else {
            res.json({
                message: "not found"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}));
// UPDATE: increment the number of visits of a url
// params req.params.id of url
app.post(routes_1.ROUTE_UPDATE + "/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlId = req.params.id;
        const url = yield urls_1.UrlModel.findById(urlId);
        if (url) {
            url.visits++;
            yield url.save();
            res.json(url);
        }
        else {
            res.json({
                message: "missing or incorrect id"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}));
module.exports = app;
