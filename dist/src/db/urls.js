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
const mongoose_1 = require("mongoose");
const uid2 = require("uid2");
const isValidURL_1 = require("../utils/isValidURL");
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
////// Create Model /////
exports.UrlModel = mongoose_1.model("Url", UrlSchema);
////// Functions ////////
function getUrls(limit = 100) {
    return exports.UrlModel.find().limit(limit);
}
exports.getUrls = getUrls;
function getUrlByShortUrl(short) {
    return exports.UrlModel.findOne({ short: short });
}
exports.getUrlByShortUrl = getUrlByShortUrl;
function addUrl(input) {
    const { original } = input;
    const regex = new RegExp("^(http|https)://", "i");
    const shortUrl = uid2(5);
    let inputUrl = original;
    if (isValidURL_1.default(inputUrl)) {
        if (!regex.test(inputUrl)) {
            inputUrl = "https://" + inputUrl;
        }
        const url = exports.UrlModel.create({ original: inputUrl, short: shortUrl });
        return url;
    }
    else {
        return new Error("missing or incorrect url");
    }
}
exports.addUrl = addUrl;
function incrementUrlVisits(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = yield exports.UrlModel.findById(id);
        if (url) {
            url.visits++;
            url.save();
            return url;
        }
        else {
            return new Error("missing or incorrect id");
        }
    });
}
exports.incrementUrlVisits = incrementUrlVisits;
// export function removeUrl(id) {
//     return UrlModel.findByIdAndRemove(id);
// }
