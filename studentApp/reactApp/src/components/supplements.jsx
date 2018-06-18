import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card  , CardPanel, ProgressBar, Row, Col} from 'react-materialize'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getSupplementsByEid,openShareByMail,openShareByQR,removeSupplements } from '../actions/supplementActions'

import SupplementCard from './supplementCard.jsx'



@connect( (store)=>{
  return {  sups : store.sups.supplements ,
            supError:store.sups.supError,
            fetching:store.sups.fetching,
            isUpdated:store.sups.isUpdated
        };
})
export default class Supplements extends React.Component {

  constructor(props) {
      super(props);
      this.openShareByMail = this.openShareByMail.bind(this);
      this.openShareByQR = this.openShareByQR.bind(this);
      this.cleanUp = this.cleanUp.bind(this);
  }

  componentDidMount(){
     $('.button-collapse').sideNav('hide');
     // this.fetchSupplements();
       if(!this.props.isUpdated && !this.props.fetching){
         this.fetchSupplements();
       }
  }

  componentWillReceiveProps(nextProps){
    $('.button-collapse').sideNav('hide');
    // if(!this.props.isUpdated && !this.props.fetching){
    //   this.fetchSupplements();
    // }
  }

  componentWillUnmount(){
    this.cleanUp();
  }

 cleanUp(){
   this.props.dispatch(removeSupplements());
 }

 fetchSupplements(){
   console.log("will fetch with eid" + this.props.user.eid);
   this.props.dispatch(getSupplementsByEid(this.props.user.eid));
 }

  openShareByMail(supId){
    this.props.dispatch(openShareByMail(supId));
  }

  openShareByQR(supId){
    this.props.dispatch(openShareByQR(supId));
  }

 render(){
    const  {sups,supError,fetching} = this.props;
    if(fetching){
      return (  <div className="main container" style={{marginTop: "3%"}}>
                <Row>
                  <Col s={12}>
                  Fetching Diploma Supplements, Please wait...
                  </Col>
                </Row>
                <Row>
                  <Col s={12}>
                  <ProgressBar />
                  </Col>
                </Row>

          </div>
          );
    }else{

      let supCards = sups.map(sup =>{
                  return <SupplementCard key={sup.Id} sup={sup}
                            openShareByMail={this.openShareByMail}
                            openShareByQR ={this.openShareByQR}
                           />
                });
        if (sups.length > 0){
          return (  <div className="main container" style={{marginTop: "3%"}}>
                     {supCards}
                    </div>
                 );
        }else{
           return ( <div className="main container" style={{marginTop: "3%"}}>
                        No matching accademic records found
                    </div>
                  );
        }
    }
  }
}
