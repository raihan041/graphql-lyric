import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import {Link,hashHistory} from 'react-router';
import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends Component {

    onSongDelete(id){
        this.props.mutate({
            variables: {id:id}
        }).then(() => this.props.data.refetch());
    }

    renderSongs() {
        return(
            this.props.data.songs.map(({id,title}) => {
                return(
                    <li key={id} className="collection-item">
                        <Link to={`/songs/${id}`}>{title}</Link>
                        <i className="material-icons" onClick={()=> this.onSongDelete(id)}>delete</i>
                    </li>
                );
            })
        );
    }

    componentWillMount()
    {
        console.log(this.props.data);
        this.props.data.subscribeToMore({
            document: ON_ADD_MESSAGE_SUBSCRIPTION,
            // variables: {
            //     repoName: params.repoFullName,
            // },
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const song = subscriptionData.data.songAdded;
                return {
                    songs: [...prev.songs, song ]
                };
                
            }
        });

        // this.props.data.subscribeToMore({
        //     document: ON_DELETE_MESSAGE_SUBSCRIPTION,
        //     updateQuery: (prev, {subscriptionData}) => {
        //         if (!subscriptionData.data) {
        //             return prev;
        //         }

        //         const song = subscriptionData.data.songDeleted;
        //         if(song) return prev;
        //         return {
        //             ...prev,
        //             songs: [...prev.songs, song ]
        //         };
                
        //     }
        // });
    }

    render() {
        if(this.props.data.loading) return (<div>Loading ...</div>);
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link 
                    to ="/songs/new"
                    className ="btn-floating btn-large red right"
                >
                    <i className ="material-icons">add</i>
                </Link>
            </div>
            

        );
    }
}

const mutation = gql`
mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      title
    }
  }
  `;
  const ON_DELETE_MESSAGE_SUBSCRIPTION = gql`
  subscription {
      songDeleted{
        id
        title
      }
    }  
  `;

  const ON_ADD_MESSAGE_SUBSCRIPTION = gql`
  subscription {
      songAdded{
        id
        title
      }
    }  
  `;

export default graphql(mutation)
    (
        graphql(fetchSongsQuery)(SongList)
    );