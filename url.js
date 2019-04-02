mongoose = require("mongoose");

const Url = mongoose.model("Url", {
  original: String,
  shorten: String,
  visits: {
    type: Number,
    default: 0
  }
});

module.exports = Url;
