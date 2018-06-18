import React, { Component } from 'react'
import {connect} from 'react-redux'
import {  Card  , CardPanel,
          Collapsible, CollapsibleItem,
          CollectionItem, Collection, Input,
          Row, Col} from 'react-materialize'


import SupFab from './supplementFab.jsx'
import SupBtns from './supplementBtns.jsx'
import ShareByMailModal from './shareSupMailModal.jsx'
import ShareByQRModal from './shareSupQRModal.jsx'

export default class SupplementCard extends React.Component {
  constructor(props) {
        super(props);
  }


  render(){
    const  {sup} = this.props;
    const headerCss = {backgroundColor: "aliceblue", color:"black"};
    // const over = {overflow:"hidden"};

    let contents  = Object.keys(sup)
    .filter( (key) => {return key !== "Name"  && key !==  "Surname" && key !==  "Authorized"})
    .map(function(key) {
      if(typeof(sup[key]) === "string"){
         return ( <li key={key}>
                    <div class="collapsible-header" style={{color:"black",overflow:"hidden"}} key={key}>
                          <b>{key}</b> : {sup[key]}
                    </div>
                  </li>);
      }else{
          let entry = sup[key];
          let innerContents = Object.keys(entry).map( (k) =>{
              if(k !== "ProgrammeDetails"){
                    return <div class="collapsible-body" style={{color:"black"}} key={k}>
                                <span>{k} : {entry[k]}</span>
                            </div>;
              }else{
                  // console.log(k,entry[k]);
                  let details = entry[k];
                  let modules =[];
                  details.Modules.map( (mod) =>{
                    modules.push( <Row key={mod.ModuleCode}>
                            <Col m={12} s={12}>
                              <Card >
                                <Collection>
                                  <CollectionItem key={"ModuleCode"}><span>ModuleCode: {mod.ModuleCode}</span></CollectionItem>
                                  <CollectionItem key={"NameOfTheModule"}><span>NameOfTheModule: {mod.NameOfTheModule}</span></CollectionItem>
                                  <CollectionItem key={"TypeOfModule"}><span>TypeOfModule: {mod.TypeOfModule}</span></CollectionItem>
                                  <CollectionItem key={"ExamPeriod"}><span>ExamPeriod: {mod.ExamPeriod}</span></CollectionItem>
                                  <CollectionItem key={"Grade"}><span>Grade: {mod.Grade}</span></CollectionItem>
                                  <CollectionItem key ={"InWriting"}><span>InWriting: {mod.InWriting}</span></CollectionItem>
                                </Collection>
                              </Card>
                          </Col></Row>);
                  });

                return (
                      <div class="collapsible-body" style={{color:"black"}} key={k}>
                        <Collection>
                        	<CollectionItem  key={k}><span>{k}</span></CollectionItem>
                        	<CollectionItem key={"Description"}><span>Description :{details.Description}</span></CollectionItem>
                        	<CollectionItem key={"Legend"}><span>Legend :{details.Legend}</span></CollectionItem>
                        	<CollectionItem id="modulesCollection" key={"Modules"}>
                            <Collapsible>
                              	<CollapsibleItem className="modulesCard" key={"Mods"} header='Modules' icon="expand_more" style={headerCss}>
                              		{modules}
                              	</CollapsibleItem>
                          	</Collapsible>
                        	</CollectionItem>
                        </Collection>

                      </div>);

                      // <div class="collapsible-body" style={{color:"black"}}><span>Modules :{modules}</span></div>,



              }

              // return null;
          });
          // console.log(innerContents);
          return  <li key={key}>
                  <div class="collapsible-header" data-collapsible="accordion" style={headerCss}>
                          {key}
                          <i class="material-icons">expand_more</i>
                  </div>
                  {innerContents}
                </li>;
      }
      return key;
    });

      return (
        <div className="row">
         <div className="col s12 m6">
           <div className="card ">
             <div className="card-content white-text">
               <Input name={sup.Id} type='checkbox' value='red' label='Select' />
               <span className="card-title">Card Title</span>
                <Collapsible accordion>
                  {contents}
                </Collapsible>
             </div>
             <div className="card-action">
               <SupBtns isOwner ={!this.props.restricted} id={sup.Id}/>

               <SupFab  isOwner ={!this.props.restricted}
                        mailModal={this.props.openShareByMail}
                        qrModal={this.props.openShareByQR}
                        supId={sup.Id}
                />

               <ShareByMailModal sup={sup}/>
               <ShareByQRModal sup={sup}/>
             </div>
           </div>
         </div>
       </div>

          );
  }
}
