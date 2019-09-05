"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// Import each models schema
const url_1 = require("./url");
exports.graphqlSchema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: () => Object.assign(url_1.UrlSchema.query)
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: "Mutation",
        fields: () => Object.assign(url_1.UrlSchema.mutation)
    }),
    types: [...url_1.UrlSchema.types]
});
