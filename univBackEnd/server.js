var PROTO_PATH = __dirname + '/protos/ds_backend_service.proto';

const fs = require('fs');
const parseArgs = require('minimist');
const path = require('path');
const _ = require('lodash');
const grpc = require('grpc');
const dsBackend = grpc.load(PROTO_PATH).dsbackend;
const dsService = require('./service/DSService.js');
const utils = require('./utils/wrappers.js')

/*
* @param {Writable} call Writable stream for responses with an additional
*     request property for the request value.
*/
function getDiplomaSupplements(call) {
  console.log(" server.js::  getDiplomaSupplements called");
   let counter = 0;
   dsService.findAllDiplomaByCriterria(call.request).then(result =>{
       result.forEach(ds =>{
        console.log(" server.js::  writing DS " + counter);
        let resp = utils.wrapDbResToProto(ds) ;
        console.log(" server.js::  Will write to STREAM: " + counter);
        console.log(resp.Content_Info.ProgrammeDetails.Modules);
        call.write(resp);
        counter++;
       });
       call.end();
  });

}



function getServer() {
  var server = new grpc.Server();
  server.addService(dsBackend.DsBackend.service, {
    getDiplomaSupplements: getDiplomaSupplements
  });
  return server;
}


if (require.main === module) {
  console.log(" server.js::  strating server");
  // If this is run as a script, start a server on an unused port
  var routeServer = getServer();
  routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  routeServer.start();
}
