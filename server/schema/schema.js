const expressGraphQL = require('express-graphql');

const {  makeExecutableSchema } = require('graphql-tools');

const resolvers  =  require('./resolvers'); // Will be implemented at a later stage.
const typeDefs = require('./types');

module.exports = makeExecutableSchema({ typeDefs, resolvers });