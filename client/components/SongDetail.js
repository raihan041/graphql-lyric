import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import {Link,hashHistory} from 'react-router';
import fetchSongDetailQuery from '../queries/fetchSongDetail';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        this.props.data.subscribeToMore({
            document: ON_ADD_LYRIC_SUBSCRIPTION,
            variables: {
                songId: this.props.params.id,
            },
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const song = subscriptionData.data.lyricAdded;
                return {
                    ...prev,
                    song
                };
                
                
            }
        });

    }

    render() {
        if(this.props.data.loading) return (<div>Loading ...</div>);

        if(!this.props.data.song) return (<h3>No song found</h3>);
        //console.log(this.props);
        const { song } = this.props.data;
        return (         
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                
                <LyricCreate songId={this.props.params.id}/>
            </div>
        );
    }
}

const ON_ADD_LYRIC_SUBSCRIPTION = gql`
subscription LyricAdded($songId: ID!) {
    lyricAdded(songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;


export default graphql(fetchSongDetailQuery,{
    options: (props) => {
        return {
            variables: { id:props.params.id }
        }       
    }
})(SongDetail);
