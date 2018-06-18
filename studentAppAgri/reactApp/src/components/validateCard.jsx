import React, { Component } from 'react'
import {connect} from 'react-redux'

import {  Card  , CardPanel, Icon,
          Tag, Modal, Button, ProgressBar,
          CollectionItem, Collection,
          Row, Col,input} from 'react-materialize'


import RequestSupplementModal from "./requestSupplementModal.jsx"

import { updateCode, sendValidation
        } from "../actions/inviteActions"


@connect( (store)=>{
  return {
            code: store.invite.code,

        };
})

export default class ValidateCard extends React.Component {

  constructor(props) {
    super(props);
    this.updateCode = this.updateCode.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(){
    let id = this.props.inviteId;
    this.props.dispatch(sendValidation(this.props.code,id));
  }


  updateCode(code){
    this.props.dispatch(updateCode(code));
  }


componentDidMount(){
    // $(document).ready(function() {
    //   $('select').material_select();
    // });
    // $(this.refs.mySelectBox).on('change',this.updateUnivValue);
  }




  render(){
    return (
      <div>
        <div className="container" style={{marginTop:"2em"}}>
        <Row>
          <div className="input-field col s6">
            <input id="code" type="text" class="validate" onChange={e =>this.updateCode(e.target.value)}/>
            <label for="Code">Validation Code</label>
          </div>
        </Row>
         <Row>
            <Button onClick={this.validate}>Validate</Button>
        </Row>
      </div>
    </div>

    );
  }
}
