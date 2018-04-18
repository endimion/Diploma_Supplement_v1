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
      return (  <div className="main container" style={{marginTop: "3%"}}>
                  <div className="row">
                    <h5 className="col s12">
                      Your Personal Information
                    </h5>
                  </div>
                  <div className="row">
                    <form className="col s12">
                      <div className="row">
                        <div className="input-field col s12">
                          <input id="userName" style={{marginTop: "3em",color:"black"}} value={user.userName} type="text"  disabled />
                          <label for="userName"    data-success="right">User Name</label>
                        </div>
                        <div className="input-field col s12">
                          <input  id="currentFamilyName" style={{marginTop: "3em",color:"black"}} value={user.familyName} type="text" disabled />
                            <label for="currentFamilyName"   data-success="right">Family Name</label>
                        </div>
                        <div className="input-field col s12">
                          <input  id="currentFamilyName" style={{marginTop: "3em",color:"black"}} value={user.intFamilyName} type="text" disabled />
                            <label for="currentFamilyName"   data-success="right">Family Name in English</label>
                        </div>
                        <div className="input-field col s12">
                          <input  id="currentGivenName"  style={{marginTop: "3em",color:"black"}} value={user.firstName} type="text" disabled />
                            <label for="currentGivenName"   data-success="right">Given Name</label>
                        </div>
                        <div className="input-field col s12">
                          <input  id="currentGivenName"  style={{marginTop: "3em",color:"black"}} value={user.intFirstName} type="text" disabled />
                            <label for="currentGivenName"   data-success="right">Given Name in English</label>
                        </div>
                        <div className="input-field col s12">
                          <input  id="dateOfBirth" type="text" style={{marginTop: "3em",color:"black"}} value={user.dateOfBirth} disabled />
                            <label for="dateOfBirth"   data-success="right">Date of Birth</label>
                        </div>
                        <div className="input-field col s12">
                          <input  id="personIdentifier" type="text" style={{marginTop: "3em",color:"black"}}  value={user.personIdentifier} disabled />
                            <label for="personIdentifier" data-success="right">Person Identifier</label>
                        </div>
                      </div>
                      <div className="row">
                          <div className="col s12">
                              <a class="waves-effect waves-teal btn-flat" onClick={e =>this.logoutUser()}>Log out</a>
                          </div>
                      </div>
                    </form>
                  </div>
                </div>
          );
        }
}
