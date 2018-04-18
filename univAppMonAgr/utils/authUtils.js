/*jslint es6,  node:true */
'use strict';


const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY?process.env.SECRET_KEY:"testSecret"; //the secret comes from an enviroment variable
const stripchar = require('stripchar').StripChar;

/**
  check if a user eID exists on teh session,
  if not verify the existance of a jwt token and its validity
  retrieve the user credentials from the token and then save those
**/
exports.authorizeAll =  (req, res, next) =>{
  let  token = req.cookies.access_token;
  jwt.verify(token,secretKey,function(err,token){
    if(err){
      // respond to request with error
      console.log(err);
      // res.status(401).json({"message":"User not authorized"});
      res.redirect("/login/landing");
    }else{
      next();
    }
  });
};


exports.authorizeAdmin =  (req, res, next) =>{
  let  token = req.cookies.access_token;
  jwt.verify(token,secretKey,function(err,token){
    if(err){
      console.log(err);
      res.status(401).json({"message":"User not authorized"});
    }else{
      console.log(token);
      if (token.scope.split(",").indexOf("admin") >= 0){
          next();
      }else{
        res.status(401).json({"message":"Only admin user may perform this action"});
      }
    }
  });
};




/*
  Returns the user credentials from the JWT token
*/
exports.userDetailsFromToken = (req,res) =>{
  let  token = req.cookies.access_token;
  return new Promise( (resolve,reject) =>{
    jwt.verify(token,secretKey,function(err,token){
      if(err){
        console.log(err);
        reject(err);
        return {"message":"User not authorized"};
      }else{
        console.log(token);
        console.log(token.sub);
        let result = token.sub;
        result.eid = stripchar.RSExceptUnsAlpNum(result.eid);
        resolve(result);
      }
    });
  });
}
