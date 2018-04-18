var PROTO_PATH = __dirname + '/protos/ds_backend_service.proto';

var async = require('async');
var fs = require('fs');
var parseArgs = require('minimist');
var path = require('path');
var _ = require('lodash');
var grpc = require('grpc');
var dsBackend = grpc.load(PROTO_PATH).dsbackend;
var client = new dsBackend.DsBackend('localhost:50051',
                                       grpc.credentials.createInsecure());

var COORD_FACTOR = 1e7;


// client.GetDiplomaSupplements("test1");message DSCriteria {
let call = client.getDiplomaSupplements({"Name":"n","Eid":"e",
"UniId":"u","EidHash":"eh","University":"uni","DateOfBirth":"dob"});
call.on('data', function(ds) {
  console.log("received DS");
  console.log(ds);
});
call.on('end',function(){
  console.log("stream ended!!!!!!");
});
