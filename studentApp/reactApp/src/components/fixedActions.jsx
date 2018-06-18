import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card  , CardPanel, ProgressBar, Row, Col} from 'react-materialize'
import {Link} from 'react-router-dom'

import {logout} from '../actions/userActions'

import SupplementCard from './supplementCard.jsx'



@connect( (store)=>{
  return { user: store.user.user,
        };
})
export default class  AccountInfo extends React.Component {

  constructor(props) {
      super(props);
      this.logoutUser = this.logoutUser.bind(this);
  }

  componentDidMount(){
    $('.button-collapse').sideNav('hide');
  }

  componentWillReceiveProps(){
    $('.button-collapse').sideNav('hide');
  }


  logoutUser(){
    this.props.dispatch(logout);
  }

 render(){
     const  user = this.props.user;
      return ( <div class="fixed-action-btn">
                <a class="btn-floating btn-large red">
                  <i class="large material-icons">mode_edit</i>
                </a>
                <ul>
                  <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                  <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                  <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                  <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                </ul>
              </div>
          );
        }
}
