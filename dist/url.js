"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UrlSchema = new mongoose_1.Schema({
    original: {
        type: String
    },
    short: {
        type: String
    },
    visits: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.model("Url", UrlSchema);
