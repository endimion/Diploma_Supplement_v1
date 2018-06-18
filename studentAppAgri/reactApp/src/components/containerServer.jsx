//This will be inside src/components

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import StaticRouter from 'react-router-dom/StaticRouter';

import {sideBarOnOff} from '../actions/sideBarActions'
import {setUser } from '../actions/userActions'

import { withCookies, Cookies } from 'react-cookie';

import {  Card  , CardPanel, Icon,
          Tag, Modal, Button, ProgressBar,
          CollectionItem, Collection,
          Row, Col,input, Preloader} from 'react-materialize'



import TweetList from "./tweetList.jsx"
import NavigationBar from "./navBar.jsx"
import SideNavigation from "./sideNav.jsx"
import Dummy from "./dummy.jsx"
import HomePage from "./home.jsx"
import Supplements from "./supplements.jsx"
import EditSup from "./editSupplement.jsx"
import RequestSupplementCard from "./requestSupplementCard.jsx"
import ServerLoading from "./serverLoading.jsx"
import AccountInfo from "./accountInfo.jsx"

@connect( (store)=>{
  return { user: store.user.user,
        };
})
export default class Container extends React.Component {

  constructor(props) {
    super(props);
  }


    componentWillMount(){
      // const { cookies } = this.props;
      // const  userAccount = {
      //   firstName: "Nikos ",
      //   lastName: "Trintafylloy",
      //   email: "test@test.gr",
      //   userName: "handlename",
      //   eid: "123"
      //   };

      // let  name = cookies.get('name') || 'Ben';
      // console.log("User:");
      // console.log(this.props.usr);
      // this.props.dispatch(setUser(this.props.usr));
    }

    render(){
      const  {user,tweets,sideNav} = this.props;

      // let root = () => <div><NavigationBar user={user}/><Dummy user={user}/></div>;

      // let home = () => {console.log("home"); return <ServerLoading user={user}/>;} ;
      // let manage = () => <ServerLoading user={user}/>;
      // let request = () => <ServerLoading user={user}/>;
      // let edit = ({match}) => (<ServerLoading user={user}/>);
      // let inviteView = ({match}) => { console.log("inivte"); return <ServerLoading user={user}/>};
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
                    return <div><NavigationBar user={user}/></div>;
      };
        let account = () =>  <div><NavigationBar user={user}/><AccountInfo/></div>;


      return  <StaticRouter location={this.props.location} context={this.props.context}>
                  <Switch>
                    <Route path="/agr/app/" exact component={home} />
                    <Route path="/agr/app/home" exact component={home} />
                    <Route path="/agr/app/manage" exact component={manage} />
                    <Route path="/agr/app/request" exact component={request} />
                    <Route path="/agr/app/edit/:id" component={edit}/>
                    <Route path="/agr/app/invite/:id" component={inviteView}/>
                  </Switch>
                </StaticRouter>

      // return null;
    }

}
