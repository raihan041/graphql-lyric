
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');



const MutationType = `
  type Mutation {
    addSong(title: String): Song
    addLyricToSong(content: String, songId:ID): Song
    likeLyric(id:ID): Lyric
    deleteSong(id:ID): Song
  }
  `;


const resolveMutation = {
  addSong: (root,{title}) => {
    return (new Song({ title })).save();
  },
  addLyricToSong: (root, { songId, content }) => {
    return Song.addLyric(songId, content);
  },
  likeLyric: (root, { id }) => {
    return Lyric.like(id);
  },
  deleteSong: (root, { id }) => {
    return Song.remove({ _id: id });
  }
};

module.exports = {
  Mutation : MutationType, 
  MutationResolvers : resolveMutation
};

