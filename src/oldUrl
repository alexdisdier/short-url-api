import { Document, Schema, model } from "mongoose";

export interface IUrl extends Document {
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

export default model<IUrl>("Url", UrlSchema);
