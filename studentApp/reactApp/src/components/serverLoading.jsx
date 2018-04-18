import React, { Component } from 'react'
import {Navbar, NavItem, Button, Icon, Preloader} from 'react-materialize'
import {Link,NavLink} from 'react-router-dom'
import SideNavigation from "./sideNav.jsx"
import NavigationBar from "./navBar.jsx"



export default class ServerLoading extends React.Component {

//// <NavigationBar user={user}/>
      render(){
        let user = this.props.user;
        return (
              <div className ="container" style={{marginTop:"2em"}}>
                <div className="row" style={{marginLeft:"50%"}}>
                  <Preloader  size="big" flashing />
                </div>
              </div>
          )  ;

    }

}
