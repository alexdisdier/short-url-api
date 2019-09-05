import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from "graphql";

/**
 * Functions which interacts with database
 */
import {
  getUrls,
  getUrlByShortUrl,
  addUrl,
  incrementUrlVisits
} from "../db/urls";

/**
 * Defining types
 */
const urlType = new GraphQLObjectType({
  name: "Url",
  description: "The Url description",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "The id of the url"
    },
    original: {
      type: GraphQLString,
      description: "The original url before being shorten"
    },
    short: {
      type: GraphQLString,
      description: "The shorten url"
    },
    visits: {
      type: GraphQLInt,
      description: "Then number of times the url link has been clicked"
    }
  })
});

/**
 * Reading data QUERY
 */
const query = {
  urls: {
    type: new GraphQLList(urlType),
    args: {
      limit: {
        description: "limit urls in the results",
        type: GraphQLInt
      }
    },
    resolve: (root, { limit }) => getUrls(limit)
  },
  urlByShortUrl: {
    type: urlType,
    args: {
      short: {
        description: "find the original url using the short url link",
        type: GraphQLString
      }
    },
    resolve: (root, { short }) => getUrlByShortUrl(short)
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
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (obj, input) => addUrl(input)
  },
  incrementUrlVisits: {
    type: urlType,
    description:
      "everytime a user clicks on a url link, it increments the total number of visits for this url.",
    args: {
      id: { type: GraphQLID }
    },
    resolve: (root, { id }) => incrementUrlVisits(id)
  }
};

export const UrlSchema = {
  query,
  mutation,
  types: [urlType]
};
