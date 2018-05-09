import React, { Component } from 'react'
import {Navbar, NavItem, Button, Icon} from 'react-materialize'
import {Link,NavLink} from 'react-router-dom'
import SideNavigation from "./sideNav.jsx"
import Clock from "./clock.jsx";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import '../styles/navbar.css'

export default class NavigationBar extends React.Component {


  componentDidMount(){
    $(document).ready(function(){
      $(".button-collapse").sideNav();
    });
  }



  render(){
    const style = {
      // 'zIndex': '998!important',
      'backgroundColor':'#06114e!important'
    };
    // console.log("user");
    // console.log(this.props.user);

    // const account = <li><NavLink to="/">Account</NavLink></li>;

    /*
     //   return   <Navbar style={style} href="/app/" brand='e-DS Service' right fixed={true} className="blueBar">
    //   <li><NavLink to="/app/home">Home</NavLink></li>
    //   <li><NavLink to="/app/manage">Manage Supplements</NavLink></li>
    //   <li><NavLink to="/app/request">Request new Supplement</NavLink></li>
    //   <SideNavigation  trig={account} user= {this.props.user}/>
    // </Navbar>
    */
  //  <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>

  <SideNavigation user={this.props.user} style={{}}/>

    return (
        <div class="navbar-fixed" >
          <nav>
            <div class="nav-wrapper">

              <a href="#!" class="brand-logo hide-on-large-only" style={{left:"30%"}}> <Clock isMain={true}/></a>
              <a href="#!" class="brand-logo hide-on-large-only" style={{marginLeft: "5rem"}}> e-DS Service</a>

              <a href="#!" class="brand-logo hide-on-med-and-down" > <Clock isMain={false}/></a>
              <a href="#!" class="brand-logo hide-on-med-and-down" style={{marginLeft: "2rem"}}> e-DS Service</a>
              <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
              <ul class="right hide-on-med-and-down">
                {/* <li>
                  <a>
                    <Clock/>
                    <i class="material-icons">refresh</i>
                  </a>
                </li> */}
                <li><a href="/app/home">Home</a></li>
                <li><a href="/app/manage">Manage Supplements</a></li>
                <li><a href="/app/request">Request new Supplement</a></li>
                {/* <li><a href="mobile.html">Mobile</a></li> */}
                <li><a href="#" data-activates="slide-out" class="button-collapse show-on-large">Account</a></li>
              </ul>
              <ul class="side-nav" id="mobile-demo">
                <li><a href="/app/home">Home</a></li>
                <li><a href="/app/manage">Manage Supplements</a></li>
                <li><a href="/app/request">Request new Supplement</a></li>
                  <li><a href="#" data-activates="slide-out" class="button-collapse">Account</a></li>
              </ul>
            </div>
          </nav>
          <SideNavigation user={this.props.user} style={{zIndex:"999"}}/>
        </div>
      );



    }

  }
