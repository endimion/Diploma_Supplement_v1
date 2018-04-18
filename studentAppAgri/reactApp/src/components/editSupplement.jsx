import React, { Component } from 'react'
import {  Button} from 'react-materialize'
import {connect} from 'react-redux'

import EditSupplementCard from "./editSupplementCard.jsx"



@connect( (store)=>{
  return {  sups : store.sups.supplements ,
            supError:store.sups.supError,
            fetching:store.sups.fetching
        };
})
export default class EditSup extends React.Component {

    componentDidMount(){
      $('.button-collapse').sideNav('hide');
    }

    componentWillReceiveProps(){
      $('.button-collapse').sideNav('hide');
    }


    render(){
      // console.log(this.props.match.params.id);
      const id = this.props.match.params.id;
      let sups = this.props.sups.filter( (sup) =>{ return sup.Id === id});
      console.log(sups);
      if(sups.length > 0){
        return (<div className="main container" style={{marginTop: "3%"}}>
                    <EditSupplementCard key={sups[0].Id} sup={sups[0]}/>
            </div>);
      }else{
        return (<div className="main container" style={{marginTop: "3%"}}>
                    No Supplement found for the give id: {id}
            </div>);
      }

    }

}
