const app = require('./server/server');
const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');

//schema
const schema = require('./server/schema/schema');// new makeExecutableSchema({ typeDefs, resolvers });
//subscription
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
// app.listen(4000, () => {
//   console.log('Listening');
// });
const PORT = 3000;

 app.use('*', cors({ origin: 'http://localhost:3000' }));

 app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
  }));
  
 app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  }));

const server = createServer(app);

server.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      // onOperation: (message, params, webSocket) => {
      //   return {  params,context: {mongo} }
      // }
      // onOperation: async (message, params, webSocket) => {
      //   context.publish = publish;
      //   context.pubsub = pubsub;
      //   context.settings = await context.api.getSettings();
      //   params.context = { ...params.context, ...context };
      //   return params;
      // }
    }, {
      server: server,
      path: '/subscriptions',
    });
});
