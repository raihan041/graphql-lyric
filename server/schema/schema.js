import {  makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers'; 
import typeDefs from './types';

module.exports = makeExecutableSchema({ typeDefs, resolvers });