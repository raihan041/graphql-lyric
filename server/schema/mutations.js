
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const { PubSub, SubscriptionManager } = require ('graphql-subscriptions');

const pubsub = new PubSub();


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
    let song =  (new Song({ title })).save();
    pubsub.publish('newSong', {song: song});
    return song;
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
  MutationResolvers : resolveMutation,
  pubsub
};

