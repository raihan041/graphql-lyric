
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const {withFilter } = require ('graphql-subscriptions');

const {pubsub} = require('./mutations');


const SubscriptionType = `
  type Subscription {
    songAdded: Song
    songDeleted: Song!
  }
  `;


const resolveSubscription = {
    songAdded: {     
        subscribe: () => pubsub.asyncIterator('songAdded')        
    },
    songDeleted: {      
        subscribe: withFilter(() => pubsub.asyncIterator('sondDeleted'), (payload, variables) => {
            return true;
        })        
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

