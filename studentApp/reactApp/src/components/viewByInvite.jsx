import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  Card  , CardPanel, Icon,
          Tag, Modal, Button, ProgressBar,
          CollectionItem, Collection,
          Row, Col,input} from 'react-materialize'


import RequestSupplementModal from "./requestSupplementModal.jsx"
import SupplementCard from "./supplementCard.jsx"
import ValidateCard from "./validateCard.jsx"

import {  getInvAndGenValCode
        } from "../actions/inviteActions"


@connect( (store)=>{
  return {  eId: store.user.user.eid,
            fetching : store.invite.fetching,
            message : store.invite.message,
            supplements: store.invite.supplements,
            validate: store.invite.validate
        };
})
export default class InviteViewCard extends React.Component {

  constructor(props) {
    super(props);
    this.validateInvite = this.validateInvite.bind(this);
  }

  validateInvite(){
    //this.props.dispatch(requestPublication(university,userName,eId,universityId,email));
  }

  componentDidMount(){
      let id = this.props.inviteId;
      this.props.dispatch(getInvAndGenValCode(id));
  }

  render(){
    if(this.props.fetching){
      return (<div className="container" style={{marginTop:"10%"}}>
              <div className="row">
                <div className="col s12 m12 l12">
                  {this.props.message}
                </div>
                <div className="col s12 m12 l12">
                  <ProgressBar />
                </div>
              </div>

              </div>);
    }else{
      if(this.props.error){
        return (<div className="container" style={{marginTop:"10%"}}>{this.props.error}</div>
        );
      }
      if(this.props.supplements.length > 0){
          let sups = this.props.supplements;
          let supCards = sups.map(sup =>{
                  return <SupplementCard key={sup.Id} sup={sup}
                            restricted={true}
                           />
                });
        return (  <div className="main container" style={{marginTop: "3%"}}>
                   {supCards}
            </div>
            );
      }
      if(this.props.validate){
          return (<div className="main container" style={{marginTop: "3%"}}>
                    <ValidateCard inviteId={this.props.inviteId}/>
              </div>);
      }




      return (<div className="container" style={{marginTop:"10%"}}>Not fetching</div>
      );
    }


  }
}
