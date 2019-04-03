mongoose = require("mongoose");

const Url = mongoose.model("Url", {
  original: String,
  short: String,
  visits: {
    type: Number,
    default: 0
  }
});

module.exports = Url;
