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
      return   <SideNav
                	trigger={this.props.trig}
                	options={{ closeOnClick: true }}
                  ref={this.props.inputRef}
                	>
                	<SideNavItem userView
                		user={{
                			background: officeImg,
                			image: accountImg,
                			name: user.firstName + " " + user.lastName,
                			email: user.email,
                      userName: user.userName

                		}}
                	/>
                  <SideNavItem subheader> Information </SideNavItem>
                  <SideNavItem divider />
                  <SideNavItem> {"First Name:" + user.firstName}</SideNavItem>
                  <SideNavItem>  {"Last Name:" +user.lastName}</SideNavItem>
                  <SideNavItem> { "International First Name:" + user.intFirstName}</SideNavItem>
                  <SideNavItem>  {"International Last Name:" +user.intFamilyName}</SideNavItem>
                  <SideNavItem>  {"UserName:" + user.userName}</SideNavItem>
                  <SideNavItem subheader>Actions</SideNavItem>
                	<SideNavItem divider />
                	<SideNavItem> <div onClick={e =>this.logoutUser()}>Logout</div></SideNavItem>
                </SideNav>
    }

}
