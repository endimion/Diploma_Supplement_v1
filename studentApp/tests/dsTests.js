/*jslint es6,  node:true */
'use strict';

const basic = require('../model/hlf/basic.js');
let evHelper = require('../utils/eventHelper.js');

//
// evHelper.registerEventHubForOrg("org1",'dipSup_cc','evtsender', event =>
// 															{console.log("event");
// 																console.log(event);})

// console.log(client);


//
// eh.setPeerAddr(ORGS[org][key].events, {
// 	pem: Buffer.from(data).toString(),
// 	'ssl-target-name-override': ORGS[org][key]['server-hostname']
// });

// // register the listeners before calling "connect()" so that we can
// // have the error callback ready to process an error in case the
// // connect() call fails
// eh.registerTxEvent(
//   transactionId,
//      (tx, code) => {
//        eh.unregisterTxEvent(transactionId);
//        console.log(util.format('Transaction %s has completed', transactionId));
//      },
//      (err) => {
//        eh.unregisterTxEvent(transactionId);
//        console.log(util.format('Error %s! Transaction listener for %s has been ' +
//                 'deregistered with %s', transactionId, err, eh.getPeerAddr()));
//      }
// );
//
// eh.connect();




/* ######################### Tested Functions #########################################
	 ***** Invokes*
   1/ requestSupplementPublication
   2/ publish
	 4/ addDiplomaSupplementInvite
	 5/ addCodeForDSInvite
	 6/ addRecepientToDSInvite
	 7/ uninvite
		**** QUERIES
	  3/ getSupplements
    8/ getDiplomaSupplementInvitesByHash
 		9/ getSupplementById

*/


/* ########################## New Test Sequence #######################################
		1/ createChannel
		2/ joinAllOrgsOnChannel
	  3/ installChaincode
		4/ instantiateChaincode
		5/ invokeChaincode ==> requestSupplementPublication
		6/ invokeChaincode ==> publish
		7/ invokeChaincode ==> getSupplements

*/



// basic.createChannel();
// basic.joinAllOrgsOnChannel("mychannel");



// basic.installChaincode(["localhost:7051"],"dipSup_cc11","github.com/dipSup_cc","0.1.8", "nikos", "org1");

// basic.instantiateChaincode("mychannel", "dipSup_cc11", "0.1.8", "init", [],"nikos", "org1");


// TEST INVOKES
//
// basic.invokeChaincode(["localhost:7051"], "mychannel", "dipSup_cc9", "requestSupplementPublication",
// 														["nikos3","Nikos Tr", "nikos3","NTUA_ID","test@test.gr","nikos3","ntua_name"],
// 														"nikos3", "org1")
// .then(function(message) {
// 	console.log("requestSupplementPublication::");
// 	console.log(message);
// 	basic.invokeChaincode(["localhost:7051"], "mychannel", "dipSup_cc9", "publish",
// 															['{"Owner": "nikos3", "University":"ntua_name","Authorized":[],"Id":"1234"}','ntua_name'],
// 													"nikos3", "org1")
// 	.then(function(message) {
// 		console.log("publish::");
// 		console.log(message);
// 		basic.invokeChaincode(["localhost:7051"], "mychannel", "dipSup_cc9", "addDiplomaSupplementInvite",
// 																['{"DSHash":"hash", "DSId":"1234","Email":"test@test.gr"}','nikos3'],
// 														"nikos3", "org1")
// 		.then(m =>{
// 			console.log("addDiplomaSupplementInvite::");
// 			console.log(m);
// 			basic.invokeChaincode(["localhost:7051"], "mychannel", "dipSup_cc9", "addCodeForDSInvite",
// 																	["hash","code"],"nikos3", "org1")
// 			.then (m =>{
// 				console.log("addCodeForDSInvite::");
// 				console.log(m);
// 				basic.invokeChaincode(["localhost:7051"], "mychannel", "dipSup_cc9", "addRecepientToDSInvite",
// 																		["hash","receipientEid","code"],"nikos3", "org1")
// 				.then(m =>{
// 					console.log("addRecepientToDSInvite::");
// 					console.log(m);
// 					basic.invokeChaincode(["localhost:7051"], "mychannel", "dipSup_cc9", "uninvite",
// 																			["1234","test@test.gr","nikos3"],"nikos3", "org1")
// 					.then( m=>{
// 						console.log("uninvite::");
// 						console.log(m);
// 					}).catch(e =>{
// 								console.log(e);
// 						});
// 				});
// 			})
// 		});
// 	});
// });
//
//



//TEST QUERIES
//
// basic.queryChaincode("peer1", "mychannel", "dipSup_cc9", ["ntua_name"], "getSupplements", "nikos3", "org1")
// .then(function(message) {
// 		console.log("getSupplements");
// 		console.log(message);
// 		basic.queryChaincode("peer1", "mychannel", "dipSup_cc9", ["1234","nikos3"], "getSupplementById", "nikos3", "org1")
// 		.then( m => {
// 					console.log("getSupplementById");
// 					console.log(m);
// 					//getDiplomaSupplementInvitesByHash
// 					basic.queryChaincode("peer1", "mychannel", "dipSup_cc9", ["hash"],
// 									"getDiplomaSupplementInvitesByHash", "nikos3", "org1")
// 					.then(m => {
// 						console.log("getDiplomaSupplementInvitesByHash");
// 						console.log(m);
//
//
// 					})
// 		});
// });



//
//
// basic.invokeChaincode(["localhost:7051"], "mychannel", "dipSup_cc9", "publish",
// 															['{"Owner": "CACA12345", "University":"ntua","Authorized":[],"Id":"1234"}','ntua'],
// 													"nikos3", "org1");


// // name := args[0]
// eid := args[1]
// uniId := args[2]
// email  := args[3]
// eidHash := args[4]
// university := args[5]


//
// basic.queryChaincode("peer1", "mychannel", "example_cc", ["a"], "query", "nikos3", "org1")
// .then(function(message) {
// 	console.log(message);
// });
//
// basic.invokeChaincode(["localhost:7051"], "mychannel", "example_cc", "move",["a","b","10"], "nikos3", "org1")
// .then(function(message) {
// 	console.log(message);
// }).then(resp =>{
//   basic.queryChaincode("peer1", "mychannel", "example_cc", ["a"], "query", "nikos3", "org1")
//   .then(function(message) {
//     console.log(message);
//   });
// });
