const {Song} = require('./song_type');
const {Lyric} = require('./lyric_type');
const {Query} = require('./root_query_type');
const {Mutation} = require('./mutations');


const typeDefs = `
    ${Song}
    ${Lyric}
    ${Query}
    ${Mutation}
`;









module.exports = typeDefs;