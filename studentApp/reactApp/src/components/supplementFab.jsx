import React, { Component } from 'react'
import {  Button} from 'react-materialize'



export default class SupFab extends React.Component {

  constructor(props) {
      super(props);
    }

    render(){
      let isOwner = this.props.isOwner;
      if(!isOwner){
        return <p></p>
      }

      return (
          <div className="fixed-action-btn horizontal click-to-toggle" style={{position: "absolute", right:" 24px",bottom:"1.2em",zIndex: "997"}}>
              <a className="btn-floating btn-medium red"><i className="material-icons">share</i></a>
              <ul>
                  <li key={"mail"}><a className="btn-floating yellow darken-1 modal-trigger"
                                      style={{transform: "scaleY(0.4) scaleX(0.4) translateY(0px) translateX(40px)", opacity: "0"}}
                                      onClick={(e) =>{this.props.mailModal(this.props.supId)}}>
                                      <i className="material-icons">mail</i></a>
                  </li>
                  <li key={"qr"}><a className="btn-floating blue darken-1 modal-trigger"
                                    style={{transform: "scaleY(0.4) scaleX(0.4) translateY(0px) translateX(40px)", opacity: "0"}}
                                    onClick={(e) =>{this.props.qrModal(this.props.supId)}}><i className="material-icons">dashboard</i></a></li>
              </ul>
          </div>


        );
    }

}
