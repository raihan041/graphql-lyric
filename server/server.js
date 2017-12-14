const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {  makeExecutableSchema } = require('graphql-tools');

const schema = require('./schema/schema');// new makeExecutableSchema({ typeDefs, resolvers });

//subscription

const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');


const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://testgraphql:123456@ds135876.mlab.com:35876/lyricaldb';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));


const WSPORT = 3000;

// app.use('*', cors({ origin: 'http://localhost:4000' }));
// app.use(bodyParser.json());
// app.use('/graphql', expressGraphQL({
//   schema,
//   graphiql: true,
//   subscriptionsEndpoint: `ws://localhost:${WSPORT}/subscriptions`
// }));


app.listen(4000, () => {
  console.log('Listening');
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${WSPORT}/subscriptions`
}));

// Wrap the Express server
const ws = createServer(app);
ws.listen(WSPORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${WSPORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server: ws,
      path: '/subscriptions',
    });
});


const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
