
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const pubsub = require ('../helper/pubsub.js');

class SongType {
  constructor(id) {
    this.id = id;
    this.title = "";
    this.lyrics = null;
  }
}

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
    let songAdded =  (new Song({ title })).save();
    pubsub.publish('songAdded',{songAdded});
    return songAdded;
  },
  addLyricToSong: (root, { songId, content }) => {
    let lyricAdded = Song.addLyric(songId, content);
    pubsub.publish('lyricAdded',{
      lyricAdded,
      songId
    });
    return lyricAdded;
  },
  likeLyric: (root, { id }) => {
    let lyricIsLiked = Lyric.like(id);
    pubsub.publish('lyricIsLiked',{lyricIsLiked});
    return lyricIsLiked;
  },
  deleteSong: (root, { id }) => {
    let songDeleted = Song.remove({ _id: id });//Song.findById(id);
    var songInfo = new SongType(id=id);
    pubsub.publish('songDeleted',{songDeleted:songInfo});
    
    return songDeleted;
  }
};

module.exports = {
  Mutation : MutationType, 
  MutationResolvers : resolveMutation
};

