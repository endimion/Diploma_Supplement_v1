/*jslint es6,  node:true */
'use strict';


const express = require('express');
const router = express.Router();
const request = require('request');
const authorizeAll = require('../../utils/authUtils').authorizeAll;
const authorizeAdmin = require('../../utils/authUtils').authorizeAdmin;
const getUserDetails = require('../../utils/authUtils').userDetailsFromToken;
const basic = require('../../model/hlf/basic.js');
const supUtils = require('../../utils/supplementUtils.js');
const emailUtil = require('../../utils/emailClient.js');
const randomstring = require("randomstring");
const  jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY?process.env.SECRET_KEY:"testSecret"; //the secret comes from an enviroment variable
const stripchar = require('stripchar').StripChar;
const uuid = require('uuid/v1');

/* configuration */
const config = require('../../config.json');
const peer = config.peer;
const peerAddr = config.peerAddress;
const channel = config.channelName;
const org = config.org;
const chaincode = config.chaincode;


module.exports = router;




/**************** views ******************************/


router.get('/view',authorizeAll,(req,res) =>{
  let userDetails = getUserDetails(req,res);
  userDetails.then( details =>{
    let userEid = details.eid;
    console.log(details);
    console.log("\nSupplementsRouts.js /view :: userEid" +userEid );
    res.render('viewSupplements',{ title: 'Published Supplements',
          message: 'Welcome user: ' + details.userName ,
          userType: "Student",
          supplements: null,
          eID: userEid,
          userName: details.userName,
          firstName: details.firstName,
          lastName: details.familyName});
    }).catch(err =>{
      res.render('errorMessage',{ title: 'Ooops... an error occured!',
                  message: err,
                  stdId: req.session.eID});
    });;
});





/*
  Allows the user to view a DS based on an invite.
  If the user is not logged in they are asked to login.
  If they are logged in they check the inv:
    a) If it is finalized then the id of the user is checked against the allowed set
    b) else, a validation code is sent to the user.
*/
router.get('/view/invite/:inviteHash',(req,res) =>{
    let  token = req.cookies.access_token;
    let inviteHash = req.params.inviteHash;
    jwt.verify(token,"secret",{ algorithms: ['HS256'] },function(err,token){
      if(err){
        res.cookie('dsHash',inviteHash,{ maxAge: 900000, httpOnly: true });
        res.render('loginEIDAS',{ title: 'Login with eIDAS',
        message: 'Login with the eIDAS system to view this Diploma Supplement',
        token: uuid() });
        console.log(err);
    }else{
        //jwt token found.
        getUserDetails(req,res).then( details =>{
          let userEid = details.eid;
          res.render('viewByInvite',{ title: 'View DS by Invite',
          message: 'Request Diploma Supplement Access',
          token: "",
          invHash:inviteHash});
        });

    }});
});







router.get('/edit/:supId',authorizeAll,(req,res) =>{
  let userDetails = getUserDetails(req,res);
  let supId = req.params.supId;
  userDetails.then( details =>{
    let userEid = details.eid;
    basic.queryChaincode(peer, channel, chaincode, [supId,userEid], "getSupplementById", userEid, org)
    .then( resp =>{
          if(JSON.parse(resp).Owner === userEid){
            res.render('editSupplement',{ title: 'Edit Supplement',
                  message: 'Welcome user: ' + details.userName  ,
                  userType: "Student",
                  supplement: JSON.parse(resp),
                  eID: userEid,
                  userName: details.userName,
                  firstName: details.firstName,
                  lastName:  details.familyName});
          }else{
            res.render('errorMessage',{ title: 'Ooops... an error occured!',
                        message: "You can only edit supplements you own",
                        stdId: ""});
          }
      }).catch(err=>{
        res.render('errorMessage',{ title: 'Ooops... an error occured!',
                    message: error.toString(),
                    stdId: ""});
      });
    });
});



router.get('/request',authorizeAll,(req,res) =>{
  getUserDetails(req,res).then( details =>{
    res.render('requestPublication',{ title: 'Request DS Publication',
              message: "" ,
              eID: details.eid,
              userName: details.userName,
              firstName: details.firstName,
              lastName: details.familyName,
              dateOfBirth: details.dateOfBirth,
              eIDHash: details.eid
              });

    }).catch(err =>{
        console.log(err);
    });
});
