
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const { SubscriptionManager } = require ('graphql-subscriptions');

const {pubsub} = require('./mutations');


const SubscriptionType = `
  type Subscription {
    songAdded(title: String): Song
    songDeleted(id: ID): Song
  }
  `;


const resolveSubscription = {
    songAdded: (root,{title}) => {
        
        subscribe: withFilter(() => pubsub.asyncIterator('commentAdded'), (payload, variables) => {
            return payload.commentAdded.repository_name === variables.repoFullName;
        });
          
    },
//   addLyricToSong: (root, { songId, content }) => {
//     return Song.addLyric(songId, content);
//   },
//   likeLyric: (root, { id }) => {
//     return Lyric.like(id);
//   },
//   deleteSong: (root, { id }) => {
//     return Song.remove({ _id: id });
//   }
};

module.exports = {
    Subscription : SubscriptionType, 
    SubscriptionResolvers : resolveSubscription
};

