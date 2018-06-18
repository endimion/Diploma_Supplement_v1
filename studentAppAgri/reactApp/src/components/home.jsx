import React, { Component } from 'react'
import {Card  , CardPanel, CardTitle, Row, Col} from 'react-materialize'
import {Link} from 'react-router-dom'
import SideNavigation from "./sideNav.jsx"

import '../styles/navbar.css'


import supImg from '../static/img/manage-documents.png';
import accountImg from '../static/img/publish-document.png';
import manageImg from '../static/img/manage-user.png';


export default class HomePage extends React.Component {

      componentDidMount(){
        $('.button-collapse').sideNav('hide');
      }

      componentWillReceiveProps(){
        $('.button-collapse').sideNav('hide');
      }

      render(){

        const imgStyle = {margin: "0 auto", display: "block"};
        const imgTitleStyle = {width: "100%",
                              background:" rgba(54, 25, 25, .3)"};

        let manageCard = <div className="card">
          <div className="card-image">
            <img src={supImg} style={imgStyle}></img>
            <span className="card-title" style={imgTitleStyle}>Manage Supplements</span>
          </div>
          <div className="card-content">
            <p>View published supplements, manage user access</p>
          </div>
          <div className="card-action">
            <Link to="/app/manage">View Supplements</Link>
          </div>
        </div>;

        let requestCard = <div className="card">
          <div className="card-image">
            <img src={accountImg} style={ {margin: "0 auto", display: "block", width: "59%"}}></img>
            <span className="card-title" style={imgTitleStyle}>Request Supplement</span>
          </div>
          <div className="card-content">
            <p>Request the publication of a Diploma Supplement.</p>
          </div>
          <div className="card-action">
            <Link to="/app/request">Request</Link>

          </div>
        </div>;

        let accountCard = <div className="card">
          <div className="card-image">
            <img src={manageImg} style={ {margin: "0 auto", display: "block", width: "65%"}}></img>
            <span className="card-title" style={imgTitleStyle}>Manage Account</span>
          </div>
          <div className="card-content">
            <p>Review your account details</p>
          </div>
          <div className="card-action">
            <Link to="/app/account">Review Account</Link>
          </div>
        </div>;





        return (  <div className="main container" style={{marginTop: "3%"}}>
              <Row key={1}>
                <Col s={12} m={6} className='grid-example'>
                    {manageCard}
                </Col>
                <Col s={12} m={6}className='grid-example'>{requestCard}</Col>
              </Row>
              <Row>
                <Col s={12} m={6} className='grid-example'>
                        {accountCard}
                </Col>
              </Row>
            </div>
            );



    }

}
