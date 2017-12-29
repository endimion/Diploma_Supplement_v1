/*jslint es6,  node:true */
'use strict';

const basic = require('./model/hlf/basic.js');
const evHelper = require('./utils/eventHelper.js');
const dsService = require('./service/DSService.js');
const bkService = require('./service/BackEndService.js')
const hash = require('hash.js');
const signService = require('./service/SignService.js');
const UNIVERSITY = process.env.UNIVERSITY_NAME||"UAegean";

/* configuration */
const config = require('./config.json');
const peer = config.peer;
const peerAddr = config.peerAddress;
const channel = config.channelName;
const org = config.org;
const chaincode = config.chaincode;


evHelper.registerEventHubForOrg(org,chaincode,'evtsender', event => {
    // console.log(" app.js::  Received Event:");
		// console.log(event);

    let pubReq = JSON.parse(event).Body;
    console.log(" app.js::  Publication Request:");
    console.log(pubReq);
    let univName = UNIVERSITY;
    console.log(univName);
    console.log(pubReq.University === univName);
    if(pubReq.University === univName){
      bkService.findAllDiplomaByCriterria(pubReq).then(result =>{
          return result.map(dbDipSup =>{
             //map the supplement from the grpc call to a full DiplomaSupplement Structure
             //owner value, denotes the eidas eid,  is retreived from the event,
             // the val. does not exist in the db
             console.log(" app.js::  match found")  ;
             console.log(dbDipSup);

             let supplement =  {
               "Owner" : pubReq.EidHash,
              //  "Name" : dbDipSup.name,
              //  "Surname" : dbDipSup.surname,
               "University" : univName,
               "Authorized" : [],
               "Id" :  dbDipSup.id, //_id.valueOf(),
               "Holder_Info": dbDipSup.Holder_Info,
               "Qualification_Info": dbDipSup.Qualification_Info,
               "Qualification_Level": dbDipSup.Qualification_Level,
               "Content_Info": {
                  "ModeOfStudy": dbDipSup.Content_Info.ModeOfStudy,
                  "ProgrammeRequirements":dbDipSup.Content_Info.ProgrammeRequirements,
                  "ProgrammeDetails":{
                      "Description":  dbDipSup.Content_Info.ProgrammeDetails.Description,
                      "Modules":  dbDipSup.Content_Info.ProgrammeDetails.Modules,
                      "Legend": dbDipSup.Content_Info.ProgrammeDetails.Legend
                  },
                  "GradingScheme": dbDipSup.Content_Info.GradingScheme,
                  "OverallClassificationOfQualification": dbDipSup.Content_Info.OverallClassificationOfQualification
                } ,
               "Qualification_Function":dbDipSup.Qualification_Function,
               "Additional_Info": dbDipSup.Additional_Info,
               "Supplement_Certification":dbDipSup.Supplement_Certification,
               "HigherEducationSystem_Info":dbDipSup.HigherEducationSystem_Info
            };
            //sign the supplement
            let supHash = hash.sha256().update(JSON.stringify(supplement)).digest('hex');
            supplement.signature =signService.signHash(supHash);


            return supplement;
        });
     })
     .then(results =>{
        results.forEach(dsResult =>{
          basic.queryChaincode(peer, channel, chaincode, [dsResult.Id.toString(),UNIVERSITY], "getSupplementById",
                                                    UNIVERSITY, org)
          .then( resp =>{
          //  console.log(JSON.stringify(dsResult));
            if(resp.indexOf("error") !== -1){ //if not sup with given Id is found
                console.log(" app.js::  will publish!!!!!!!!!!!!!!!!!");
                console.log(JSON.stringify(dsResult));
                basic.invokeChaincode([peerAddr], channel, chaincode, "publish",
      							[JSON.stringify(dsResult),UNIVERSITY],UNIVERSITY, org)
            }
          });
        });
     }) ;
    }

});
