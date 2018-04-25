/*jslint es6,  node:true */
'use strict';


const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY?process.env.SECRET_KEY:"secret"; //the secret comes from an enviroment variable
const stripchar = require('stripchar').StripChar;
const fs = require('fs');
const path = require('path');
const  nJwt = require('njwt');
/**
  check if a user eID exists on teh session,
  if not verify the existance of a jwt token and its validity
  retrieve the user credentials from the token and then save those
**/
exports.authorizeAll =  (req, res, next) =>{
  let  token = req.cookies.access_token;

  // let certName = "public_key.pem";
  // let keyPath = path.join(__dirname, '..', 'resources',  certName);
  // let cert = fs.readFileSync(keyPath);
  console.log(token);
  // var secret = new Buffer("testSecret", "base64");
  jwt.verify(token,"secret",{ algorithms: ['HS256'] }, function(err,token){
    if(err){
    console.log("ERRORRRR");
        // res.status(401).json({"message":"User not authorized"});
        res.redirect("/login/landing");
    }else{
      console.log(token); // Will contain the header and body
      next();
    }
  }) ;


  // jwt.verify(token,secretKey,function(err,token){
  //   if(err){
  //     // respond to request with error
  //     console.log(err);
  //     // res.status(401).json({"message":"User not authorized"});
  //     res.redirect("/login/landing");
  //   }else{
  //     next();
  //   }
  // });
};


exports.authorizeAdmin =  (req, res, next) =>{
  let  token = req.cookies.access_token;
  //read the private key:
  let cert = fs.readFileSync('../../resources/publicDScert.pem');


  jwt.verify(token,cert,function(err,token){
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
  // //TODO remove this is only for test on localhost
  // if(!token){
  //   token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJlaWRcIjpcIkdSL0dSL0VSTUlTLTExMDc2NjY5XCIsXCJwZXJzb25JZGVudGlmaWVyXCI6XCJHUi9HUi9FUk1JUy0xMTA3NjY2OVwiLFwiZGF0ZU9mQmlydGhcIjpcIjE5ODAtMDEtMDFcIixcImN1cnJlbnRGYW1pbHlOYW1lXCI6XCLOoM6VzqTOoc6fzqVcIixcImN1cnJlbnRHaXZlbk5hbWVcIjpcIs6Rzp3OlM6hzpXOkc6jXCJ9In0.AjC4Brk9gVS1vfsuMyATKh-U5Lyoa6GT9VL1U1ty2qE";
  // }

  return new Promise( (resolve,reject) =>{
    if(token && token !== "" && token !== "{}"){
      jwt.verify(token,secretKey,{ algorithms: ['HS256']},function(err,token){
        if(err){
          console.log(err);
          reject(err);
          return {"message":"User not authorized"};
        }else{
          // console.log(token);
          console.log(token.sub);
          if(token.sub == "{}") reject("no user found in jwt");
          let result = JSON.parse(token.sub);
          result.eid = stripchar.RSExceptUnsAlpNum(result.eid);
          //** ISS webapp returns the values as firstName,lastName, while webapp 2.0 as currentFamilyName,currentGivenName
          //**
          if(!result.firstName){
              result.firstName = result.currentGivenName;
                    }
          if(!result.familyName){
            result.familyName = result.currentFamilyName;

          }

          if(result.firstName && result.familyName){
            if(result.firstName.indexOf(",") > 0){
               result.intFirstName = result.firstName.split(",")[1];
               result.firstName = result.firstName.split(",")[0];;
            }
            if(result.familyName.indexOf(",") > 0){
                result.intFamilyName = result.familyName.split(",")[1];
                result.familyName = result.familyName.split(",")[0];
            }
            result.userName = result.firstName+"_"+result.familyName;
          }

          resolve(result);
        }
      });
    }else{
      reject("error jwt format");
    }

  });
}
