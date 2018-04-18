//This will be inside src/components

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import {sideBarOnOff} from '../actions/sideBarActions'
import {setUser } from '../actions/userActions'
import Cookies from 'universal-cookie';



import NavigationBar from "./navBar.jsx"
import SideNavigation from "./sideNav.jsx"
import HomePage from "./home.jsx"
import Supplements from "./supplements.jsx"
import EditSup from "./editSupplement.jsx"
import RequestSupplementCard from "./requestSupplementCard.jsx"
import InviteView from "./viewByInvite.jsx"
import AccountInfo from "./accountInfo.jsx"

@connect( (store)=>{
  return { user: store.user.user,
        };
})
export default class Container extends React.Component {

  constructor(props) {
    super(props);
  }


  static propTypes = {
   // location: React.PropTypes.object.isRequired
 }
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };

    componentWillMount(){
      // const { cookies } = this.props;
    }

    render(){
      const  {user,tweets,sideNav} = this.props;
      // const { cookies } = this.props;
      // let root = () => <div><NavigationBar user={user}/><Dummy user={user}/></div>;
      let home = () => {
        // let cookie = this.props.cookies;
        const cookies = new Cookies();
        let id = cookies.get("inviteHash");
        if(id){
          return <Redirect from="/app" to={"/app/invite/"+id} push />
        }else{
          return <div><NavigationBar user={user}/><HomePage user={user}/></div>;
        }
      }

      let manage = () => <div><NavigationBar user={user}/><Supplements user={user} /></div>;
      let request = () => <div><NavigationBar user={user}/><RequestSupplementCard name={"user"} eID={"eID"}/></div>;
      let edit = ({match}) => (<div><NavigationBar user={user}/><EditSup match={match}/></div> );
      let inviteView = ({match}) => {
                  if(user === undefined || user.firstName ==  undefined){
                    // return <Redirect from="/app" to="/login" push />
                    const cookies = new Cookies();
                    console.log("will set cookie!!");
                    cookies.set('inviteHash', match.params.id, { path: '/', maxAge:'120' });
                    console.log(cookies.get("inviteHash"));
                    window.location = '/login';
                  }else{
                    //<SharedSup match={match}/>
                    // return (<div><NavigationBar user={user}/></div> )
                    return <div><NavigationBar user={user}/><InviteView inviteId={match.params.id}/></div>;
                  }
      };
      let account = () =>  <div><NavigationBar user={user}/><AccountInfo  /></div>;

      return  <Router>
                  <Switch>
                    <Route path="/app/" exact component={home} />
                    <Route path="/app/test" exact component={home} />
                    <Route path="/app/home" exact component={home} />
                    <Route path="/app/manage" exact component={manage} />
                    <Route path="/app/request" exact component={request} />
                    <Route path="/app/edit/:id" component={edit}/>
                    <Route path="/app/invite/:id" component={inviteView}/>
                      <Route path="/app/account" component={account}/>
                  </Switch>
                </Router>

      // return null;
    }

}
