
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const {withFilter } = require ('graphql-subscriptions');

const pubsub = require ('../helper/pubsub.js');


const SubscriptionType = `
  type Subscription {
    songAdded: Song!
    songDeleted: Song!
    lyricAdded(songId:ID!): Song!
    lyricIsLiked: Lyric! 
  }
  `;


const resolveSubscription = {
    songAdded:  {     
        subscribe: () => pubsub.asyncIterator('songAdded')        
    },
    songDeleted: {      
        subscribe: () => pubsub.asyncIterator('songDeleted')        
    },
    lyricAdded:{
        subscribe: withFilter(
            () => pubsub.asyncIterator('lyricAdded'),
            (payload, args) => payload.songId === args.songId,
          )
    },
    lyricIsLiked:{
        subscribe: () => pubsub.asyncIterator('lyricIsLiked')
    },
//   deleteSong: (root, { id }) => {
//     return Song.remove({ _id: id });
//   }
};

module.exports = {
    Subscription : SubscriptionType, 
    SubscriptionResolvers : resolveSubscription
};

