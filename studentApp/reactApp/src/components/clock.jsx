import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  reduceTime,
  restartClock
} from "../actions/userActions"


@connect( (store)=>{
  return {  minutes: store.clock.timeOutMinutes,
    seconds: store.clock.timeOutSeconds
  };
})
export default class Clock extends React.Component {





  constructor(props) {
    super(props);
    // this.validateInvite = this.validateInvite.bind(this);
    // this.props.time="13:00"
    this.reduceTimeFunc = this.reduceTimeFunc.bind(this);
    this.restartClock = this.restartClock.bind(this);
  }


  componentDidMount(){
    this.props.dispatch(restartClock());
    setInterval(function() { this.reduceTimeFunc(); }.bind(this), 1000);
  }




  reduceTimeFunc(){
    // console.log("redcueTime");
    // console.log(this.props.minutes);
    // console.log(this.props.seconds);
    this.props.dispatch(reduceTime(this.props.minutes,this.props.seconds));
  }

  restartClock(){
    this.props.dispatch(restartClock());
  }

  render(){
    let seconds = this.props.seconds;
    let minutes = this.props.minutes;
    if(this.props.seconds < 10){
      seconds = "0"+this.props.seconds;
    }
    if(this.props.minutes < 10){
      minutes = "0"+this.props.minutes;
    }

    return (
      <span>
        <span className="hide-on-large-only" style={{marginLeft:"1rem", fontSize: "0.8rem"}}>
          <span > <i style={{marginLeft: "1rem" }} class="material-icons" onClick={this.restartClock}>refresh</i></span>
          <span style={{marginRight: "1rem",fontSize: "1.5rem"}}><i>{minutes + ":" + seconds}</i></span>
        </span>
        <span className="hide-on-med-and-down" style={{fontSize: "1rem"}}>
          <span > <i style={{marginLeft: "52rem"}} class="material-icons" onClick={this.restartClock}>refresh</i></span>
          <span>
            <i style={{fontSize: "1rem"}}>{"Session expires in: "+ minutes + ":" + seconds}</i>
          </span>
        </span>

      </span>);
    }

  }
