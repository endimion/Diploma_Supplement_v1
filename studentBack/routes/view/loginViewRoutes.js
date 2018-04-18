/*jslint es6,  node:true */
'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY?process.env.SECRET_KEY:"testSecret"; //the secret comes from an enviroment variable
const request = require('request');
const authorizeAll = require('../../utils/authUtils').authorizeAll;
const authorizeAdmin = require('../../utils/authUtils').authorizeAdmin;
const getUserDetails = require('../../utils/authUtils').userDetailsFromToken;
const uuid = require('uuid/v1');

module.exports = router;



router.get(['/','/home'],authorizeAll,(req,res) =>{
  getUserDetails(req,res).then( details =>{
      res.render('stdMainView',{ title: 'Publish a new Diploma Supplement',
      message: 'Welcome user: ' + details.eid ,
      eID: details.eid,
      userName: details.userName,
      firstName: details.firstName,
      lastName: details.familyName});
  }).catch(err =>{
    res.render('landing',{ title: 'Login', message: 'Login to the DiplomaSupplement WebApp' });
  });

});

router.get('/landing', (req,res) =>{
    res.render('landing',{ title: 'Login', message: 'Login to the DiplomaSupplement WebApp' });
});


router.get('/eIDAS', function (req, res) {
  // if(!req.session.userType  && !req.session.eID){
    // res.redirect(303, "http://84.205.248.180/ISSPlus/ValidateToken?t="+ uuid()+"&sp=sp1&cc=CA&saml=eIDAS");
    res.redirect(303, "http://138.68.103.237:8090/login");
  // }
});
