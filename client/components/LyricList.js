import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';

class LyricList extends Component {
    constructor(props)
    {
        super(props);
    }
    onLyricLike(id,likes)
    {
        this.props.mutate({
            variables: {id},
            optimisticResponse:{
                __typename:'Mutation',
                LikeLyric:{
                    
                    id,
                    likes : likes + 1,
                    __typename: 'LyricType'
                }

            }
        });
    }
    renderSongs() {
        return(
            this.props.lyrics.map(({id,content,likes}) => {
                return(
                    <li key={id} className="collection-item">
                        {content}
                        <div className="vote-box">
                            <i className="material-icons" onClick={()=> this.onLyricLike(id,likes)}>thumb_up</i>
                            {likes}
                        </div>
                    </li>
                );
            })
        );
    }
    render() {
        return (
            <div>
                <label>lyrics:</label>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
            </div>
        );
    }
}

const mutation = gql`
mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }  
`;

export default graphql(mutation)(LyricList);