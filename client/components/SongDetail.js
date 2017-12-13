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

export default graphql(fetchSongDetailQuery,{
    options: (props) => {
        return {
            variables: { id:props.params.id }
        }       
    }
})(SongDetail);
