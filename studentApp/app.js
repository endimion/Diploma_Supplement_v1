/*jslint es6,  node:true */
'use strict';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Container from './reactApp/src/components/containerServer.jsx';
import template from './template';
import { CookiesProvider } from 'react-cookie';

import {Provider} from 'react-redux';

import Store from './reactApp/store.js'
// let renderReact = require('./reactApp/src/renderReact.js');



const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); //warning The default server-side session storage, MemoryStore, is purposely not designed for a production environment.
                                            //compatible session stores https://github.com/expressjs/session#compatible-session-stores
const FileStore = require('session-file-store')(session);
// const basic = require('./model/hlf/basic');
const timeout = require('connect-timeout');
const cookieParser = require('cookie-parser')
const morgan  = require('morgan');
const https = require('https');
const fs = require('fs');


const util = require('./utils/authUtils.js');


/**** routes **/
let loginRoutes = require('./routes/rest/loginRoutes');
let loginViewRoutes = require('./routes/view/loginViewRoutes');
// let supplementRoutes = require('./routes/rest/supplementRoutes');
let supViewRoutes = require('./routes/view/supViewRoutes');
// let qr = require('./routes/rest/qrCodeRoutes');

// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//middlewares
app.use('/',express.static('public'));
app.use('/',express.static('dist/build'));
app.use('/dist/build/',express.static('dist/build'));

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
// app.use(session({
//   store: new FileStore,
//   name: 'clientAppCookie',
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// })); //set up middleware for session handling
app.use(morgan('tiny')); //http request logger
app.use(timeout(120000));
app.use('/', [loginViewRoutes,loginRoutes]);
app.use('/login', loginViewRoutes);
// app.use('/supplement/rest',supplementRoutes);
app.use('/supplement/',supViewRoutes);
// app.use('/qr',qr);

app.use(haltOnTimedout);//the following timeout middleware has to be the last middleware



let key = fs.readFileSync('tsl/private.key');
let cert = fs.readFileSync( 'tsl/server.crt' );
let options = {
    key: key,
    cert: cert
}

//start https server
// https.createServer(options, app).listen(8443);


app.get('/app*', (req, res) => {
  let url = req.url;
  console.log(url);
  if(url && url.indexOf("invite") > -1 ){
    let parts = url.split("/");
    let invId = parts[parts.length -1];
    res.cookie('inviteHash',invId, {maxAge: 120000, httpOnly: true });
    console.log("invite found");
  }

  util.userDetailsFromToken(req,res).then( (usr) => {
    // const staticContext = {}
    const css = new Set(); // CSS for all rendered React components
    const staticContext = { insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())) };
    const theUser= usr;
    // Grab the initial state from our Redux store
    const preloadedState = {...Store.getState(),
                            user:{user:{...usr, lastName: usr.familyName}}}
    const appString = renderToString(
      <Provider store={Store}>
        <CookiesProvider>
          <Container location={req.url}
                     context={staticContext}
                     usr={theUser}/>
          </CookiesProvider>
        </Provider>
    );
    res.send(template({
      body: appString,
      title: 'Hello World from the server',
      preloadedState: preloadedState,
      css:css
    }));

  }).catch(err=>{
    console.log(err);
    res.redirect("/login/landing");
  });

});





//start the server
const server = app.listen(port,"127.0.0.1", (err,res) => {
  if(err){
    console.log("error!!", err);
  }else{
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
    console.log("server started");
    //initialize the blocokchain configuration
    console.log("SRV address"+ process.env.SRV_ADDR);

    // basic.init();
  }
});


// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err)
})


function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}
