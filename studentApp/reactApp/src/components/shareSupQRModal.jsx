import React, { Component } from 'react'
import {connect} from 'react-redux'
import InlineSVG from 'svg-inline-react';
import {  Input, Button, ProgressBar, Icon,
          Row, Col} from 'react-materialize'


import SupFab from './supplementFab.jsx'
import SupBtns from './supplementBtns.jsx'

import {addUserToRem, remUsers} from '../actions/editSupplementActions'
import {shareByQR} from '../actions/supplementActions'


@connect( (store)=>{
  return {  sharingQR: store.sups.sharingQR,
            shareErrorQR: store.sups.shareErrorQR,
            QR : store.sups.QR
        };
})
export default class ShareByQRModal extends React.Component {

  constructor(props) {
    super(props);

    this.getContents = this.getContents.bind(this);
  }

  componentDidMount(){
    $(document).ready(function(){
      $('.modal').modal();
    });
  }


  share(mail){
    this.props.dispatch(shareByQR(this.props.sup.Id,mail));
  }

  getContents(){
    if(this.props.sharingQR === true){
     return <ProgressBar/>;
    }
    if(this.props.shareErrorQR != null){
      return <div>Something went wrong: <span>{this.props.shareError}</span></div>
    }

    if(this.props.QR != null){
      return <Row>
                <Col s={6} >
                    <InlineSVG style={{height:"7em"}} src={this.props.QR} />
                </Col>
                <Col s={6} >
                    <div><span>Save this image and add it to your CV to</span></div>
                    <div><span>share this supplement</span></div>
                </Col>
            </Row>
    }

    return <div>
            <Row>
             <Input id={"qremail"} type="email" label="Email" s={12} ><Icon>account_circle</Icon></Input>
            </Row>
            <Button onClick={(e)=>{
                let mail= document.getElementById("qremail").value;
                this.share(mail);
              }}>Share</Button>
          </div>;
  }

  render(){
      let contents = this.getContents();
      return (
       <div id={"qrModal"+this.props.sup.Id} class="modal">
           <div class="modal-content">
             <h4>Share Supplement By QR code</h4>
              {contents}
           </div>
         </div>
        );
  }
}
