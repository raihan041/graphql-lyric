const {Song} = require('./song_type');
const {Lyric} = require('./lyric_type');
const {Query} = require('./root_query_type');
const {Mutation} = require('./mutations');
const {Subscription} = require('./subscriptions');


const typeDefs = `
    ${Song}
    ${Lyric}
    ${Query}
    ${Mutation}
    ${Subscription}
`;









module.exports = typeDefs;