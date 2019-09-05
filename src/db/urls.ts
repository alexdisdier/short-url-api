import { Schema, model, Document } from "mongoose";

import * as _ from "lodash";
import * as uid2 from "uid2";
import isValidURL from "../utils/isValidURL";

export interface Url {
  original: string;
  short: string;
  visits: number;
}

export interface UrlModel extends Document {
  original: string;
  short: string;
  visits: number;
}

const UrlSchema: Schema = new Schema({
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

export const UrlModel = model<UrlModel>("Url", UrlSchema);

////// Functions ////////

export function getUrls(limit = 100) {
  return UrlModel.find().limit(limit);
}

export function getUrlByShortUrl(short: string) {
  return UrlModel.findOne({ short: short });
}

export function addUrl(input: Url) {
  const { original } = input;
  const regex = new RegExp("^(http|https)://", "i");
  const shortUrl = uid2(5);
  let inputUrl = original;

  if (isValidURL(inputUrl)) {
    if (!regex.test(inputUrl)) {
      inputUrl = "https://" + inputUrl;
    }
    const url = UrlModel.create({ original: inputUrl, short: shortUrl });
    return url;
  } else {
    return new Error("missing or incorrect url");
  }
}

export async function incrementUrlVisits(id: string) {
  const url = await UrlModel.findById(id);
  if (url) {
    url.visits++;
    url.save();
    return url;
  } else {
    return new Error("missing or incorrect id");
  }
}

// export function removeUrl(id) {
//     return UrlModel.findByIdAndRemove(id);
// }
