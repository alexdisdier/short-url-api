const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const uid2 = require("uid2");
const app = express();

const Url = require("./url.js");

app.use(helmet());
app.use(compression());
app.use(bodyparser.json());
app.use("/", cors());

/////////////////////////
// DATABASE CONNECTION //
/////////////////////////

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/short-url`, {
  useNewUrlParser: true
});

////////////////////////
// ROUTES DECLARATION //
////////////////////////

app.get("/", (req, res) => {
  res.send({
    home: {
      message: "Welcome to AD SHORT-URL API",
      urlList: "/url"
    }
  });
});

// CREATE: SHORTEN URL
// Params body: url
app.post("/shorten", async (req, res) => {
  try {
    const regex = new RegExp("^(http|https)://", "i");
    let inputUrl = req.body.url;
    const shortUrl = uid2(5);
    if (isValidURL(inputUrl)) {
      if (!regex.test(inputUrl)) {
        inputUrl = "https://" + inputUrl;
      }
      const url = new Url({
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
app.get("/url", async (req, res) => {
  try {
    const urls = await Url.find();
    const count = await Url.countDocuments();

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
app.get("/:id", async (req, res) => {
  console.log("test");
  try {
    const short = req.params.id;
    const url = await Url.find({ short: short });

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
app.post("/update/:id", async (req, res) => {
  try {
    const urlId = req.params.id;
    const url = await Url.findById(urlId);
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

// Function to check if the url entered is of a conventional format
// source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const isValidURL = str => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
};

/////////////////////
// STARTING SERVER //
/////////////////////

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
  if (res.statusCode === 200) res.status(400);
  console.log(err);
  res.json({ error: err });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server started");
});
