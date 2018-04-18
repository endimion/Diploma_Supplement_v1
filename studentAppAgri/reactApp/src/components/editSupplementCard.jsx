import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  Card  , CardPanel,
          Tag, Modal, Button, ProgressBar,
          CollectionItem, Collection,
          Row, Col} from 'react-materialize'


import SupFab from './supplementFab.jsx'
import SupBtns from './supplementBtns.jsx'
import EditSupplementModal from './supplementModal.jsx'

import {addUserToRem, remUsers} from '../actions/editSupplementActions'

@connect( (store)=>{
  return {  usersToRem: store.edit.usersToRem ,
            removingUser:store.edit.removingUser,
            removedUser: store.edit.removedUser,
            remError:store.edit.remError
        };
})
export default class EditSupplementCard extends React.Component {

  constructor(props) {
   super(props);
   this.addRemUser = this.addRemUser.bind(this);
   this.remUsers = this.remUsers.bind(this);
  }



  addRemUser(user){
    this.props.dispatch(addUserToRem(user));
  }

  remUsers(supId){
    this.props.dispatch(remUsers(supId,this.props.usersToRem));
  }


  render(){
    const  {sup} = this.props;
    const authorized = sup.Authorized.map((user)=> {return user.Email}).map( (user) => {
        return (<div key={user}  onClick={(e) => this.addRemUser(user)}> <Tag>{user}</Tag> </div>);
    });

    let usersInfo = this.props.usersToRem.map((user)=>{return <span key={user}> {user} </span>});

    let res = null;
    if(this.props.usersToRem.length > 0){
      return <div>
        <div className="row">
         <div className="col s12 m6">
           <div className="card ">
             <div className="card-content">
               <span className="card-title">Supplement : {sup.Id}</span>
                <span>Authorized Users:</span>
                <div>
                  {authorized}
                </div>
             </div>
           </div>
         </div>
       </div>
      <EditSupplementModal/>
        <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Will Remove Access from:</span>
              <p>{usersInfo}</p>
            </div>
            <div class="card-action">
              <div className="card-action">
                     <a class="waves-effect waves-light btn modal-trigger"
                             onClick={(e)=>{this.remUsers(sup.Id)}}>Remove Users</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    }



    return (
      <div>
        <div className="row">
         <div className="col s12 m6">
           <div className="card ">
             <div className="card-content">
               <span className="card-title">Supplement : {sup.Id}</span>
                <span>Authorized Users:</span>
                <div>
                  {authorized}
                </div>
             </div>

           </div>
         </div>
       </div>
      <EditSupplementModal/>
    </div>
    );
  }
}
