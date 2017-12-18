import { split, concat, ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error'
import ApolloClient,{createNetworkInterface} from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true
});

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin'
    }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export default new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    dataIdFromObject: o => o.id
});