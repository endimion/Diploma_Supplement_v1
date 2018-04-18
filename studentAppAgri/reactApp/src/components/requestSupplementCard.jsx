import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  Card  , CardPanel, Icon,
          Tag, Modal, Button, ProgressBar,
          CollectionItem, Collection,
          Row, Col,input} from 'react-materialize'

import  {Redirect
        } from 'react-router-dom'

import RequestSupplementModal from "./requestSupplementModal.jsx"

import {  requestPublication,
          updateUnivId,
          updateEmail,
          updateUniversity
        } from "../actions/requestSupplementActions"


@connect( (store)=>{
  return {  university: store.publish.univsersity ,
            univId:store.publish.univId,
            email: store.publish.email,
            modal:store.publish.modal,
            fullfiled:store.publish.requestFullfiled,
            eId: store.user.user.eid,
            userName: store.user.user.firstName + " " + store.user.user.lastName,
            dateOfBirth: store.user.user.dateOfBirth
        };
})

export default class RequestSupplementCard extends React.Component {

  constructor(props) {
    super(props);
    this.sendPubrequest = this.sendPubrequest.bind(this);
    this.updateMail = this.updateMail.bind(this);
    this.updateUnivValue = this.updateUnivValue.bind(this);
    this.updateUniversityId = this.updateUniversityId.bind(this);
  }

  componentDidMount(){
    $('.button-collapse').sideNav('hide');
  }

  componentWillReceiveProps(nextProps){
    $('.button-collapse').sideNav('hide');
  }

  componentWillMount(){
    $('.button-collapse').sideNav('hide');
  }

  sendPubrequest(){
    let university = this.props.university;
    // let userName = this.props.userName;
    // let eId = this.props.eId;
    let universityId = this.props.univId;
    let email = this.props.email;
    // let dateOfBirth = this.props.dateOfBirth;
    console.log(university,universityId,email);
                                        // university,username,eID,universityId,email,date
    this.props.dispatch(requestPublication(university,universityId,email));
  }


  updateUniversityId(univId){
    this.props.dispatch(updateUnivId(univId));
  }

  updateUnivValue(e){
    this.props.dispatch(updateUniversity(e.target.value));
  }

  updateMail(mail){
    this.props.dispatch(updateEmail(mail));
  }

  componentDidMount(){
    $(document).ready(function() {
      $('select').material_select();
    });
    $(this.refs.mySelectBox).on('change',this.updateUnivValue);
  }




  render(){
    if(!this.props.fullfiled){
      return (
        <div>
          <div className="container" style={{marginTop:"2em"}}>
          <Row>
            <div className="input-field col s12 l6">
              <i className="material-icons prefix">account_circle</i>
              <input id="universityId" type="text" class="validate" onChange={e =>this.updateUniversityId(e.target.value)}/>
              <label for="universityId">UniversityId</label>
            </div>
          </Row>
          <Row>
            <div className="input-field col s12 l6">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" class="validate" onChange={e =>this.updateMail(e.target.value)}/>
              <label for="email">Email</label>
            </div>
          </Row>
          <Row>
            <div className="col s12 l6">
              <span style={{float:"left", paddingLeft:"0"}} className="col s1"><Icon >account_balance</Icon></span>
                <div className="input-field col s11" style={{    marginLeft: "0" , paddingLeft:"0"}}>
                  <select ref="mySelectBox">
                    <option key="UAegean" value='UAegean'>University of the Aegean</option>
                    <option key="UAgr" value='UAgr'>Agricultural University of Athens</option>
                   </select>
                   <label style={{left:"0"}}>University</label>
                </div>
            </div>
          </Row>
          <Row>
              <Button style={{marginLeft: "0.5em"}} onClick={this.sendPubrequest}>Request</Button>
          </Row>


        </div>
        <RequestSupplementModal/>
      </div>
      );
    }

    return <Redirect from="/app/request" to={"/app"} push />
  }
}
