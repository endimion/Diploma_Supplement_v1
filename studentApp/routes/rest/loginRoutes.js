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

module.exports = router;


router.post('/register', (req,res) =>{
  let userJSON = req.body ; //in the body of the HTTP request we should have received a json here
  let hashedPass = bcrypt.hashSync(req.body.password, 10);
  userJSON.password = hashedPass;
  //save the user in the db...
  return res.json(userJSON);
});


router.get('/', (req,res) =>{
  res.render('landing',{ title: 'Login', message: 'Login to the DiplomaSupplement WebApp' });
});



/**
  TODO
  This should be part of teh eIDAS-login webapp. For dev purposes we leave it here
  however the correct functionality would be that the eIDAS webapp creates a
  jwt token and adds it to the http header. Then this token is used to retreive the attributes
  of the logged in user
**/
router.get('/authenticate/:token', (req,res) =>{
  let token = req.params.token;
  //get user details form eIDAS webapp based on token
  let siteURL = 'http://community.mastihawonder.com:8080/testISSsp-0.0.1-SNAPSHOT/'
  +'user?token=' + token;

  let eIDASResponsePromise = new Promise( (resolve,reject) =>{
    request.get(siteURL,function (error, response, body) {
        try{
          let remoteResponse = {
              user:  JSON.parse(body),
              status : response.statusCode
          }
          resolve(remoteResponse);
        }catch(err){
          reject(err);
        }
    });
  });

  eIDASResponsePromise.then( response =>{
      if(response.status == 200 && response.user && response.user.eid && response.user.userName){
        // console.log(response.user);
        let  claims = {
          sub: response.user,
          iss: 'https://mytestapp.com',
          scope: "self, admins"
        }
        let access_token = jwt.sign(claims,secretKey);
        // console.log(access_token);
        res.cookie('access_token',access_token,{
          httpOnly: true
          // secure: true      // for your production environment
        });
        // res.json({"result":"ok"});

        let cookie = req.cookies.dsHash;
        console.log("dsHashCookie: " + cookie);
        if (cookie === undefined)
        {
          res.redirect(303,"/supplement/view");
        }else{
          res.redirect(303,"/supplement/view/invite/"+cookie);
        }

      }else{
        res.json({"error_resp": response});
      }
  }).catch(err =>{
        res.json({"error_int":err.toString()});
  });



});




router.get('/logout',(req,res) =>{
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(303,"/login");
    }
  });
});
