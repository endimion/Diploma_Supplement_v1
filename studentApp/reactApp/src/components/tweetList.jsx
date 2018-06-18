import React, { Component } from 'react'


export default class TweetList extends React.Component {
    render(){
      const  tweets = this.props.tweets;
      const tweetsList = tweets.map( (tweet) =>{
          return <li>{tweet.id} : {tweet.text}</li>;
      });
      return    <ul>
                    {tweetsList}
                </ul>;
    }

}
