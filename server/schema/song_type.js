const mongoose = require('mongoose');
const Song = mongoose.model('song');



const SongType = `
type Song {
  id:ID!
  title: String
  lyrics: [Lyric]
}
`;


const SongResolvers = {
  lyrics: (root) => {
    return  Song.findLyrics(root.id);
  }
};

module.exports = {
  Song : SongType, 
  SongResolvers : SongResolvers
};

