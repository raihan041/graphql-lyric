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
const PORT = 2000;

 app.use('*', cors({ origin: 'http://localhost:7000' }));

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
    }, {
      server: server,
      path: '/subscriptions',
    });
});
