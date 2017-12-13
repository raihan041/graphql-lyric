const {SongResolvers} = require('./song_type');
const {LyricResolvers} = require('./lyric_type');
const {QueryResolvers} = require('./root_query_type');
const {MutationResolvers} = require('./mutations');



const resolvers = {
    Song : SongResolvers,
    Lyric : LyricResolvers,
    Query : QueryResolvers,
    Mutation : MutationResolvers
};

module.exports = resolvers;