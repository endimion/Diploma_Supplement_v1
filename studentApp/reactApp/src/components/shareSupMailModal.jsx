import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  Input, Button, ProgressBar, Icon,
          Row, Col} from 'react-materialize'


import SupFab from './supplementFab.jsx'
import SupBtns from './supplementBtns.jsx'

import {addUserToRem, remUsers} from '../actions/editSupplementActions'
import {shareByMail} from '../actions/supplementActions'


@connect( (store)=>{
  return {  sharing: store.sups.sharing,
            shareError: store.sups.shareError
        };
})
export default class ShareByMailModal extends React.Component {

  constructor(props) {
    super(props);

    this.getContents = this.getContents.bind(this);
  }

  componentDidMount(){
    $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }


  share(mail){
    console.log("shareSupMailModala:: share fnct called");
    this.props.dispatch(shareByMail(this.props.sup.Id,mail));
  }

  getContents(){
    if(this.props.sharing === true){
     return <ProgressBar/>;
    }
    if(this.props.shareError != null){
      return <div>Something went wrong: <span>{this.props.shareError}</span></div>
    }

    return <div>
            <Row>
            <div className="col s12">Add recipient email addresses separated by ";" or ","</div>
             <Input id={"email"} type="email" label="Email" s={12} ><Icon>account_circle</Icon></Input>
            </Row>
            <Button onClick={ (e) =>{
                let mail= document.getElementById("email").value;
                this.share(mail);
              }}>Share</Button>
          </div>;
  }

  render(){
      let contents = this.getContents();
      return (
       <div id={"mailModal"+this.props.sup.Id} class="modal">
           <div class="modal-content">
             <h4>Share Supplement By Email</h4>
              {contents}
           </div>
         </div>
        );
  }
}
