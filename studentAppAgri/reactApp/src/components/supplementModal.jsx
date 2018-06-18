import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  Card  , CardPanel,
          Tag, Modal, Button, ProgressBar,
          CollectionItem, Collection,
          Row, Col} from 'react-materialize'


import SupFab from './supplementFab.jsx'
import SupBtns from './supplementBtns.jsx'

import {addUserToRem, remUsers} from '../actions/editSupplementActions'

@connect( (store)=>{
  return {  usersToRem: store.edit.usersToRem ,
            removingUser:store.edit.removingUser,
            removedUser: store.edit.removedUser,
            remError:store.edit.remError
        };
})
export default class EditSupplementModal extends React.Component {

  constructor(props) {
   super(props);

  }

  componentDidMount(){
    $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }

  render(){

    return (
       <div id="modal1" class="modal">
           <div class="modal-content">
             <h4>Saving Changes to supplement</h4>
             <ProgressBar />
           </div>
         </div>
        );
  }
}
