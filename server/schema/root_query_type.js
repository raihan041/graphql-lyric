const mongoose = require('mongoose');
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');


const QueryType = `
  type Query {
    songs:[Song]
    song(id:ID!): Song
    lyric(id:ID!): Lyric
  }
`;


const resolveQuery = {
  songs: () => {
    return Song.find({});
  },
  song: (root, { id }) => {
    return Song.findById(id);
  },
  lyric: (root, { id }) => {
    return Lyric.findById(id);
  }
};

module.exports = {
  Query : QueryType, 
  QueryResolvers : resolveQuery
};
