import React, { Component } from 'react'
import {Navbar, NavItem, Button, Icon} from 'react-materialize'
import {Link,NavLink} from 'react-router-dom'
import SideNavigation from "./sideNav.jsx"

import '../styles/navbar.css'

export default class NavigationBar extends React.Component {


      render(){
        const style = {
          'zIndex': '998!important'
        };


        const account = <li><NavLink to="/">Account</NavLink></li>;
        return   <Navbar style={style} href="/app/" brand='DS Service' right fixed={true}>
                 <li><NavLink to="/app/home">Home</NavLink></li>
	               <li><NavLink to="/app/manage">Manage Supplements</NavLink></li>
                 <li><NavLink to="/app/request">Request new Supplement</NavLink></li>
                 <SideNavigation  trig={account} user= {this.props.user}/>
              </Navbar>

    }

}
