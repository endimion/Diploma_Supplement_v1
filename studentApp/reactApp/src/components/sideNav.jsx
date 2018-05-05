import React, { Component } from 'react'
import {connect} from 'react-redux'
import {SideNav, SideNavItem, Button, Icon} from 'react-materialize'
import {logout} from '../actions/userActions'

import officeImg from '../static/img/office.jpg';
import accountImg from '../static/img/user.png';

@connect( (store)=>{
  return { };
})
export default class SideNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(){
    this.props.dispatch(logout);
  }

    render(){
      const user = this.props.user;
      // console.log("user2");
      // console.log(this.props.user);
      // return   <SideNav
      //           	trigger={this.props.trig}
      //           	options={{ closeOnClick: true }}
      //             ref={this.props.inputRef}
      //           	>
      //           	<SideNavItem userView
      //           		user={{
      //           			background: officeImg,
      //           			image: accountImg,
      //           			name: user.firstName + " " + user.lastName,
      //           			email: user.email,
      //                 userName: user.userName
      //
      //           		}}
      //           	/>
      //             <SideNavItem subheader> Information </SideNavItem>
      //             <SideNavItem divider />
      //             <SideNavItem> {"First Name:" + user.firstName}</SideNavItem>
      //             <SideNavItem>  {"Last Name:" +user.lastName}</SideNavItem>
      //             <SideNavItem> { "International First Name:" + user.intFirstName}</SideNavItem>
      //             <SideNavItem>  {"International Last Name:" +user.intFamilyName}</SideNavItem>
      //             <SideNavItem>  {"UserName:" + user.userName}</SideNavItem>
      //             <SideNavItem subheader>Actions</SideNavItem>
      //           	<SideNavItem divider />
      //           	<SideNavItem> <div onClick={e =>this.logoutUser()}>Logout</div></SideNavItem>
      //           </SideNav>

      // <li>
      //  <div class="userView">
      //    <div class="background">
      //       <img src="/img/office.jpg">
      //    </div>
      //     <a href="#!user"><img class="circle" src="/img/user.png"></a>
      //     <a href="#!name">
      //        span.white-text.name #{firstName} #{lastName}
      //     </a>
      //     <a href="#!email">
      //        span.white-text.email #{email}
      //     </a>
      //  </div>
      // </li>
  //    <a href="#!name"><span class="white-text name">{"First Name:" + user.firstName}</span></a>
      return (
        <ul id="slide-out" class="side-nav" style={this.props.style}>
          <li>
            <div class="userView">
              <div class="background">
                <img src={officeImg}/>
              </div>
              <a href="#!user"><img class="circle" src={accountImg}/></a>
              <a href="#!name"><span style={{color:"white"}} >Profile Information</span></a>
            </div>
          </li>
          <a href="#!name"><span >{"First Name:" + this.props.user.firstName}</span></a>
          <a href="#!email"><span > {"Last Name:" +user.lastName}</span></a>
          <a href="#!name"><span >{ "International First Name:" + user.intFirstName}</span></a>
          <a href="#!email"><span >{"International Last Name:" +user.intFamilyName}</span></a>
          <li><div class="divider"></div></li>
          <li><a style={{cursor:"pointer"}} onClick={e =>this.logoutUser()}><span>Logout</span></a></li>
        </ul>
      );
    }

}
