require("dotenv").config();

import * as mongoose from "mongoose";
import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as cors from "cors";
import { Request, Response } from "express";
import * as bodyparser from "body-parser";
import * as compression from "compression";
import * as helmet from "helmet";
import * as uid2 from "uid2";

import isValidURL from "./utils/isValidURL";

import { UrlModel } from "./db/urls";

import { ROUTE_URL, ROUTE_SHORTEN, ROUTE_UPDATE } from "./constant/routes";
const { MONGODB_DB_NAME, MONGODB_URI } = process.env;

import { graphqlSchema } from "./schema";

// Main App
const app: express.Application = express();

app.use(helmet());
app.use(compression());
// app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
// Parse application/json
app.use(bodyparser.json());
app.use("/", cors());

/////////////////////////
// DATABASE CONNECTION //
/////////////////////////

mongoose.connect(MONGODB_URI || `mongodb://localhost/${MONGODB_DB_NAME}`, {
  useNewUrlParser: true
});

////////////////////////
// GRAPHQL DECLARATION //
////////////////////////

app.use(
  "/graphiql",
  cors(),
  graphqlHTTP(request => {
    const startTime = Date.now();
    return {
      schema: graphqlSchema,
      graphiql: true,
      extensions({ document, variables, operationName, result }) {
        return { runTime: Date.now() - startTime };
      }
    };
  })
);

/////////////////////////////////
// REST API ROUTES DECLARATION //
/////////////////////////////////

app.get("/", (req: Request, res: Response) => {
  res.send({
    home: {
      message: "Welcome to the SHORT-URL REST API",
      urlList: ROUTE_URL
    }
  });
});

// CREATE: SHORTEN URL
// Params body: url
app.post(ROUTE_SHORTEN, async (req: Request, res: Response) => {
  try {
    const regex = new RegExp("^(http|https)://", "i");
    let inputUrl: string = req.body.url;
    const shortUrl: string = uid2(5);

    if (isValidURL(inputUrl)) {
      if (!regex.test(inputUrl)) {
        inputUrl = "https://" + inputUrl;
      }
      const url = new UrlModel({
        original: inputUrl,
        short: shortUrl,
        visits: 0
      });
      await url.save();
      res.json(url);
    } else {
      res.json({
        message: "missing or incorrect url"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// READ: get all URLS
app.get(ROUTE_URL, async (req: Request, res: Response) => {
  try {
    const urls = await UrlModel.find();
    const count = await UrlModel.countDocuments();

    if (count > 0) {
      res.json({
        count: count,
        urls
      });
    } else {
      res.json({
        message: "no urls on file"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// READ: Redirect
// params req.params.id of short url
app.get("/:id", async (req: Request, res: Response) => {
  try {
    const short: string = req.params.id;
    const url = await UrlModel.find({ short: short });

    if (url) {
      res.redirect(url[0].original);
    } else {
      res.json({
        message: "not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// UPDATE: increment the number of visits of a url
// params req.params.id of url
app.post(ROUTE_UPDATE + "/:id", async (req: Request, res: Response) => {
  try {
    const urlId = req.params.id;
    const url = await UrlModel.findById(urlId);
    if (url) {
      url.visits++;
      await url.save();
      res.json(url);
    } else {
      res.json({
        message: "missing or incorrect id"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = app;
