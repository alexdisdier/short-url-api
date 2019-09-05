"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const bodyparser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const mongodb_1 = require("./constant/mongodb");
const schema_1 = require("./schema");
// const Url = require("./db/urls");
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
app.get("/", (req, res) => {
    res.status(200).send("Server endpoint");
});
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
////////////////////////
// ROUTES DECLARATION //
////////////////////////
// app.get("/", (req: Request, res: Response) => {
//   res.send({
//     home: {
//       message: "Welcome to AD SHORT-URL API",
//       urlList: ROUTE_URL
//     }
//   });
// });
// CREATE: SHORTEN URL
// Params body: url
// app.post(ROUTE_SHORTEN, async (req: Request, res: Response) => {
//   try {
//     const regex = new RegExp("^(http|https)://", "i");
//     let inputUrl: string = req.body.url;
//     const shortUrl: string = uid2(5);
//     if (isValidURL(inputUrl)) {
//       if (!regex.test(inputUrl)) {
//         inputUrl = "https://" + inputUrl;
//       }
//       const url = new Url({
//         original: inputUrl,
//         short: shortUrl,
//         visits: 0
//       });
//       await url.save();
//       res.json(url);
//     } else {
//       res.json({
//         message: "missing or incorrect url"
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message
//     });
//   }
// });
// READ: get all URLS
// app.get(ROUTE_URL, async (req: Request, res: Response) => {
//   try {
//     const urls = await Url.find();
//     const count = await Url.countDocuments();
//     if (count > 0) {
//       res.json({
//         count: count,
//         urls
//       });
//     } else {
//       res.json({
//         message: "no urls on file"
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message
//     });
//   }
// });
// READ: Redirect
// params req.params.id of short url
// app.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const short: string = req.params.id;
//     const url = await Url.find({ short: short });
//     if (url) {
//       res.redirect(url[0].original);
//     } else {
//       res.json({
//         message: "not found"
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message
//     });
//   }
// });
// UPDATE: increment the number of visits of a url
// params req.params.id of url
// app.post(ROUTE_UPDATE + "/:id", async (req: Request, res: Response) => {
//   try {
//     const urlId = req.params.id;
//     const url = await Url.findById(urlId);
//     if (url) {
//       url.visits++;
//       await url.save();
//       res.json(url);
//     } else {
//       res.json({
//         message: "missing or incorrect id"
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message
//     });
//   }
// });
module.exports = app;
