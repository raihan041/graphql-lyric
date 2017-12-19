const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const {withFilter } = require ('graphql-subscriptions');

const pubsub = require ('../helper/pubsub.js');

export default {
    Song : {
        lyrics: (root) => {
          return  Song.findLyrics(root.id);
        }
    },
    Lyric : {
        song: (root,args) => {
          return Lyric.findById(root).populate('song')
          .then(lyric => {
            //console.log(lyric)
            return lyric.song
          });
        }
    },
    Query : {
        songs: () => {
          return Song.find({});
        },
        song: (root, { id }) => {
          return Song.findById(id);
        },
        lyric: (root, { id }) => {
          return Lyric.findById(id);
        }
    },
    Mutation : {
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
    },
    Subscription: {
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
        }
    }
};