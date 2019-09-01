"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const uid2 = require("uid2");
const isValidURL_1 = require("./utils/isValidURL");
const routes_1 = require("./constant/routes");
const schema = require("./schema/schema");
const { MONGODB_URI } = process.env;
const app = express();
const url_1 = require("./url");
app.use(helmet());
app.use(compression());
app.use(bodyparser.json());
app.use("/", cors());
/////////////////////////
// DATABASE CONNECTION //
/////////////////////////
mongoose.connect(MONGODB_URI || `mongodb://localhost/short-url`, {
    useNewUrlParser: true
});
////////////////////////
// ROUTES DECLARATION //
////////////////////////
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.get("/", (req, res) => {
    res.send({
        home: {
            message: "Welcome to AD SHORT-URL API",
            urlList: routes_1.ROUTE_URL
        }
    });
});
// CREATE: SHORTEN URL
// Params body: url
app.post(routes_1.ROUTE_SHORTEN, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const regex = new RegExp("^(http|https)://", "i");
        let inputUrl = req.body.url;
        const shortUrl = uid2(5);
        if (isValidURL_1.default(inputUrl)) {
            if (!regex.test(inputUrl)) {
                inputUrl = "https://" + inputUrl;
            }
            const url = new url_1.default({
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
app.get(routes_1.ROUTE_URL, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const urls = yield url_1.default.find();
        const count = yield url_1.default.countDocuments();
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
app.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const short = req.params.id;
        const url = yield url_1.default.find({ short: short });
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
app.post(routes_1.ROUTE_UPDATE + "/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const urlId = req.params.id;
        const url = yield url_1.default.findById(urlId);
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
