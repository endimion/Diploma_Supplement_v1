/*jslint es6,  node:true */
'use strict';

const basic = require('../model/hlf/basic.js');

// basic.createChannel();
// basic.joinAllOrgsOnChannel("mychannel");
// basic.installChaincode(["localhost:7051"],"example_cc","github.com/example_cc","1.0.1", "nikos", "org1");
// basic.installChaincode(["localhost:8051"],"example_cc","github.com/example_cc","1.0.1", "nikos", "org2");
// basic.instantiateChaincode("mychannel", "example_cc", "1.0.1", "init", ["a","100","b","200"],"nikos", "org1");


basic.queryChaincode("peer1", "mychannel", "example_cc", ["a"], "query", "nikos3", "org1")
.then(function(message) {
	console.log(message);
});

basic.invokeChaincode(["localhost:7051"], "mychannel", "example_cc", "move",["a","b","10"], "nikos3", "org1")
.then(function(message) {
	console.log(message);
}).then(resp =>{
  basic.queryChaincode("peer1", "mychannel", "example_cc", ["a"], "query", "nikos3", "org1")
  .then(function(message) {
    console.log(message);
  });
});
