"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
/**
 * Functions which interacts with database
 */
const urls_1 = require("../db/urls");
/**
 * Defining types
 */
const urlType = new graphql_1.GraphQLObjectType({
    name: "Url",
    description: "The Url description",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            description: "The id of the url"
        },
        original: {
            type: graphql_1.GraphQLString,
            description: "The original url before being shorten"
        },
        short: {
            type: graphql_1.GraphQLString,
            description: "The shorten url"
        },
        visits: {
            type: graphql_1.GraphQLInt,
            description: "Then number of times the url link has been clicked"
        }
    })
});
/**
 * Reading data QUERY
 */
const query = {
    urls: {
        type: new graphql_1.GraphQLList(urlType),
        args: {
            limit: {
                description: "limit urls in the results",
                type: graphql_1.GraphQLInt
            }
        },
        resolve: (root, { limit }) => urls_1.getUrls(limit)
    },
    urlByShortUrl: {
        type: urlType,
        args: {
            short: {
                description: "find the original url using the short url link",
                type: graphql_1.GraphQLString
            }
        },
        resolve: (root, { short }) => urls_1.getUrlByShortUrl(short)
    }
};
/**
 * Adding, increment and delete data MUTATIONS
 */
const mutation = {
    addUrl: {
        type: urlType,
        description: "adding a short url to the database",
        args: {
            original: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, input) => urls_1.addUrl(input)
    },
    incrementUrlVisits: {
        type: urlType,
        description: "everytime a user clicks on a url link, it increments the total number of visits for this url.",
        args: {
            id: { type: graphql_1.GraphQLID }
        },
        resolve: (root, { id }) => urls_1.incrementUrlVisits(id)
    }
};
exports.UrlSchema = {
    query,
    mutation,
    types: [urlType]
};
