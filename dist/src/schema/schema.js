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
const graphql = require("graphql");
const uid2 = require("uid2");
const Url = require("../url");
// Function to check if the url entered is of a conventional format
// source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const isValidURL = str => {
    const pattern = new RegExp("^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$", "i");
    return !!pattern.test(str);
};
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
// DEFINING TYPES
const UrlType = new GraphQLObjectType({
    name: "Url",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        original: {
            type: GraphQLString
        },
        short: {
            type: GraphQLString
        },
        visits: {
            type: GraphQLInt
        }
    })
});
// CREATE AND UPDATE
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUrl: {
            type: UrlType,
            args: {
                original: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const regex = new RegExp("^(http|https)://", "i");
                const shortUrl = uid2(5);
                let inputUrl = args.original;
                if (isValidURL(inputUrl)) {
                    if (!regex.test(inputUrl)) {
                        inputUrl = "https://" + inputUrl;
                    }
                    let url = new Url({
                        original: inputUrl,
                        short: shortUrl
                    });
                    return url.save();
                }
                else {
                    return new Error("missing or incorrect url");
                }
            }
        },
        incVisits: {
            type: UrlType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const urlId = args.id;
                    const url = yield Url.findById(urlId);
                    if (url) {
                        url.visits++;
                        return url.save();
                    }
                    else {
                        return new Error("missing or incorrect id");
                    }
                });
            }
        }
    }
});
// READ
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        url: {
            type: UrlType,
            args: { short: { type: GraphQLString } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    // code to get data from db / other source
                    // return _.find(urls, { short: args.short });
                    const short = args.short;
                    const url = yield Url.find({ short: short });
                    if (url) {
                        return url;
                    }
                    else {
                        return new Error("not found");
                    }
                });
            }
        },
        urls: {
            type: new GraphQLList(UrlType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const urls = yield Url.find();
                    const count = yield Url.countDocuments();
                    if (count > 0) {
                        return urls;
                    }
                    else {
                        return new Error("no urls on file");
                    }
                });
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
