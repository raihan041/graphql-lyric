const mongoose = require('mongoose');

const Lyric = mongoose.model('lyric');

const LyricType = `
  type Lyric {
    id:ID!
    likes: Int
    content: String
    song: Song!
  }

`;


const LyricResolvers = {
  song: (root,args) => {
    return Lyric.findById(root).populate('song')
    .then(lyric => {
      //console.log(lyric)
      return lyric.song
    });
  }
};

module.exports = {
  Lyric : LyricType, 
  LyricResolvers : LyricResolvers
};

