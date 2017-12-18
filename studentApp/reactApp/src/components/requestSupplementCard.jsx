import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  Card  , CardPanel, Icon,
          Tag, Modal, Button, ProgressBar,
          CollectionItem, Collection,
          Row, Col,input} from 'react-materialize'


import RequestSupplementModal from "./requestSupplementModal.jsx"

import {  requestPublication,
          updateUnivId,
          updateEmail,
          updateUniversity
        } from "../actions/requestSupplementActions"


@connect( (store)=>{
  return {  university: store.publish.university ,
            univId:store.publish.univId,
            email: store.publish.email,
            modal:store.publish.modal,
            eId: store.user.user.eid,
            userName: store.user.user.firstName + " " + store.user.user.lastName
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

  sendPubrequest(){
    let university = this.props.university;
    let userName = this.props.userName;
    let eId = this.props.eId;
    let universityId = this.props.universityId;
    let email = this.props.email;

    this.props.dispatch(requestPublication(university,userName,eId,universityId,email));
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
    return (
      <div>
        <div className="container" style={{marginTop:"2em"}}>
        <Row>
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input id="universityId" type="text" class="validate" onChange={e =>this.updateUniversityId(e.target.value)}/>
            <label for="universityId">UniversityId</label>
          </div>
        </Row>
        <Row>
          <div className="input-field col s6">
            <i className="material-icons prefix">email</i>
            <input id="email" type="email" class="validate" onChange={e =>this.updateMail(e.target.value)}/>
            <label for="email">Email</label>
          </div>
        </Row>
        <Row>
          <div>
            <span style={{float:"left", marginLeft:"1.1em"}}><Icon >account_balance</Icon></span>
              <div className="input-field col s6">
                <select ref="mySelectBox">
                  <option key="UAegean" value='UAegean'>University of the Aegean</option>
                  <option key="UAgr" value='UAgr'>Agricultural University of Athens</option>
                 </select>
                 <label>University</label>
              </div>
          </div>
        </Row>
        <Row>
            <Button onClick={this.sendPubrequest}>Submit</Button>
        </Row>


      </div>
      <RequestSupplementModal/>
    </div>
    );
  }
}