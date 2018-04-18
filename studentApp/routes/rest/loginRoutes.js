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
const fs = require('fs');
const path = require('path');

module.exports = router;


router.post('/register', (req,res) =>{
  let userJSON = req.body ; //in the body of the HTTP request we should have received a json here
  let hashedPass = bcrypt.hashSync(req.body.password, 10);
  userJSON.password = hashedPass;
  //save the user in the db...
  return res.json(userJSON);
});


router.get('/loginSuccess',(req,res)=>{
  let cookie = req.cookies.dsHash;
  console.log("dsHashCookie: " + cookie);
  if (cookie === undefined)
  {
    res.redirect(303,"/");
  }else{
    res.redirect(303,"/supplement/view/invite/"+cookie);
  }
});



router.get('/loginSuccessReact',(req,res)=>{
  let cookie = req.cookies.inviteHash;
  console.log("dsHashCookie: " + cookie);
  if (cookie === undefined)
  {
    res.redirect(303,"/app");
  }else{
    res.redirect(303,"/app/invite/"+cookie);
  }
});






// router.get('/authenticate/:token', (req,res) =>{
//   let token = req.params.token;
//   //get user details form eIDAS webapp based on token
//   let siteURL = 'http://community.mastihawonder.com:8080/testISSsp-0.0.1-SNAPSHOT/'
//   +'user?token=' + token;
//
//   let eIDASResponsePromise = new Promise( (resolve,reject) =>{
//     request.get(siteURL,function (error, response, body) {
//         try{
//           let remoteResponse = {
//               user:  JSON.parse(body),
//               status : response.statusCode
//           }
//           resolve(remoteResponse);
//         }catch(err){
//           reject(err);
//         }
//     });
//   });
//
//   eIDASResponsePromise.then( response =>{
//
//       //read the private key:
//       let certName = "private_key.pem";
//       let keyPath = path.join(__dirname, '..','..', 'resources',  certName);
//       let cert = fs.readFileSync(keyPath);
//
//       if(response.status == 200 && response.user && response.user.eid && response.user.userName){
//         // console.log(response.user);
//         let  claims = {
//           sub: response.user,
//           iss: 'https://mytestapp.com',
//           scope: "self, admins"
//         }
//         let access_token = jwt.sign(claims,secretKey); //
//         // let access_token = jwt.sign(claims,cert, { algorithm: 'RS512'});
//         // console.log(access_token);
//         res.cookie('access_token',access_token,{
//           httpOnly: true
//           // secure: true      // for your production environment
//         });
//         // res.json({"result":"ok"});
//
//         let cookie = req.cookies.dsHash;
//         console.log("dsHashCookie: " + cookie);
//         if (cookie === undefined)
//         {
//           res.redirect(303,"/supplement/view");
//         }else{
//           res.redirect(303,"/supplement/view/invite/"+cookie);
//         }
//
//       }else{
//         res.json({"error_resp": response});
//       }
//   }).catch(err =>{
//         res.json({"error_int":err.toString()});
//   });
//
//
//
// });




router.get('/logout',(req,res) =>{
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(303,"/login/landing");
    }
  });
});
