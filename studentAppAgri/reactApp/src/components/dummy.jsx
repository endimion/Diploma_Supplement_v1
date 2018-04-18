
import React, { Component } from 'react'



export default class Dummy extends React.Component {
    render(){
      const user = this.props.user;
      return  <h1>Hello World from {user.name}!</h1>
    }

}
