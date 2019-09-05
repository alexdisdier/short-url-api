import { GraphQLSchema, GraphQLObjectType } from "graphql";

// Import each models schema
import { UrlSchema } from "./url";

export const graphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => Object.assign(UrlSchema.query)
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => Object.assign(UrlSchema.mutation)
  }),
  types: [...UrlSchema.types]
});
