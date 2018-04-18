/*jslint es6,  node:true */
'use strict';

const path = require('path');
const fs = require('fs');
const util = require('util');
const config = require('../../config.json');
const helper = require('../../utils/helper.js');
const logger = helper.getLogger('install-chaincode');
const tx_id = null;


const join = require('../../utils/join-channel.js') ;
const createChannel = require('../../utils/create-channel.js') ;
const instantiate = require('../../utils/instantiate-chaincode.js');
const query = require('../../utils/query.js');
const invoke = require('../../utils/invoke-transaction.js');
const evHelper = require('../../utils/eventHelper.js');


exports.installChaincode = function(peers, chaincodeName, chaincodePath,chaincodeVersion, username, org) {
    console.log(
      '\n============ Install chaincode on organizations ============\n');
      helper.setupChaincodeDeploy();
      var channel = helper.getChannelForOrg(org);
      var client = helper.getClientForOrg(org);

      return helper.getOrgAdmin(org)
        .then((user) => {
            var request = {
              targets: helper.newPeers(peers),
              chaincodePath: chaincodePath,
              chaincodeId: chaincodeName,
              chaincodeVersion: chaincodeVersion
            };
            console.log("test.js --> installChaincode");
            console.log(request);
            return client.installChaincode(request);
          }, (err) => {
            console.log('Failed to enroll user \'' + username + '\'. ' + err);
            throw new Error('Failed to enroll user \'' + username + '\'. ' + err);
          }).then((results) => {
            var proposalResponses = results[0];
            var proposal = results[1];
            var all_good = true;
            for (var i in proposalResponses) {
              let one_good = false;
              if (proposalResponses && proposalResponses[0].response &&
                proposalResponses[0].response.status === 200) {
                  one_good = true;
                  console.log('install proposal was good');
                } else {
                  console.log('install proposal was bad');
                }
                all_good = all_good & one_good;
              }
              if (all_good) {
                console.log(util.format(
                  'Successfully sent install Proposal and received ProposalResponse: Status - %s',
                  proposalResponses[0].response.status));
                  console.log('\nSuccessfully Installed chaincode on organization ' + org +
                  '\n');
                  return 'Successfully Installed chaincode on organization ' + org;
                } else {
                  console.log(
                    'Failed to send install Proposal or receive valid response. Response null or status is not 200. exiting...'
                  );
                  return 'Failed to send install Proposal or receive valid response. Response null or status is not 200. exiting...';
                }
              }, (err) => {
                console.log('Failed to send install proposal due to error: ' + err.stack ?
                err.stack : err);
                throw new Error('Failed to send install proposal due to error: ' + err.stack ?
                err.stack : err);
              });
        };


exports.createChannel = function(){
  createChannel.createChannel("mychannel", "../artifacts/channel/channel.tx", "nikos2", "org1")
  .then( resp=>{
  		console.log("=============CHANEL CREATED===================");
  }).catch( err => {
      console.log(err);
  });
};

exports.joinAllOrgsOnChannel = function(chanelName){
  join.joinChannel(chanelName, ["172.17.0.1:7051"],  "nikos2", "org1")
  .then(resp =>{
    console.log("=============Peer localhost:7051 JOINED===================");
  })
  .then(resp =>{
      join.joinChannel(chanelName, ["172.17.0.1:8051"],  "nikos2", "org2");
        console.log("=============Peer localhost:8051 JOINED===================");
  })
  .then(resp =>{
      join.joinChannel(chanelName, ["172.17.0.1:9051"],  "nikos2", "org3");
        console.log("=============Peer localhost:9051 JOINED===================");
  })
  .catch(err =>{
      console.log(err);
  });
};




exports.instantiateChaincode = function(channelName, chaincodeName, chaincodeVersion, functionName, args, username, org) {
  return  instantiate.instantiateChaincode(channelName, chaincodeName, chaincodeVersion, functionName, args, username, org);
};

exports.queryChaincode = function(peer, channelName, chaincodeName, args, fcn, username, org) {
  return query.queryChaincode(peer, channelName, chaincodeName, args, fcn, username, org);
};

/**
  Invoke transaction and listen to custom DS events
**/
exports.invokeChaincode = function(peersUrls, channelName, chaincodeName, fcn, args, username, org) {
  return invoke.invokeChaincode(peersUrls, channelName, chaincodeName, fcn, args,
                                  username, org,evHelper.txDetectionEvent) ;
};
