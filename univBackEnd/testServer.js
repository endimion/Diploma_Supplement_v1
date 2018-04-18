var PROTO_PATH = __dirname + '/protos/ds_backend_service.proto';

var fs = require('fs');
var parseArgs = require('minimist');
var path = require('path');
var _ = require('lodash');
var grpc = require('grpc');
var dsBackend = grpc.load(PROTO_PATH).dsbackend;



/*
* @param {Writable} call Writable stream for responses with an additional
*     request property for the request value.
*/
function getDiplomaSupplements(call) {
  console.log("getDiplomaSupplements called");

  let ds = {
    "university" :"1",
    "Holder_Info":{
        "Name":"1",
        "DateOfBirth":"2",
        "StudentId":"3"
    },
    "Qualification_Info":{
      "Name":"1",
      "FieldsOfStudy":"2",
      "InstitutionName":"3",
      "InstitutionStatus":"4",
      "InstructionLanguage":"=5"
    },
    "Qualification_Level":{
        "Level":" =1;",
        "ProgrammeLength":" =2;",
        "AccecssRequirements":"3"
    },
    "Content_Info":{
      "ModeOfStudy":"1",
      "ProgrammeRequirements":"3",
      "ProgrammeDetails":"=3;",
      "GradingScheme":"=4;",
      "OverallClassificationOfQualification":"=5;"
    },
    "Qualification_Function":{
      "AccessToFurtherStudy":"=1;",
      "ProfessionalStatus":"=2;",
    },
    "Additional_Info":{
      "AdditionalInfo":"1",
      "InfoSources":"=2"
    },
    "Supplement_Certification":{
      "Date":"1",
      "Name":"2",
      "Capacity":"=3;",
      "Signature":"4",
      "Stamp":"5"
    },
    "HigherEducationSystem_Info":{
      "HigherEducationSystem_Info":"=1;"
    },
    "id" : "123"
  }

  call.write(ds);
  console.log("writing second call");
  call.write(ds);

  call.end();
}



function getServer() {
  var server = new grpc.Server();
  server.addService(dsBackend.DsBackend.service, {
    getDiplomaSupplements: getDiplomaSupplements
  });
  return server;
}


if (require.main === module) {
  console.log("strating server");
  // If this is run as a script, start a server on an unused port
  var routeServer = getServer();
  routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  routeServer.start();
}
