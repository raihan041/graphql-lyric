export default `
    type Song {
        id:ID!
        title: String
        lyrics: [Lyric]
    }
    type Lyric {
        id:ID!
        likes: Int
        content: String
        song: Song!
    }
    type Query {
        songs:[Song]
        song(id:ID!): Song
        lyric(id:ID!): Lyric
    }
    type Mutation {
        addSong(title: String): Song
        addLyricToSong(content: String, songId:ID): Song
        likeLyric(id:ID): Lyric
        deleteSong(id:ID): Song
    }
    type Subscription {
        songAdded: Song!
        songDeleted: Song!
        lyricAdded(songId:ID!): Song!
        lyricIsLiked: Lyric! 
    }
`;
