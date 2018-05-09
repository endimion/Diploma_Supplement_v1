module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-materialize");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


var bcrypt = __webpack_require__(26);
var jwt = __webpack_require__(19);
var secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "secret"; //the secret comes from an enviroment variable
var stripchar = __webpack_require__(34).StripChar;
var fs = __webpack_require__(4);
var path = __webpack_require__(3);
var nJwt = __webpack_require__(90);
/**
  check if a user eID exists on teh session,
  if not verify the existance of a jwt token and its validity
  retrieve the user credentials from the token and then save those
**/
exports.authorizeAll = function (req, res, next) {
  var token = req.cookies.access_token;

  // let certName = "public_key.pem";
  // let keyPath = path.join(__dirname, '..', 'resources',  certName);
  // let cert = fs.readFileSync(keyPath);
  console.log(token);
  // var secret = new Buffer("testSecret", "base64");
  jwt.verify(token, "secret", { algorithms: ['HS256'] }, function (err, token) {
    if (err) {
      console.log("ERRORRRR");
      // res.status(401).json({"message":"User not authorized"});
      res.redirect("/login/landing");
    } else {
      console.log(token); // Will contain the header and body
      next();
    }
  });

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

exports.authorizeAdmin = function (req, res, next) {
  var token = req.cookies.access_token;
  //read the private key:
  var cert = fs.readFileSync('../../resources/publicDScert.pem');

  jwt.verify(token, cert, function (err, token) {
    if (err) {
      console.log(err);
      res.status(401).json({ "message": "User not authorized" });
    } else {
      console.log(token);
      if (token.scope.split(",").indexOf("admin") >= 0) {
        next();
      } else {
        res.status(401).json({ "message": "Only admin user may perform this action" });
      }
    }
  });
};

/*
  Returns the user credentials from the JWT token
*/
exports.userDetailsFromToken = function (req, res) {
  var token = req.cookies.access_token;
  // //TODO remove this is only for test on localhost
  // if(!token){
  //   token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJlaWRcIjpcIkdSL0dSL0VSTUlTLTExMDc2NjY5XCIsXCJwZXJzb25JZGVudGlmaWVyXCI6XCJHUi9HUi9FUk1JUy0xMTA3NjY2OVwiLFwiZGF0ZU9mQmlydGhcIjpcIjE5ODAtMDEtMDFcIixcImN1cnJlbnRGYW1pbHlOYW1lXCI6XCLOoM6VzqTOoc6fzqVcIixcImN1cnJlbnRHaXZlbk5hbWVcIjpcIs6Rzp3OlM6hzpXOkc6jXCJ9In0.AjC4Brk9gVS1vfsuMyATKh-U5Lyoa6GT9VL1U1ty2qE";
  // }

  return new Promise(function (resolve, reject) {
    if (token && token !== "" && token !== "{}") {
      jwt.verify(token, secretKey, { algorithms: ['HS256'] }, function (err, token) {
        if (err) {
          console.log(err);
          reject(err);
          return { "message": "User not authorized" };
        } else {
          // console.log(token);
          console.log(token.sub);
          if (token.sub == "{}") reject("no user found in jwt");
          var result = JSON.parse(token.sub);
          result.eid = stripchar.RSExceptUnsAlpNum(result.eid);
          //** ISS webapp returns the values as firstName,lastName, while webapp 2.0 as currentFamilyName,currentGivenName
          //**
          if (!result.firstName) {
            result.firstName = result.currentGivenName;
          }
          if (!result.familyName) {
            result.familyName = result.currentFamilyName;
          }

          if (result.firstName && result.familyName) {
            if (result.firstName.indexOf(",") > 0) {
              result.intFirstName = result.firstName.split(",")[1];
              result.firstName = result.firstName.split(",")[0];;
            }
            if (result.familyName.indexOf(",") > 0) {
              result.intFamilyName = result.familyName.split(",")[1];
              result.familyName = result.familyName.split(",")[0];
            }
            result.userName = result.firstName + "_" + result.familyName;
          }

          resolve(result);
        }
      });
    } else {
      reject("error jwt format");
    }
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "host": "172.17.0.1", "port": "4000", "jwt_expiretime": "36000", "channelName": "mychannel", "GOPATH": "artifacts", "keyValueStore": "/tmp/fabric-client-kvs", "eventWaitTime": "90000", "orderer": "grpcs://172.17.0.1:7050", "users": [{ "username": "admin", "secret": "adminpw" }], "peer": "peer1", "chaincode": "dipSup_cc13", "org": "org1", "peerAddress": "localhost:7051" };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


var log4js = __webpack_require__(95);
var logger = log4js.getLogger('Helper');
// logger.setLevel('DEBUG');

var path = __webpack_require__(3);
var util = __webpack_require__(7);
var fs = __webpack_require__(96);
var User = __webpack_require__(97);
var crypto = __webpack_require__(98);
var copService = __webpack_require__(99);
var config = __webpack_require__(8);

var hfc = __webpack_require__(20);
hfc.addConfigFile(path.join(__dirname, '../network-config.json'));
hfc.setLogger(logger);
var ORGS = hfc.getConfigSetting('network-config');

var clients = {};
var channels = {};
var caClients = {};

// set up the client and channel objects for each org
for (var key in ORGS) {
	if (key.indexOf('org') === 0) {
		var client = new hfc();

		var cryptoSuite = hfc.newCryptoSuite();
		cryptoSuite.setCryptoKeyStore(hfc.newCryptoKeyStore({ path: getKeyStoreForOrg(ORGS[key].name) }));
		client.setCryptoSuite(cryptoSuite);

		var channel = client.newChannel(config.channelName);
		// console.log("\n ===Helper.js======== SETTTING CHANNEL ==========" +config.channelName+ "\n");

		channel.addOrderer(newOrderer(client));

		// console.log(channel);

		clients[key] = client;
		channels[key] = channel;

		setupPeers(channel, key, client);

		var caUrl = ORGS[key].ca;
		caClients[key] = new copService(caUrl, null /*defautl TLS opts*/, '' /* default CA */, cryptoSuite);
	}
}

function setupPeers(channel, org, client) {
	for (var _key in ORGS[org]) {
		if (_key.indexOf('peer') === 0) {
			var data = fs.readFileSync(path.join(__dirname, ORGS[org][_key]['tls_cacerts']));
			var peer = client.newPeer(ORGS[org][_key].requests, {
				pem: Buffer.from(data).toString(),
				'ssl-target-name-override': ORGS[org][_key]['server-hostname']
			});
			channel.addPeer(peer);
		}
	}
}

function newOrderer(client) {
	var caRootsPath = ORGS.orderer.tls_cacerts;
	var data = fs.readFileSync(path.join(__dirname, caRootsPath));
	var caroots = Buffer.from(data).toString();
	return client.newOrderer(config.orderer, {
		'pem': caroots,
		'ssl-target-name-override': ORGS.orderer['server-hostname']
	});
}

function readAllFiles(dir) {
	var files = fs.readdirSync(dir);
	var certs = [];
	files.forEach(function (file_name) {
		var file_path = path.join(dir, file_name);
		var data = fs.readFileSync(file_path);
		certs.push(data);
	});
	return certs;
}

function getOrgName(org) {
	return ORGS[org].name;
}

function getKeyStoreForOrg(org) {
	return config.keyValueStore + '_' + org;
}

function newRemotes(urls, forPeers, userOrg) {
	var targets = [];
	// console.log("helper.js ==> newRemotes");
	// console.log(urls);
	// console.log(forPeers);
	// console.log(userOrg);
	// console.log("--------------------------");
	// find the peer that match the urls
	outer: for (var index in urls) {
		var peerUrl = urls[index];
		// console.log(peerUrl);
		var found = false;
		for (var _key2 in ORGS) {
			// console.log(key);
			if (_key2.indexOf('org') === 0) {
				// if looking for event hubs, an app can only connect to
				// event hubs in its own org
				if (!forPeers && _key2 !== userOrg) {
					continue;
				}

				var org = ORGS[_key2];
				// console.log("*****************");
				// console.log(org);
				var _client = getClientForOrg(_key2);

				for (var prop in org) {
					if (prop.indexOf('peer') === 0) {
						// console.log(org[prop]['requests']);
						if (org[prop]['requests'].indexOf(peerUrl) >= 0) {
							// found a peer matching the subject url
							if (forPeers) {
								var data = fs.readFileSync(path.join(__dirname, org[prop]['tls_cacerts']));
								targets.push(_client.newPeer('grpcs://' + peerUrl, {
									pem: Buffer.from(data).toString(),
									'ssl-target-name-override': org[prop]['server-hostname'],
									'request-timeout': 9500
								}));

								continue outer;
							} else {
								var eh = _client.newEventHub();
								var _data = fs.readFileSync(path.join(__dirname, org[prop]['tls_cacerts']));
								eh.setPeerAddr(org[prop]['events'], {
									pem: Buffer.from(_data).toString(),
									'ssl-target-name-override': org[prop]['server-hostname']
								});
								targets.push(eh);

								continue outer;
							}
						}
					}
				}
			}
		}

		if (!found) {
			console.log(util.format('Failed to find a peer matching the url %s', peerUrl));
			console.log(util.format('Failed to find a peer matching the url %s', peerUrl));
		}
	}

	return targets;
}

//-------------------------------------//
// APIs
//-------------------------------------//
var getChannelForOrg = function getChannelForOrg(org) {
	return channels[org];
};

var getClientForOrg = function getClientForOrg(org) {
	// console.log("getClientForOrg")	;
	// console.log(clients[org]);
	// console.log("-------");
	return clients[org];
};

var newPeers = function newPeers(urls) {
	return newRemotes(urls, true);
};

var newEventHubs = function newEventHubs(urls, org) {
	return newRemotes(urls, false, org);
};

var getMspID = function getMspID(org) {
	console.log('Msp ID : ' + ORGS[org].mspid);
	return ORGS[org].mspid;
};

var getAdminUser = function getAdminUser(userOrg) {
	var users = config.users;
	var username = users[0].username;
	var password = users[0].secret;
	var member;
	var client = getClientForOrg(userOrg);

	return hfc.newDefaultKeyValueStore({
		path: getKeyStoreForOrg(getOrgName(userOrg))
	}).then(function (store) {
		client.setStateStore(store);
		// clearing the user context before switching
		client._userContext = null;
		return client.getUserContext(username, true).then(function (user) {
			if (user && user.isEnrolled()) {
				console.log('Successfully loaded member from persistence');
				return user;
			} else {
				var caClient = caClients[userOrg];
				// need to enroll it with CA server
				return caClient.enroll({
					enrollmentID: username,
					enrollmentSecret: password
				}).then(function (enrollment) {
					console.log('Successfully enrolled user \'' + username + '\'');
					member = new User(username);
					member.setCryptoSuite(client.getCryptoSuite());
					return member.setEnrollment(enrollment.key, enrollment.certificate, getMspID(userOrg));
				}).then(function () {
					return client.setUserContext(member);
				}).then(function () {
					return member;
				}).catch(function (err) {
					console.log( true ? err.stack : err);
					return null;
				});
			}
		});
	});
};

var getRegisteredUsers = function getRegisteredUsers(username, userOrg, isJson) {
	var member;
	var client = getClientForOrg(userOrg);
	var enrollmentSecret = null;
	return hfc.newDefaultKeyValueStore({
		path: getKeyStoreForOrg(getOrgName(userOrg))
	}).then(function (store) {
		client.setStateStore(store);
		// clearing the user context before switching
		client._userContext = null;
		return client.getUserContext(username, true).then(function (user) {
			if (user && user.isEnrolled()) {
				console.log('Successfully loaded member from persistence');
				return user;
			} else {
				var caClient = caClients[userOrg];
				return getAdminUser(userOrg).then(function (adminUserObj) {
					member = adminUserObj;
					return caClient.register({
						enrollmentID: username,
						affiliation: userOrg + '.department1'
					}, member);
				}).then(function (secret) {
					enrollmentSecret = secret;
					console.log(username + ' registered successfully');
					return caClient.enroll({
						enrollmentID: username,
						enrollmentSecret: secret
					});
				}, function (err) {
					console.log(username + ' failed to register');
					console.log(err);
					return '' + err;
					//return 'Failed to register '+username+'. Error: ' + err.stack ? err.stack : err;
				}).then(function (message) {
					if (message && typeof message === 'string' && message.includes('Error:')) {
						console.log(username + ' enrollment failed');
						return message;
					}
					console.log(username + ' enrolled successfully');

					member = new User(username);
					member._enrollmentSecret = enrollmentSecret;
					return member.setEnrollment(message.key, message.certificate, getMspID(userOrg));
				}).then(function () {
					client.setUserContext(member);
					return member;
				}, function (err) {
					console.log(util.format('%s enroll failed: %s', username, err.stack ? err.stack : err));
					return '' + err;
				});;
			}
		});
	}).then(function (user) {
		if (isJson && isJson === true) {
			var response = {
				success: true,
				secret: user._enrollmentSecret,
				message: username + ' enrolled Successfully'
			};
			return response;
		}
		return user;
	}, function (err) {
		console.log(util.format('Failed to get registered user: %s, error: %s', username, err.stack ? err.stack : err));
		return '' + err;
	});
};

var getOrgAdmin = function getOrgAdmin(userOrg) {
	var admin = ORGS[userOrg].admin;
	var keyPath = path.join(__dirname, admin.key);
	var keyPEM = Buffer.from(readAllFiles(keyPath)[0]).toString();
	var certPath = path.join(__dirname, admin.cert);
	var certPEM = readAllFiles(certPath)[0].toString();

	var client = getClientForOrg(userOrg);
	var cryptoSuite = hfc.newCryptoSuite();
	if (userOrg) {
		cryptoSuite.setCryptoKeyStore(hfc.newCryptoKeyStore({ path: getKeyStoreForOrg(getOrgName(userOrg)) }));
		client.setCryptoSuite(cryptoSuite);
	}

	return hfc.newDefaultKeyValueStore({
		path: getKeyStoreForOrg(getOrgName(userOrg))
	}).then(function (store) {
		client.setStateStore(store);

		return client.createUser({
			username: 'peer' + userOrg + 'Admin',
			mspid: getMspID(userOrg),
			cryptoContent: {
				privateKeyPEM: keyPEM,
				signedCertPEM: certPEM
			}
		});
	});
};

var setupChaincodeDeploy = function setupChaincodeDeploy() {
	process.env.GOPATH = path.join(__dirname, "../" + config.GOPATH);
};

var getLogger = function getLogger(moduleName) {
	var logger = log4js.getLogger(moduleName);
	// logger.setLevel('DEBUG');
	return logger;
};

var getPeerAddressByName = function getPeerAddressByName(org, peer) {
	var address = ORGS[org][peer].requests;
	return address.split('grpcs://')[1];
};

exports.getChannelForOrg = getChannelForOrg;
exports.getClientForOrg = getClientForOrg;
exports.getLogger = getLogger;
exports.setupChaincodeDeploy = setupChaincodeDeploy;
exports.getMspID = getMspID;
exports.ORGS = ORGS;
exports.newPeers = newPeers;
exports.newEventHubs = newEventHubs;
exports.getPeerAddressByName = getPeerAddressByName;
exports.getRegisteredUsers = getRegisteredUsers;
exports.getOrgAdmin = getOrgAdmin;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMaterialize = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SupFab = function (_React$Component) {
    _inherits(SupFab, _React$Component);

    function SupFab(props) {
        _classCallCheck(this, SupFab);

        return _possibleConstructorReturn(this, (SupFab.__proto__ || Object.getPrototypeOf(SupFab)).call(this, props));
    }

    _createClass(SupFab, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var isOwner = this.props.isOwner;
            if (!isOwner) {
                return _react2.default.createElement('p', null);
            }

            return _react2.default.createElement(
                'div',
                { className: 'fixed-action-btn horizontal click-to-toggle', style: { position: "absolute", right: " 24px", bottom: "1.2em", zIndex: "997" } },
                _react2.default.createElement(
                    'a',
                    { className: 'btn tooltipped btn-floating btn-medium red', 'data-position': 'top', 'data-tooltip': 'Share' },
                    _react2.default.createElement(
                        'i',
                        { className: 'material-icons' },
                        'share'
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        { key: "mail" },
                        _react2.default.createElement(
                            'a',
                            { className: 'btn tooltipped btn-floating yellow darken-1 modal-trigger', 'data-position': 'top', 'data-tooltip': 'Share by eMail',
                                style: { transform: "scaleY(0.4) scaleX(0.4) translateY(0px) translateX(40px)", opacity: "0" },
                                onClick: function onClick(e) {
                                    _this2.props.mailModal(_this2.props.supId);
                                } },
                            _react2.default.createElement(
                                'i',
                                { className: 'material-icons' },
                                'mail'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { key: "qr" },
                        _react2.default.createElement(
                            'a',
                            { className: 'btn tooltipped btn-floating blue darken-1 modal-trigger', 'data-position': 'top', 'data-tooltip': 'Share by QR code',
                                style: { transform: "scaleY(0.4) scaleX(0.4) translateY(0px) translateX(40px)", opacity: "0" },
                                onClick: function onClick(e) {
                                    _this2.props.qrModal(_this2.props.supId);
                                } },
                            _react2.default.createElement(
                                'i',
                                { className: 'material-icons' },
                                'dashboard'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SupFab;
}(_react2.default.Component);

exports.default = SupFab;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMaterialize = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SupBtns = function (_React$Component) {
  _inherits(SupBtns, _React$Component);

  function SupBtns() {
    _classCallCheck(this, SupBtns);

    return _possibleConstructorReturn(this, (SupBtns.__proto__ || Object.getPrototypeOf(SupBtns)).apply(this, arguments));
  }

  _createClass(SupBtns, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        $('.tooltipped').tooltip();
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var download = _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/back/supplement/rest/pdf/" + this.props.id, className: 'btn btn-floating tooltipped btn-medium waves-effect waves-light blue darken-3', 'data-position': 'top', 'data-tooltip': 'Download pdf', target: '_blank' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'file_download'
        )
      );
      var downloadRaw = _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/back/supplement/rest/raw/" + this.props.id, className: 'btn btn-floating tooltipped btn-medium waves-effect waves-light raw darken-3', 'data-position': 'top', 'data-tooltip': 'Download XML/JSON', target: '_blank' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'code'
        )
      );
      var edit = _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/app/edit/" + this.props.id, className: 'btn btn-floating tooltipped btn-medium waves-effect waves-light yellow darken-3', 'data-position': 'top', 'data-tooltip': 'Who has access?', style: { marginLeft: "1em" } },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'edit'
        )
      );

      if (this.props.isOwner) {
        return _react2.default.createElement(
          'span',
          null,
          download,
          downloadRaw,
          edit
        );
      } else {
        return _react2.default.createElement(
          'span',
          null,
          download,
          downloadRaw
        );
      }
    }
  }]);

  return SupBtns;
}(_react2.default.Component);

exports.default = SupBtns;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("axios-retry");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserToRem = addUserToRem;
exports.remUsers = remUsers;

var _axios = __webpack_require__(12);

var _axios2 = _interopRequireDefault(_axios);

var _axiosRetry = __webpack_require__(13);

var _axiosRetry2 = _interopRequireDefault(_axiosRetry);

var _utils = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _axiosRetry2.default)(_axios2.default, { retries: 3 });
// ES6
function addUserToRem(userEmail) {
  return {
    type: "ADD_USER_REM",
    payload: userEmail
  };
}

function remUsers(supplementId, users) {
  return function (dispatch) {
    console.log("wil dispatch");
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "MODAL_OPEN" });
    dispatch({ type: "REM_USERS_SENT" });
    console.log("wil open");

    var data = {};
    data.supId = supplementId;
    data.emails = users;

    console.log(users);

    $('#modal1').modal('open');
    (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/removeInvites", data)
    // axios.post("/back/supplement/rest/removeInvites",data)
    .then(function (response) {
      dispatch({ type: "REM_USERS_FULLFILED", payload: response.data });
      dispatch({ type: "MODAL_CLOSE" });
      $('#modal1').modal('close');
    }).catch(function (err) {
      dispatch({ type: "REM_USERS_REJECTED", payload: err });
    });
  };
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUser = fetchUser;
exports.setUserName = setUserName;
exports.setUser = setUser;
exports.logout = logout;
exports.reduceTime = reduceTime;
exports.restartClock = restartClock;
function fetchUser() {
  return {
    type: "FETCH_USER_FULLFILED",
    payload: {
      name: "Nikos",
      age: "34"
    }
  };
}

function setUserName(name) {
  return {
    type: "SET_USER_NAME",
    payload: name
  };
}

function setUser(user) {
  return {
    type: "SET_USER",
    payload: user
  };
}

function logout() {
  document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location = "/app/";
  return { type: "LOG_OUT"
  };
}

function reduceTime(minutes, seconds) {
  console.log("reduce time called with ", minutes, seconds);

  if (minutes === 0 && seconds === 1) {
    document.cookie = "access_token" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
    window.location = "/app/logout";
    return { type: "LOG_OUT" };
  } else {
    return function (dispatch) {
      dispatch({ type: "REDUCE_SECOND", payload: "" });
    };
  }
}

function restartClock() {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK",
      payload: "" });
  };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _userActions = __webpack_require__(15);

var _office = __webpack_require__(43);

var _office2 = _interopRequireDefault(_office);

var _user = __webpack_require__(44);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNavigation = (_dec = (0, _reactRedux.connect)(function (store) {
  return {};
}), _dec(_class = function (_React$Component) {
  _inherits(SideNavigation, _React$Component);

  function SideNavigation(props) {
    _classCallCheck(this, SideNavigation);

    var _this = _possibleConstructorReturn(this, (SideNavigation.__proto__ || Object.getPrototypeOf(SideNavigation)).call(this, props));

    _this.logoutUser = _this.logoutUser.bind(_this);
    return _this;
  }

  _createClass(SideNavigation, [{
    key: 'logoutUser',
    value: function logoutUser() {
      this.props.dispatch(_userActions.logout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var user = this.props.user;
      // console.log("user2");
      // console.log(this.props.user);
      // return   <SideNav
      //           	trigger={this.props.trig}
      //           	options={{ closeOnClick: true }}
      //             ref={this.props.inputRef}
      //           	>
      //           	<SideNavItem userView
      //           		user={{
      //           			background: officeImg,
      //           			image: accountImg,
      //           			name: user.firstName + " " + user.lastName,
      //           			email: user.email,
      //                 userName: user.userName
      //
      //           		}}
      //           	/>
      //             <SideNavItem subheader> Information </SideNavItem>
      //             <SideNavItem divider />
      //             <SideNavItem> {"First Name:" + user.firstName}</SideNavItem>
      //             <SideNavItem>  {"Last Name:" +user.lastName}</SideNavItem>
      //             <SideNavItem> { "International First Name:" + user.intFirstName}</SideNavItem>
      //             <SideNavItem>  {"International Last Name:" +user.intFamilyName}</SideNavItem>
      //             <SideNavItem>  {"UserName:" + user.userName}</SideNavItem>
      //             <SideNavItem subheader>Actions</SideNavItem>
      //           	<SideNavItem divider />
      //           	<SideNavItem> <div onClick={e =>this.logoutUser()}>Logout</div></SideNavItem>
      //           </SideNav>

      // <li>
      //  <div class="userView">
      //    <div class="background">
      //       <img src="/img/office.jpg">
      //    </div>
      //     <a href="#!user"><img class="circle" src="/img/user.png"></a>
      //     <a href="#!name">
      //        span.white-text.name #{firstName} #{lastName}
      //     </a>
      //     <a href="#!email">
      //        span.white-text.email #{email}
      //     </a>
      //  </div>
      // </li>
      //    <a href="#!name"><span class="white-text name">{"First Name:" + user.firstName}</span></a>
      return _react2.default.createElement(
        'ul',
        { id: 'slide-out', className: 'side-nav', style: this.props.style },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'div',
            { className: 'userView' },
            _react2.default.createElement(
              'div',
              { className: 'background' },
              _react2.default.createElement('img', { src: _office2.default })
            ),
            _react2.default.createElement(
              'a',
              { href: '#!user' },
              _react2.default.createElement('img', { className: 'circle', src: _user2.default })
            ),
            _react2.default.createElement(
              'a',
              { href: '#!name' },
              _react2.default.createElement(
                'span',
                { style: { color: "white" } },
                'Profile Information'
              )
            )
          )
        ),
        _react2.default.createElement(
          'a',
          { href: '#!name' },
          _react2.default.createElement(
            'span',
            null,
            "First Name:" + this.props.user.firstName
          )
        ),
        _react2.default.createElement(
          'a',
          { href: '#!email' },
          _react2.default.createElement(
            'span',
            null,
            ' ',
            "Last Name:" + user.lastName
          )
        ),
        _react2.default.createElement(
          'a',
          { href: '#!name' },
          _react2.default.createElement(
            'span',
            null,
            "International First Name:" + user.intFirstName
          )
        ),
        _react2.default.createElement(
          'a',
          { href: '#!email' },
          _react2.default.createElement(
            'span',
            null,
            "International Last Name:" + user.intFamilyName
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement('div', { className: 'divider' })
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'a',
            { style: { cursor: "pointer" }, onClick: function onClick(e) {
                return _this2.logoutUser();
              } },
            _react2.default.createElement(
              'span',
              null,
              'Logout'
            )
          )
        )
      );
    }
  }]);

  return SideNavigation;
}(_react2.default.Component)) || _class);
exports.default = SideNavigation;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retryAxiosNtimes = retryAxiosNtimes;
exports.retryAxiosNtimesPost = retryAxiosNtimesPost;

var _axios = __webpack_require__(12);

var _axios2 = _interopRequireDefault(_axios);

var _axiosRetry = __webpack_require__(13);

var _axiosRetry2 = _interopRequireDefault(_axiosRetry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _axiosRetry2.default)(_axios2.default, { retries: 3 });

function retryAxiosNtimes(times, counter, url) {
  var config = {
    headers: { Pragma: 'no-cache' }
  };
  return new Promise(function (resolve, reject) {
    _axios2.default.get(url, config).then(function (response) {
      resolve(response);
    }).catch(function (err) {
      if (counter < times) {
        counter++;
        console.log("will try again " + counter);
        sleep(1000).then(function () {
          resolve(retryAxiosNtimes(times, counter, url));
        });
      } else {
        console.log('tried ' + counter + ' times');
        reject(err);
      }
    });
  });
}

function retryAxiosNtimesPost(times, counter, url, data) {
  var config = {
    headers: { Pragma: 'no-cache' }
  };
  return new Promise(function (resolve, reject) {
    _axios2.default.post(url, data, config).then(function (response) {
      resolve(response);
    }).catch(function (err) {
      if (counter < times) {
        counter++;
        console.log("will try again " + counter);
        sleep(1000).then(function () {
          resolve(retryAxiosNtimes(times, counter, url));
        });
      } else {
        console.log('tried ' + counter + ' times');
        reject(err);
      }
    });
  });
}

function sleep(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fabric-client");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("fabric-client/lib/Peer.js");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("fabric-client/lib/EventHub.js");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSupplementsByEid = getSupplementsByEid;
exports.removeSupplements = removeSupplements;
exports.openShareByMail = openShareByMail;
exports.shareByMail = shareByMail;
exports.openShareByQR = openShareByQR;
exports.shareByQR = shareByQR;

var _fakeDS = __webpack_require__(31);

var _fakeDS2 = _interopRequireDefault(_fakeDS);

var _axios = __webpack_require__(12);

var _axios2 = _interopRequireDefault(_axios);

var _axiosRetry = __webpack_require__(13);

var _axiosRetry2 = _interopRequireDefault(_axiosRetry);

var _utils = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ES6
(0, _axiosRetry2.default)(_axios2.default, { retries: 3 });

function getSupplementsByEid(userEid, counter) {

  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "GET_SUP" });
    (0, _utils.retryAxiosNtimes)(4, 0, "/back/supplement/rest/view").then(function (response) {
      dispatch({ type: "GET_SUP_FULLFILED", payload: JSON.parse(response.data) });
    }).catch(function (err) {
      dispatch({ type: "GET_SUP_REJECTED", payload: err });
    });
    // axios.get("/back/supplement/rest/view")
    //  .then(response =>{
    //     dispatch({type: "GET_SUP_FULLFILED",payload:JSON.parse(response.data)})
    //  })
    //  .catch(err=>{
    //    console.log("will try again");
    //    dispatch({type:"GET_SUP_REJECTED",payload:err});
    //
    //  });
  };
}

function removeSupplements() {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "REMOVE_SUP_VIEW" });
  };
}

function openShareByMail(supId) {
  return function (dispatch) {
    dispatch({ type: "OPEN_SHARE_BY_MAIL" });
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    // console.log(supId)  ;
    $('#mailModal' + supId).modal('open');
  };
}

function shareByMail(_supId, _email) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "SHARE_SUP_STARTED" });
    var data = { email: _email, supId: _supId };
    (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/inviteByMail", data)
    // axios.post("/back/supplement/rest/inviteByMail",data)
    .then(function (response) {
      dispatch({ type: "SHARE_SUP_FULLFILED" });
      // console.log('#modal'+_supId);
      $('#mailModal' + _supId).modal('close');
    }).catch(function (err) {
      dispatch({ type: "SHARE_SUP_REJECTED", payload: err.toString() });
    });
  };
}

function openShareByQR(supId) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "OPEN_SHARE_BY_QR" });
    console.log(supId);
    $('#qrModal' + supId).modal('open');
  };
}

function shareByQR(_supId, _email) {
  return function (dispatch) {
    dispatch({ type: "SHARE_SUP_QR" });
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/inviteByQR", { "supId": _supId, "email": _email })
    // axios.post("/back/supplement/rest/inviteByQR",{"supId":_supId, "email":_email})
    .then(function (response) {
      // console.log(response);
      dispatch({ type: "SHARE_SUP_QR_FULLFILED",
        //payload:'<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>'
        payload: response.data
      });
    }).catch(function (err) {
      dispatch({ type: "SHARE_SUP_QR_REJECTED", payload: err.toString() });
    });
  };
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _supplementFab = __webpack_require__(10);

var _supplementFab2 = _interopRequireDefault(_supplementFab);

var _supplementBtns = __webpack_require__(11);

var _supplementBtns2 = _interopRequireDefault(_supplementBtns);

var _shareSupMailModal = __webpack_require__(59);

var _shareSupMailModal2 = _interopRequireDefault(_shareSupMailModal);

var _shareSupQRModal = __webpack_require__(60);

var _shareSupQRModal2 = _interopRequireDefault(_shareSupQRModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SupplementCard = function (_React$Component) {
  _inherits(SupplementCard, _React$Component);

  function SupplementCard(props) {
    _classCallCheck(this, SupplementCard);

    return _possibleConstructorReturn(this, (SupplementCard.__proto__ || Object.getPrototypeOf(SupplementCard)).call(this, props));
  }

  _createClass(SupplementCard, [{
    key: 'render',
    value: function render() {
      var sup = this.props.sup;

      var headerCss = { backgroundColor: "aliceblue", color: "black" };
      // const over = {overflow:"hidden"};

      var contents = Object.keys(sup).filter(function (key) {
        return key !== "Name" && key !== "Surname" && key !== "Authorized";
      }).map(function (key) {
        if (typeof sup[key] === "string") {
          return _react2.default.createElement(
            'li',
            { key: key },
            _react2.default.createElement(
              'div',
              { className: 'collapsible-header', style: { color: "black", overflow: "hidden" }, key: key },
              _react2.default.createElement(
                'b',
                null,
                key
              ),
              ' : ',
              sup[key]
            )
          );
        } else {
          var entry = sup[key];
          var innerContents = Object.keys(entry).map(function (k) {
            if (k !== "ProgrammeDetails") {
              return _react2.default.createElement(
                'div',
                { className: 'collapsible-body', style: { color: "black" }, key: k },
                _react2.default.createElement(
                  'span',
                  null,
                  k,
                  ' : ',
                  entry[k]
                )
              );
            } else {
              // console.log(k,entry[k]);
              var details = entry[k];
              var modules = [];
              details.Modules.map(function (mod) {
                modules.push(_react2.default.createElement(
                  _reactMaterialize.Row,
                  { key: mod.ModuleCode },
                  _react2.default.createElement(
                    _reactMaterialize.Col,
                    { m: 12, s: 12 },
                    _react2.default.createElement(
                      _reactMaterialize.Card,
                      null,
                      _react2.default.createElement(
                        _reactMaterialize.Collection,
                        null,
                        _react2.default.createElement(
                          _reactMaterialize.CollectionItem,
                          { key: "ModuleCode" },
                          _react2.default.createElement(
                            'span',
                            null,
                            'ModuleCode: ',
                            mod.ModuleCode
                          )
                        ),
                        _react2.default.createElement(
                          _reactMaterialize.CollectionItem,
                          { key: "NameOfTheModule" },
                          _react2.default.createElement(
                            'span',
                            null,
                            'NameOfTheModule: ',
                            mod.NameOfTheModule
                          )
                        ),
                        _react2.default.createElement(
                          _reactMaterialize.CollectionItem,
                          { key: "TypeOfModule" },
                          _react2.default.createElement(
                            'span',
                            null,
                            'TypeOfModule: ',
                            mod.TypeOfModule
                          )
                        ),
                        _react2.default.createElement(
                          _reactMaterialize.CollectionItem,
                          { key: "ExamPeriod" },
                          _react2.default.createElement(
                            'span',
                            null,
                            'ExamPeriod: ',
                            mod.ExamPeriod
                          )
                        ),
                        _react2.default.createElement(
                          _reactMaterialize.CollectionItem,
                          { key: "Grade" },
                          _react2.default.createElement(
                            'span',
                            null,
                            'Grade: ',
                            mod.Grade
                          )
                        ),
                        _react2.default.createElement(
                          _reactMaterialize.CollectionItem,
                          { key: "InWriting" },
                          _react2.default.createElement(
                            'span',
                            null,
                            'InWriting: ',
                            mod.InWriting
                          )
                        )
                      )
                    )
                  )
                ));
              });

              return _react2.default.createElement(
                'div',
                { className: 'collapsible-body', style: { color: "black" }, key: k },
                _react2.default.createElement(
                  _reactMaterialize.Collection,
                  null,
                  _react2.default.createElement(
                    _reactMaterialize.CollectionItem,
                    { key: k },
                    _react2.default.createElement(
                      'span',
                      null,
                      k
                    )
                  ),
                  _react2.default.createElement(
                    _reactMaterialize.CollectionItem,
                    { key: "Description" },
                    _react2.default.createElement(
                      'span',
                      null,
                      'Description :',
                      details.Description
                    )
                  ),
                  _react2.default.createElement(
                    _reactMaterialize.CollectionItem,
                    { key: "Legend" },
                    _react2.default.createElement(
                      'span',
                      null,
                      'Legend :',
                      details.Legend
                    )
                  ),
                  _react2.default.createElement(
                    _reactMaterialize.CollectionItem,
                    { id: 'modulesCollection', key: "Modules" },
                    _react2.default.createElement(
                      _reactMaterialize.Collapsible,
                      null,
                      _react2.default.createElement(
                        _reactMaterialize.CollapsibleItem,
                        { className: 'modulesCard', key: "Mods", header: 'Modules', icon: 'expand_more', style: headerCss },
                        modules
                      )
                    )
                  )
                )
              );

              // <div class="collapsible-body" style={{color:"black"}}><span>Modules :{modules}</span></div>,

            }

            // return null;
          });
          // console.log(innerContents);
          return _react2.default.createElement(
            'li',
            { key: key },
            _react2.default.createElement(
              'div',
              { className: 'collapsible-header', 'data-collapsible': 'accordion', style: headerCss },
              key,
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'expand_more'
              )
            ),
            innerContents
          );
        }
        return key;
      });

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(
            'div',
            { className: 'card ' },
            _react2.default.createElement(
              'div',
              { className: 'card-content white-text' },
              _react2.default.createElement(_reactMaterialize.Input, { name: sup.Id, type: 'checkbox', value: 'red', label: 'Select' }),
              _react2.default.createElement(
                'span',
                { className: 'card-title' },
                'Card Title'
              ),
              _react2.default.createElement(
                _reactMaterialize.Collapsible,
                { accordion: true },
                contents
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-action' },
              _react2.default.createElement(_supplementBtns2.default, { isOwner: !this.props.restricted, id: sup.Id }),
              _react2.default.createElement(_supplementFab2.default, { isOwner: !this.props.restricted,
                mailModal: this.props.openShareByMail,
                qrModal: this.props.openShareByQR,
                supId: sup.Id
              }),
              _react2.default.createElement(_shareSupMailModal2.default, { sup: sup }),
              _react2.default.createElement(_shareSupQRModal2.default, { sup: sup })
            )
          )
        )
      );
    }
  }]);

  return SupplementCard;
}(_react2.default.Component);

exports.default = SupplementCard;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _supplementFab = __webpack_require__(10);

var _supplementFab2 = _interopRequireDefault(_supplementFab);

var _supplementBtns = __webpack_require__(11);

var _supplementBtns2 = _interopRequireDefault(_supplementBtns);

var _editSupplementActions = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestSupplementModal = (_dec = (0, _reactRedux.connect)(function (store) {
  return { usersToRem: store.edit.usersToRem,
    removingUser: store.edit.removingUser,
    removedUser: store.edit.removedUser,
    remError: store.edit.remError
  };
}), _dec(_class = function (_React$Component) {
  _inherits(RequestSupplementModal, _React$Component);

  function RequestSupplementModal(props) {
    _classCallCheck(this, RequestSupplementModal);

    return _possibleConstructorReturn(this, (RequestSupplementModal.__proto__ || Object.getPrototypeOf(RequestSupplementModal)).call(this, props));
  }

  _createClass(RequestSupplementModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { id: 'modal1', className: 'modal' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'h4',
            null,
            'Requesting Supplement Publication'
          ),
          _react2.default.createElement(_reactMaterialize.ProgressBar, null)
        )
      );
    }
  }]);

  return RequestSupplementModal;
}(_react2.default.Component)) || _class);
exports.default = RequestSupplementModal;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("react-cookie");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMaterialize = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _sideNav = __webpack_require__(16);

var _sideNav2 = _interopRequireDefault(_sideNav);

var _clock = __webpack_require__(45);

var _clock2 = _interopRequireDefault(_clock);

var _withStyles = __webpack_require__(46);

var _withStyles2 = _interopRequireDefault(_withStyles);

__webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationBar = function (_React$Component) {
  _inherits(NavigationBar, _React$Component);

  function NavigationBar() {
    _classCallCheck(this, NavigationBar);

    return _possibleConstructorReturn(this, (NavigationBar.__proto__ || Object.getPrototypeOf(NavigationBar)).apply(this, arguments));
  }

  _createClass(NavigationBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        $(".button-collapse").sideNav();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        // 'zIndex': '998!important',
        'backgroundColor': '#06114e!important'
      };
      // console.log("user");
      // console.log(this.props.user);

      // const account = <li><NavLink to="/">Account</NavLink></li>;

      /*
       //   return   <Navbar style={style} href="/app/" brand='e-DS Service' right fixed={true} className="blueBar">
      //   <li><NavLink to="/app/home">Home</NavLink></li>
      //   <li><NavLink to="/app/manage">Manage Supplements</NavLink></li>
      //   <li><NavLink to="/app/request">Request new Supplement</NavLink></li>
      //   <SideNavigation  trig={account} user= {this.props.user}/>
      // </Navbar>
      */
      //  <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>

      _react2.default.createElement(_sideNav2.default, { user: this.props.user, style: {} });

      return _react2.default.createElement(
        'div',
        { className: 'navbar-fixed' },
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'div',
            { className: 'nav-wrapper' },
            _react2.default.createElement(
              'a',
              { href: '#!', className: 'brand-logo hide-on-large-only', style: { left: "30%" } },
              ' ',
              _react2.default.createElement(_clock2.default, null)
            ),
            _react2.default.createElement(
              'a',
              { href: '#!', className: 'brand-logo hide-on-large-only', style: { marginLeft: "5rem" } },
              ' e-DS Service'
            ),
            _react2.default.createElement(
              'a',
              { href: '#!', className: 'brand-logo hide-on-med-and-down' },
              ' ',
              _react2.default.createElement(_clock2.default, null)
            ),
            _react2.default.createElement(
              'a',
              { href: '#!', className: 'brand-logo hide-on-med-and-down', style: { marginLeft: "2rem" } },
              ' e-DS Service'
            ),
            _react2.default.createElement(
              'a',
              { href: '#', 'data-activates': 'mobile-demo', className: 'button-collapse' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'menu'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'right hide-on-med-and-down' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/app/home' },
                  'Home'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/app/manage' },
                  'Manage Supplements'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/app/request' },
                  'Request new Supplement'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#', 'data-activates': 'slide-out', className: 'button-collapse show-on-large' },
                  'Account'
                )
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'side-nav', id: 'mobile-demo' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/app/home' },
                  'Home'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/app/manage' },
                  'Manage Supplements'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/app/request' },
                  'Request new Supplement'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#', 'data-activates': 'slide-out', className: 'button-collapse' },
                  'Account'
                )
              )
            )
          )
        ),
        _react2.default.createElement(_sideNav2.default, { user: this.props.user, style: { zIndex: "999" } })
      );
    }
  }]);

  return NavigationBar;
}(_react2.default.Component);

exports.default = NavigationBar;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(47);
    var insertCss = __webpack_require__(49);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--0-1!./navbar.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--0-1!./navbar.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  DS: [{ "Owner": "GRGRCph445859_", "Name": "", "Surname": "", "University": "UAgean", "Authorized": ["n", "k"], "Id": "59faf9fb9", "Holder_Info": { "Name": "cph7 cph7", "DateOfBirth": "1966-01-01", "StudentId": "ge01118" }, "Qualification_Info": { "Name": "DIPLOMA IN FINANCIAL AND MANAGEMENT ENGINEERING", "FieldsOfStudy": "ENGINEERING SCIENCE", "InstitutionName": "University of the Aegean - Panepistimio Ageou", "InstitutionStatus": "Public Higher Education Institution", "InstructionLanguage": "Greek" }, "Qualification_Level": { "Level": "Undergraduate Studies - Bachelor's Degree (1st Cycle of Studies)", "ProgrammeLength": "", "AccecssRequirements": "Panhellenic entry examinations for the holders of the School-leaving Certificate (\"Apolitirio\") or those who belong to special categries or have undertaken examinations under the classification system" }, "Content_Info": { "ModeOfStudy": "FULL-TIME", "ProgrammeRequirements": "To be awareded the FME Diploma the students should successfully ... loads of text here", "Programme_Details": { "Description": "The course on which the bachelors graduate was examined... loads of text", "Modules": [{ "ModuleCode": "OIO103", "NameOfTheModule": "Introduction to Economics", "TypeOfModule": "CC", "ExamPeriod": "Feb. 2012", "Grade": "6", "InWriting": "six" }, { "ModuleCode": "MH0103", "NameOfTheModule": "Introduction to System Design", "TypeOfModule": "CC", "ExamPeriod": "Feb. 2012", "Grade": "7", "InWriting": "Seven" }], "Legend": "The column \"Type of the Module(course)\" contains the loads of text... " }, "GradingScheme": "According to the Studies Regulation... loads of text", "OverallClassificationOfQualification": "6,87 (Very Good-Lian Kalos)" }, "Qualification_Function": { "AccessToFurtherStudy": "The Bachelor's Degree offers the opportunity...", "ProfessionalStatus": "The profeessional status of the Department of Financiasl ... " }, "Additional_Info": { "AdditionalInfo": "There are no additional info", "InfoSources": "Web site of the University of the Aegean ..." }, "Supplement_Certification": { "Date": "01-01-2017", "Name": "Konstatinos Papaegorgiou (Associcate Professor)", "Capacity": "The Head of the Department of Financial and Management Engineering", "Signature": "JPG signature image", "Stamp": "The certification is signed by the Head of the Department, in accordance with the  Decision of the Senate of the institution" }, "HigherEducationSystem_Info": { "HigherEductaionSystemInfo": "" } }]

};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCode = updateCode;
exports.sendValidation = sendValidation;
exports.getInvAndGenValCode = getInvAndGenValCode;
exports.openShareByMail = openShareByMail;
exports.shareByMail = shareByMail;
exports.openShareByQR = openShareByQR;
exports.shareByQR = shareByQR;

var _fakeDS = __webpack_require__(31);

var _fakeDS2 = _interopRequireDefault(_fakeDS);

var _axios = __webpack_require__(12);

var _axios2 = _interopRequireDefault(_axios);

var _axiosRetry = __webpack_require__(13);

var _axiosRetry2 = _interopRequireDefault(_axiosRetry);

var _utils = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _axiosRetry2.default)(_axios2.default, { retries: 3 });
// ES6
function updateCode(code) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "UPDATE_CODE", payload: code });
  };
};

function sendValidation(_code, invHash) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "SEND_UPDATE_CODE", payload: code });

    // axios.post("/back/supplement/rest/invite/"+invHash+"/authorize",
    //                 { validationCode:_code,
    //                   inviteHash: invHash
    //           })
    (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/invite/" + invHash + "/authorize", { validationCode: _code, inviteHash: invHash }).then(function (res) {
      dispatch({ type: "GET_INV_SUP_FULLFILED", payload: JSON.parse(res.data) });
    }).catch(function (err) {
      dispatch({ type: "GET_INV_REJECTED", payload: err });
    });
  };
}

function getInvAndGenValCode(inviteId) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "GET_INV" });
    console.log("the id is " + inviteId);
    (0, _utils.retryAxiosNtimes)(4, 0, "/back/supplement/rest/invite/" + inviteId)
    // axios.get("/back/supplement/rest/invite/"+inviteId)
    .then(function (response) {
      var invite = JSON.parse(response.data);
      // console.log(invite)  ;
      dispatch({ type: "GET_INV_FULLFILED", payload: invite });
      var promise = new Promise(function (resolve, reject) {
        resolve({ recip: invite.Recipient, id: invite.DSId });
      });
      return promise;
    }).then(function (res) {
      console.log(res);
      var recipient = res.recip;
      var id = res.id;
      if (recipient !== "") {
        //$.get("/supplement/rest/view/"+invite.DSId).done(resp=>{
        dispatch({ type: "GET_INV_SUP" });
        (0, _utils.retryAxiosNtimes)(4, 0, "/back/supplement/rest/view/" + id)
        // axios.get("/back/supplement/rest/view/"+id)
        .then(function (resp) {
          dispatch({ type: "GET_INV_SUP_FULLFILED", payload: JSON.parse(resp.data) });
        });
      } else {
        dispatch({ type: "SEND_VAL_CODE" });
        (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/invite/" + inviteId + "/sendMail")
        // axios.post("/back/supplement/rest/invite/"+inviteId+"/sendMail")
        .then(function (resp) {
          dispatch({ type: "SEND_VAL_CODE_FULLFILED" });
        });
      }
    }).catch(function (err) {
      dispatch({ type: "GET_INV_REJECTED", payload: err });
    });
  };
}

function openShareByMail(supId) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "OPEN_SHARE_BY_MAIL" });
    console.log(supId);
    $('#mailModal' + supId).modal('open');
  };
}

function shareByMail(_supId, _email) {
  return function (dispatch) {
    console.log("dispatching SHARE_SUP_STARTED");
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "SHARE_SUP_STARTED" });
    var data = { email: _email, supId: _supId };
    (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/inviteByMail", data)
    // axios.post("/back/supplement/rest/inviteByMail",data)
    .then(function (response) {
      dispatch({ type: "SHARE_SUP_FULLFILED" });
      console.log('#modal' + _supId);
      $('#mailModal' + _supId).modal('close');
    }).catch(function (err) {
      dispatch({ type: "SHARE_SUP_REJECTED", payload: err.toString() });
    });
  };
}

function openShareByQR(supId) {
  return function (dispatch) {
    dispatch({ type: "OPEN_SHARE_BY_QR" });
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    console.log(supId);
    $('#qrModal' + supId).modal('open');
  };
}

function shareByQR(_supId, _email) {
  return function (dispatch) {
    dispatch({ type: "SHARE_SUP_QR" });
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/inviteByQR", { "supId": _supId, "email": _email })
    // axios.post("/back/supplement/rest/inviteByQR",{"supId":_supId, "email":_email})
    .then(function (response) {
      // console.log(response);
      dispatch({ type: "SHARE_SUP_QR_FULLFILED",
        //payload:'<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>'
        payload: response.data
      });
    }).catch(function (err) {
      dispatch({ type: "SHARE_SUP_QR_REJECTED", payload: err.toString() });
    });
  };
}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("stripchar");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("uuid/v1");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


var helper = __webpack_require__(9);
var fs = __webpack_require__(4);
var path = __webpack_require__(3);
var util = __webpack_require__(7);

/**
  registers an event hub for the given organisation
  for the given chaincode
  listening for the specified events
  @param org the name of the organisation e.g. org1
  @param chaincodeName the name of the chaincode, e.g. dipSup_cc4
  @param eventName teh name of the event as that is defined in the chaincode
  @param successCallback the function to call upon receiving an event. It is applied to
         the unencoded (originally it is unit8 bytearray) event payload
**/
exports.registerEventHubForOrg = function (org, chaincodeName, eventName, successCallback) {

  var client = helper.getClientForOrg(org);
  helper.getOrgAdmin(org).then(function (admin) {
    //this is required to add a user to the client object
    var caCert = fs.readFileSync(path.join(__dirname, "../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"));
    // console.log(data);
    var eh = client.newEventHub();
    eh.setPeerAddr("grpcs://localhost:7053", {
      pem: Buffer.from(caCert).toString(),
      'ssl-target-name-override': "peer0.org1.example.com"
    });

    var eventObj = eh.registerChaincodeEvent(chaincodeName, eventName, function (event) {
      var unEncodedEvnet = String.fromCharCode.apply(null, event.payload);
      successCallback(unEncodedEvnet, eh, eventObj);
    }, function (err) {
      console.log(err);
    });
    eh.connect();
  });
};

/**
  function that can be used as a callback (eventHandler) at the
  invokeChaincode = function(peersUrls, channelName, chaincodeName, fcn, args, username, org, eventHandler)
  of the invoke-transaction.js module
  to detect custom events as they are submitted by the DS app
*/
exports.txDetectionEvent = function (reject, resolve, payload, ehub, listenerHandle, txHash) {
  console.log(util.format("Custom event received, payload: %j\n", payload));
  var eventJSON = JSON.parse(payload);
  var eventMessage = eventJSON.Message;
  var eventBODY = eventJSON.Body;
  var eventTXID = eventJSON.TxId;

  if (eventMessage.indexOf("Error") >= 0) {
    if (eventTXID === txHash) {
      //resolve promise only when the current transaction has finished
      ehub.unregisterChaincodeEvent(listenerHandle);
      ehub.disconnect();
      reject(eventMessage);
    }
  }
  if (eventMessage.indexOf("Tx chaincode finished OK") >= 0) {
    if (eventTXID === txHash) {
      //resolve promise only when the current transaction has finished
      ehub.unregisterChaincodeEvent(listenerHandle);
      ehub.disconnect();
      resolve(eventMessage);
    }
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(38);

var _containerServer = __webpack_require__(39);

var _containerServer2 = _interopRequireDefault(_containerServer);

var _template = __webpack_require__(71);

var _template2 = _interopRequireDefault(_template);

var _reactCookie = __webpack_require__(28);

var _reactRedux = __webpack_require__(2);

var _store = __webpack_require__(72);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let renderReact = require('./reactApp/src/renderReact.js');


var express = __webpack_require__(18);
var app = express();
var port = 8000;
var path = __webpack_require__(3);
var bodyParser = __webpack_require__(83);
var session = __webpack_require__(84); //warning The default server-side session storage, MemoryStore, is purposely not designed for a production environment.
//compatible session stores https://github.com/expressjs/session#compatible-session-stores
var FileStore = __webpack_require__(85)(session);
// const basic = require('./model/hlf/basic');
var timeout = __webpack_require__(86);
var cookieParser = __webpack_require__(87);
var morgan = __webpack_require__(88);
var https = __webpack_require__(89);
var fs = __webpack_require__(4);

var util = __webpack_require__(5);

/**** routes **/
var loginRoutes = __webpack_require__(91);
var loginViewRoutes = __webpack_require__(92);
// let supplementRoutes = require('./routes/rest/supplementRoutes');
var supViewRoutes = __webpack_require__(93);
// let qr = require('./routes/rest/qrCodeRoutes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use('/', express.static('public'));
app.use('/', express.static('dist/build'));
app.use('/dist/build/', express.static('dist/build'));

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
app.use('/', [loginViewRoutes, loginRoutes]);
app.use('/login', loginViewRoutes);
// app.use('/supplement/rest',supplementRoutes);
app.use('/supplement/', supViewRoutes);
// app.use('/qr',qr);

app.use(haltOnTimedout); //the following timeout middleware has to be the last middleware


var key = fs.readFileSync('tsl/private.key');
var cert = fs.readFileSync('tsl/server.crt');
var options = {
  key: key,
  cert: cert

  //start https server
  // https.createServer(options, app).listen(8443);


};app.get('/app*', function (req, res) {
  var url = req.url;
  console.log(url);
  if (url && url.indexOf("invite") > -1) {
    var parts = url.split("/");
    var invId = parts[parts.length - 1];
    res.cookie('inviteHash', invId, { maxAge: 120000, httpOnly: true });
    console.log("invite found");
  }

  util.userDetailsFromToken(req, res).then(function (usr) {
    var staticContext = {};
    var css = new Set(); // CSS for all rendered React components
    // const staticContext = { insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())) };
    // const theUser= usr;
    // console.log("staticConetxt" ,staticContext);
    // Grab the initial state from our Redux store
    //
    // console.log("USER:");
    // console.log(usr);

    var preloadedState = _extends({}, _store2.default.getState(), {
      user: { user: _extends({}, usr, { lastName: usr.familyName }) } });

    var props = { location: req.url, context: {}, user: _extends({}, usr, { lastName: usr.familyName }) };

    var appString = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: _store2.default },
      _react2.default.createElement(
        _reactCookie.CookiesProvider,
        null,
        _react2.default.createElement(_containerServer2.default, props)
      )
    ));
    res.send((0, _template2.default)({
      body: appString,
      title: 'Hello World from the server',
      preloadedState: preloadedState,
      css: css
    }));
  }).catch(function (err) {
    console.log(err);
    if (err === "no user found in jwt") {
      res.redirect("/loginFail");
    }
    res.redirect("/login/landing");
  });
});

//start the server
var server = app.listen(port, "127.0.0.1", function (err, res) {

  if (err) {
    console.log("error!!", err);
  } else {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
    console.log("server started");
    //initialize the blocokchain configuration
    console.log("SRV address" + process.env.SRV_ADDR);

    // basic.init();
  }
});

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(err);
});

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; //This will be inside src/components

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(6);

var _StaticRouter = __webpack_require__(40);

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

var _sideBarActions = __webpack_require__(41);

var _userActions = __webpack_require__(15);

var _reactCookie = __webpack_require__(28);

var _reactMaterialize = __webpack_require__(1);

var _tweetList = __webpack_require__(42);

var _tweetList2 = _interopRequireDefault(_tweetList);

var _navBar = __webpack_require__(29);

var _navBar2 = _interopRequireDefault(_navBar);

var _sideNav = __webpack_require__(16);

var _sideNav2 = _interopRequireDefault(_sideNav);

var _dummy = __webpack_require__(52);

var _dummy2 = _interopRequireDefault(_dummy);

var _home = __webpack_require__(53);

var _home2 = _interopRequireDefault(_home);

var _supplements = __webpack_require__(57);

var _supplements2 = _interopRequireDefault(_supplements);

var _editSupplement = __webpack_require__(62);

var _editSupplement2 = _interopRequireDefault(_editSupplement);

var _requestSupplementCard = __webpack_require__(65);

var _requestSupplementCard2 = _interopRequireDefault(_requestSupplementCard);

var _serverLoading = __webpack_require__(67);

var _serverLoading2 = _interopRequireDefault(_serverLoading);

var _accountInfo = __webpack_require__(68);

var _accountInfo2 = _interopRequireDefault(_accountInfo);

var _viewByInvite = __webpack_require__(69);

var _viewByInvite2 = _interopRequireDefault(_viewByInvite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = (_dec = (0, _reactRedux.connect)(function (store) {
  // return { user: store.user.user,
  //       };
}), _dec(_class = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));
  }

  _createClass(Container, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // const { cookies } = this.props;
      // const  userAccount = {
      //   firstName: "Nikos ",
      //   lastName: "Trintafylloy",
      //   email: "test@test.gr",
      //   userName: "handlename",
      //   eid: "123"
      //   };

      // let  name = cookies.get('name') || 'Ben';
      // console.log("User:");
      // console.log(this.props.usr);
      // this.props.dispatch(setUser(this.props.usr));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          user = _props.user,
          tweets = _props.tweets,
          sideNav = _props.sideNav;
      // console.log("server user");
      // // console.log(user);
      // console.log(this.props);

      // let root = () => <div><NavigationBar user={user}/><Dummy user={user}/></div>;

      // let home = () => {console.log("home"); return <ServerLoading user={user}/>;} ;
      // let manage = () => <ServerLoading user={user}/>;
      // let request = () => <ServerLoading user={user}/>;
      // let edit = ({match}) => (<ServerLoading user={user}/>);
      // let inviteView = ({match}) => { console.log("inivte"); return <ServerLoading user={user}/>};

      var home = function home() {
        // let cookie = this.props.cookies;
        var cookies = new _reactCookie.Cookies();
        var id = cookies.get("inviteHash");
        if (id) {
          return _react2.default.createElement(_reactRouterDom.Redirect, { from: '/app', to: "/app/invite/" + id, push: true });
        } else {
          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_navBar2.default, { user: user }),
            _react2.default.createElement(_home2.default, { user: user })
          );
        }
      };
      var manage = function manage() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_navBar2.default, { user: user }),
          _react2.default.createElement(_supplements2.default, { user: user })
        );
      };
      var request = function request() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_navBar2.default, { user: user }),
          _react2.default.createElement(_requestSupplementCard2.default, { name: "user", eID: "eID" })
        );
      };
      var edit = function edit(_ref) {
        var match = _ref.match;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_navBar2.default, { user: user }),
          _react2.default.createElement(_editSupplement2.default, { match: match })
        );
      };
      var inviteView = function inviteView(_ref2) {
        var match = _ref2.match;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_navBar2.default, { user: user }),
          _react2.default.createElement(_viewByInvite2.default, { inviteId: match.params.id })
        );
      };
      var account = function account() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_navBar2.default, { user: user }),
          _react2.default.createElement(_accountInfo2.default, null)
        );
      };

      return _react2.default.createElement(
        _StaticRouter2.default,
        { location: this.props.location, context: this.props.context },
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { path: '/app/', exact: true, component: home }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/app/home', exact: true, component: home }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/app/manage', exact: true, component: manage }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/app/request', exact: true, component: request }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/app/edit/:id', component: edit }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/app/invite/:id', component: inviteView })
        )
      );

      // return null;
    }
  }]);

  return Container;
}(_react2.default.Component)) || _class);
exports.default = Container;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom/StaticRouter");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideBarOnOff = sideBarOnOff;
// constructor () {
//     super()
//     this.showModal = this.showModal.bind(this);
//     this.id = 'yo'
//   }
//
//   showModal () {
//     $(`#${this.id}`).modal('open');
//   }


function sideBarOnOff(status, nav) {
  console.log(nav.id);
  if (!status) {
    $("#" + nav.id).sideNav('show');
    return {
      type: "SIDE_BAR_OPEN",
      payload: {}
    };
  } else {
    $(nav).sideNav('hide');
    return {
      type: "SIDE_BAR_CLOSE",
      payload: {}
    };
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TweetList = function (_React$Component) {
    _inherits(TweetList, _React$Component);

    function TweetList() {
        _classCallCheck(this, TweetList);

        return _possibleConstructorReturn(this, (TweetList.__proto__ || Object.getPrototypeOf(TweetList)).apply(this, arguments));
    }

    _createClass(TweetList, [{
        key: 'render',
        value: function render() {
            var tweets = this.props.tweets;
            var tweetsList = tweets.map(function (tweet) {
                return _react2.default.createElement(
                    'li',
                    null,
                    tweet.id,
                    ' : ',
                    tweet.text
                );
            });
            return _react2.default.createElement(
                'ul',
                null,
                tweetsList
            );
        }
    }]);

    return TweetList;
}(_react2.default.Component);

exports.default = TweetList;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e60095e669fadeeb6c225bb4a575b383.jpg";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "21f505892075a5f20c11b47a368c7630.png";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _userActions = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = (_dec = (0, _reactRedux.connect)(function (store) {
  return { minutes: store.clock.timeOutMinutes,
    seconds: store.clock.timeOutSeconds
  };
}), _dec(_class = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    // this.validateInvite = this.validateInvite.bind(this);
    // this.props.time="13:00"
    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.reduceTimeFunc = _this.reduceTimeFunc.bind(_this);
    _this.restartClock = _this.restartClock.bind(_this);
    return _this;
  }

  _createClass(Clock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.dispatch((0, _userActions.restartClock)());
      setInterval(function () {
        this.reduceTimeFunc();
      }.bind(this), 1000);
    }
  }, {
    key: 'reduceTimeFunc',
    value: function reduceTimeFunc() {
      // console.log("redcueTime");
      // console.log(this.props.minutes);
      // console.log(this.props.seconds);
      this.props.dispatch((0, _userActions.reduceTime)(this.props.minutes, this.props.seconds));
    }
  }, {
    key: 'restartClock',
    value: function restartClock() {
      this.props.dispatch((0, _userActions.restartClock)());
    }
  }, {
    key: 'render',
    value: function render() {
      var seconds = this.props.seconds;
      var minutes = this.props.minutes;
      if (this.props.seconds < 10) {
        seconds = "0" + this.props.seconds;
      }
      if (this.props.minutes < 10) {
        minutes = "0" + this.props.minutes;
      }

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          { className: 'hide-on-large-only', style: { marginLeft: "1rem", fontSize: "0.8rem" } },
          _react2.default.createElement(
            'span',
            null,
            ' ',
            _react2.default.createElement(
              'i',
              { style: { marginLeft: "1rem" }, className: 'material-icons', onClick: this.restartClock },
              'refresh'
            )
          ),
          _react2.default.createElement(
            'span',
            { style: { marginRight: "1rem", fontSize: "1.5rem" } },
            _react2.default.createElement(
              'i',
              null,
              minutes + ":" + seconds
            )
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'hide-on-med-and-down', style: { fontSize: "1rem" } },
          _react2.default.createElement(
            'span',
            null,
            ' ',
            _react2.default.createElement(
              'i',
              { style: { marginLeft: "52rem" }, className: 'material-icons', onClick: this.restartClock },
              'refresh'
            )
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'i',
              { style: { fontSize: "1rem" } },
              "Session expires in: " + minutes + ":" + seconds
            )
          )
        )
      );
    }
  }]);

  return Clock;
}(_react2.default.Component)) || _class);
exports.default = Clock;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(false);
// imports


// module
exports.push([module.i, ".navbar-fixed {\n    position: relative;\n    height: 56px;\n    z-index: 998;\n}\n\n.modulesCard.collapsible-body{\n  padding: 0.5rem!important;\n}\n\nnav{\n  background-color: #06114e;\n}\n/*\n this is not rendered look for the navbar.css inside the dist folder\n */\n", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(50);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(51);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dummy = function (_React$Component) {
  _inherits(Dummy, _React$Component);

  function Dummy() {
    _classCallCheck(this, Dummy);

    return _possibleConstructorReturn(this, (Dummy.__proto__ || Object.getPrototypeOf(Dummy)).apply(this, arguments));
  }

  _createClass(Dummy, [{
    key: 'render',
    value: function render() {
      var user = this.props.user;
      return _react2.default.createElement(
        'h1',
        null,
        'Hello World from ',
        user.name,
        '!'
      );
    }
  }]);

  return Dummy;
}(_react2.default.Component);

exports.default = Dummy;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMaterialize = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _sideNav = __webpack_require__(16);

var _sideNav2 = _interopRequireDefault(_sideNav);

__webpack_require__(30);

var _manageDocuments = __webpack_require__(54);

var _manageDocuments2 = _interopRequireDefault(_manageDocuments);

var _publishDocument = __webpack_require__(55);

var _publishDocument2 = _interopRequireDefault(_publishDocument);

var _manageUser = __webpack_require__(56);

var _manageUser2 = _interopRequireDefault(_manageUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_React$Component) {
  _inherits(HomePage, _React$Component);

  function HomePage() {
    _classCallCheck(this, HomePage);

    return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).apply(this, arguments));
  }

  _createClass(HomePage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'render',
    value: function render() {

      var imgStyle = { margin: "0 auto", display: "block" };
      var imgTitleStyle = { width: "100%",
        background: " rgba(54, 25, 25, .3)" };

      var manageCard = _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(
          'div',
          { className: 'card-image' },
          _react2.default.createElement('img', { src: _manageDocuments2.default, style: imgStyle }),
          _react2.default.createElement(
            'span',
            { className: 'card-title', style: imgTitleStyle },
            'Manage Supplements'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-content' },
          _react2.default.createElement(
            'p',
            null,
            'View published Supplements on the Blockchain | Manage User Access '
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-action' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/app/manage', style: { color: "#06114e" } },
            'VIEW SUPPLEMENTS'
          )
        )
      );

      var requestCard = _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(
          'div',
          { className: 'card-image' },
          _react2.default.createElement('img', { src: _publishDocument2.default, style: { margin: "0 auto", display: "block", width: "59%" } }),
          _react2.default.createElement(
            'span',
            { className: 'card-title', style: imgTitleStyle },
            'Request Supplement'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-content' },
          _react2.default.createElement(
            'p',
            null,
            'Request the publication of a Diploma Supplement on the Blockchain'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-action' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/app/request', style: { color: "#06114e" } },
            'SUBMIT A REQUEST'
          )
        )
      );

      var accountCard = _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(
          'div',
          { className: 'card-image' },
          _react2.default.createElement('img', { src: _manageUser2.default, style: { margin: "0 auto", display: "block", width: "65%" } }),
          _react2.default.createElement(
            'span',
            { className: 'card-title', style: imgTitleStyle },
            'Manage Account'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-content' },
          _react2.default.createElement(
            'p',
            null,
            'Review Your Profile Details'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-action' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/app/account', style: { color: "#06114e" } },
            'MY PROFILE'
          )
        )
      );

      return _react2.default.createElement(
        'div',
        { className: 'main container', style: { marginTop: "3%" } },
        _react2.default.createElement(
          _reactMaterialize.Row,
          { key: 1 },
          _react2.default.createElement(
            _reactMaterialize.Col,
            { s: 12, m: 6, className: 'grid-example' },
            requestCard
          ),
          _react2.default.createElement(
            _reactMaterialize.Col,
            { s: 12, m: 6, className: 'grid-example' },
            manageCard
          )
        ),
        _react2.default.createElement(
          _reactMaterialize.Row,
          null,
          _react2.default.createElement(
            _reactMaterialize.Col,
            { s: 12, m: 6, className: 'grid-example' },
            accountCard
          )
        )
      );
    }
  }]);

  return HomePage;
}(_react2.default.Component);

exports.default = HomePage;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e460414865f573e4fbec7cb297e5f358.png";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e5c3c53e1943d3dc0d2c2ffb3b385eee.png";

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "16d4a26c8de8ae7db43040ae1095ff86.png";

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _propTypes = __webpack_require__(58);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _supplementActions = __webpack_require__(23);

var _supplementCard = __webpack_require__(24);

var _supplementCard2 = _interopRequireDefault(_supplementCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Supplements = (_dec = (0, _reactRedux.connect)(function (store) {
  return { sups: store.sups.supplements,
    supError: store.sups.supError,
    fetching: store.sups.fetching,
    isUpdated: store.sups.isUpdated
  };
}), _dec(_class = function (_React$Component) {
  _inherits(Supplements, _React$Component);

  function Supplements(props) {
    _classCallCheck(this, Supplements);

    var _this = _possibleConstructorReturn(this, (Supplements.__proto__ || Object.getPrototypeOf(Supplements)).call(this, props));

    _this.openShareByMail = _this.openShareByMail.bind(_this);
    _this.openShareByQR = _this.openShareByQR.bind(_this);
    _this.cleanUp = _this.cleanUp.bind(_this);
    return _this;
  }

  _createClass(Supplements, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.button-collapse').sideNav('hide');
      // this.fetchSupplements();
      if (!this.props.isUpdated && !this.props.fetching) {
        this.fetchSupplements();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      $('.button-collapse').sideNav('hide');
      // if(!this.props.isUpdated && !this.props.fetching){
      //   this.fetchSupplements();
      // }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cleanUp();
    }
  }, {
    key: 'cleanUp',
    value: function cleanUp() {
      this.props.dispatch((0, _supplementActions.removeSupplements)());
    }
  }, {
    key: 'fetchSupplements',
    value: function fetchSupplements() {
      console.log("will fetch with eid" + this.props.user.eid);
      this.props.dispatch((0, _supplementActions.getSupplementsByEid)(this.props.user.eid));
    }
  }, {
    key: 'openShareByMail',
    value: function openShareByMail(supId) {
      this.props.dispatch((0, _supplementActions.openShareByMail)(supId));
    }
  }, {
    key: 'openShareByQR',
    value: function openShareByQR(supId) {
      this.props.dispatch((0, _supplementActions.openShareByQR)(supId));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          sups = _props.sups,
          supError = _props.supError,
          fetching = _props.fetching;

      if (fetching) {
        return _react2.default.createElement(
          'div',
          { className: 'main container', style: { marginTop: "3%" } },
          _react2.default.createElement(
            _reactMaterialize.Row,
            null,
            _react2.default.createElement(
              _reactMaterialize.Col,
              { s: 12 },
              'Fetching Diploma Supplements, Please wait...'
            )
          ),
          _react2.default.createElement(
            _reactMaterialize.Row,
            null,
            _react2.default.createElement(
              _reactMaterialize.Col,
              { s: 12 },
              _react2.default.createElement(_reactMaterialize.ProgressBar, null)
            )
          )
        );
      } else {

        var supCards = sups.map(function (sup) {
          return _react2.default.createElement(_supplementCard2.default, { key: sup.Id, sup: sup,
            openShareByMail: _this2.openShareByMail,
            openShareByQR: _this2.openShareByQR
          });
        });
        if (sups.length > 0) {
          return _react2.default.createElement(
            'div',
            { className: 'main container', style: { marginTop: "3%" } },
            supCards
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: 'main container', style: { marginTop: "3%" } },
            'No matching accademic records found'
          );
        }
      }
    }
  }]);

  return Supplements;
}(_react2.default.Component)) || _class);
exports.default = Supplements;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _supplementFab = __webpack_require__(10);

var _supplementFab2 = _interopRequireDefault(_supplementFab);

var _supplementBtns = __webpack_require__(11);

var _supplementBtns2 = _interopRequireDefault(_supplementBtns);

var _editSupplementActions = __webpack_require__(14);

var _supplementActions = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareByMailModal = (_dec = (0, _reactRedux.connect)(function (store) {
  return { sharing: store.sups.sharing,
    shareError: store.sups.shareError
  };
}), _dec(_class = function (_React$Component) {
  _inherits(ShareByMailModal, _React$Component);

  function ShareByMailModal(props) {
    _classCallCheck(this, ShareByMailModal);

    var _this = _possibleConstructorReturn(this, (ShareByMailModal.__proto__ || Object.getPrototypeOf(ShareByMailModal)).call(this, props));

    _this.getContents = _this.getContents.bind(_this);
    return _this;
  }

  _createClass(ShareByMailModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });
    }
  }, {
    key: 'share',
    value: function share(mail) {
      console.log("shareSupMailModala:: share fnct called");
      this.props.dispatch((0, _supplementActions.shareByMail)(this.props.sup.Id, mail));
    }
  }, {
    key: 'getContents',
    value: function getContents() {
      var _this2 = this;

      if (this.props.sharing === true) {
        return _react2.default.createElement(_reactMaterialize.ProgressBar, null);
      }
      if (this.props.shareError != null) {
        return _react2.default.createElement(
          'div',
          null,
          'Something went wrong: ',
          _react2.default.createElement(
            'span',
            null,
            this.props.shareError
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactMaterialize.Row,
          null,
          _react2.default.createElement(
            'div',
            { className: 'col s12' },
            'Add recipient email addresses separated by ";" or ","'
          ),
          _react2.default.createElement(
            _reactMaterialize.Input,
            { id: "email", type: 'email', label: 'Email', s: 12 },
            _react2.default.createElement(
              _reactMaterialize.Icon,
              null,
              'account_circle'
            )
          )
        ),
        _react2.default.createElement(
          _reactMaterialize.Button,
          { onClick: function onClick(e) {
              var mail = document.getElementById("email").value;
              _this2.share(mail);
            } },
          'Share'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var contents = this.getContents();
      return _react2.default.createElement(
        'div',
        { id: "mailModal" + this.props.sup.Id, className: 'modal' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'h4',
            null,
            'Share Supplement By Email'
          ),
          contents
        )
      );
    }
  }]);

  return ShareByMailModal;
}(_react2.default.Component)) || _class);
exports.default = ShareByMailModal;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _svgInlineReact = __webpack_require__(61);

var _svgInlineReact2 = _interopRequireDefault(_svgInlineReact);

var _reactMaterialize = __webpack_require__(1);

var _supplementFab = __webpack_require__(10);

var _supplementFab2 = _interopRequireDefault(_supplementFab);

var _supplementBtns = __webpack_require__(11);

var _supplementBtns2 = _interopRequireDefault(_supplementBtns);

var _editSupplementActions = __webpack_require__(14);

var _supplementActions = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareByQRModal = (_dec = (0, _reactRedux.connect)(function (store) {
  return { sharingQR: store.sups.sharingQR,
    shareErrorQR: store.sups.shareErrorQR,
    QR: store.sups.QR
  };
}), _dec(_class = function (_React$Component) {
  _inherits(ShareByQRModal, _React$Component);

  function ShareByQRModal(props) {
    _classCallCheck(this, ShareByQRModal);

    var _this = _possibleConstructorReturn(this, (ShareByQRModal.__proto__ || Object.getPrototypeOf(ShareByQRModal)).call(this, props));

    _this.getContents = _this.getContents.bind(_this);
    return _this;
  }

  _createClass(ShareByQRModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        $('.modal').modal();
      });
    }
  }, {
    key: 'share',
    value: function share(mail) {
      this.props.dispatch((0, _supplementActions.shareByQR)(this.props.sup.Id, mail));
    }
  }, {
    key: 'getContents',
    value: function getContents() {
      var _this2 = this;

      if (this.props.sharingQR === true) {
        return _react2.default.createElement(_reactMaterialize.ProgressBar, null);
      }
      if (this.props.shareErrorQR != null) {
        return _react2.default.createElement(
          'div',
          null,
          'Something went wrong: ',
          _react2.default.createElement(
            'span',
            null,
            this.props.shareError
          )
        );
      }

      if (this.props.QR != null) {
        return _react2.default.createElement(
          _reactMaterialize.Row,
          null,
          _react2.default.createElement(
            _reactMaterialize.Col,
            { s: 6 },
            _react2.default.createElement(_svgInlineReact2.default, { style: { height: "7em" }, src: this.props.QR })
          ),
          _react2.default.createElement(
            _reactMaterialize.Col,
            { s: 6 },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Save this image and add it to your CV to'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                null,
                'share this supplement'
              )
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactMaterialize.Row,
          null,
          _react2.default.createElement(
            'div',
            { className: 'col s12' },
            'Add a ',
            _react2.default.createElement(
              'b',
              null,
              'single'
            ),
            ' recipient email address'
          ),
          _react2.default.createElement(
            _reactMaterialize.Input,
            { id: "qremail", type: 'email', label: 'Email', s: 12 },
            _react2.default.createElement(
              _reactMaterialize.Icon,
              null,
              'account_circle'
            )
          )
        ),
        _react2.default.createElement(
          _reactMaterialize.Button,
          { onClick: function onClick(e) {
              var mail = document.getElementById("qremail").value;
              _this2.share(mail);
            } },
          'Share'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var contents = this.getContents();
      return _react2.default.createElement(
        'div',
        { id: "qrModal" + this.props.sup.Id, className: 'modal' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'h4',
            null,
            'Share Supplement By QR code'
          ),
          contents
        )
      );
    }
  }]);

  return ShareByQRModal;
}(_react2.default.Component)) || _class);
exports.default = ShareByQRModal;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("svg-inline-react");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMaterialize = __webpack_require__(1);

var _reactRedux = __webpack_require__(2);

var _editSupplementCard = __webpack_require__(63);

var _editSupplementCard2 = _interopRequireDefault(_editSupplementCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditSup = (_dec = (0, _reactRedux.connect)(function (store) {
  return { sups: store.sups.supplements,
    supError: store.sups.supError,
    fetching: store.sups.fetching
  };
}), _dec(_class = function (_React$Component) {
  _inherits(EditSup, _React$Component);

  function EditSup() {
    _classCallCheck(this, EditSup);

    return _possibleConstructorReturn(this, (EditSup.__proto__ || Object.getPrototypeOf(EditSup)).apply(this, arguments));
  }

  _createClass(EditSup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log(this.props.match.params.id);
      var id = this.props.match.params.id;
      var sups = this.props.sups.filter(function (sup) {
        return sup.Id === id;
      });
      console.log(sups);
      if (sups.length > 0) {
        return _react2.default.createElement(
          'div',
          { className: 'main container', style: { marginTop: "3%" } },
          _react2.default.createElement(_editSupplementCard2.default, { key: sups[0].Id, sup: sups[0] })
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'main container', style: { marginTop: "3%" } },
          'No Supplement found for the give id: ',
          id
        );
      }
    }
  }]);

  return EditSup;
}(_react2.default.Component)) || _class);
exports.default = EditSup;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _supplementFab = __webpack_require__(10);

var _supplementFab2 = _interopRequireDefault(_supplementFab);

var _supplementBtns = __webpack_require__(11);

var _supplementBtns2 = _interopRequireDefault(_supplementBtns);

var _supplementModal = __webpack_require__(64);

var _supplementModal2 = _interopRequireDefault(_supplementModal);

var _editSupplementActions = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditSupplementCard = (_dec = (0, _reactRedux.connect)(function (store) {
  return { usersToRem: store.edit.usersToRem,
    removingUser: store.edit.removingUser,
    removedUser: store.edit.removedUser,
    remError: store.edit.remError
  };
}), _dec(_class = function (_React$Component) {
  _inherits(EditSupplementCard, _React$Component);

  function EditSupplementCard(props) {
    _classCallCheck(this, EditSupplementCard);

    var _this = _possibleConstructorReturn(this, (EditSupplementCard.__proto__ || Object.getPrototypeOf(EditSupplementCard)).call(this, props));

    _this.addRemUser = _this.addRemUser.bind(_this);
    _this.remUsers = _this.remUsers.bind(_this);
    return _this;
  }

  _createClass(EditSupplementCard, [{
    key: 'addRemUser',
    value: function addRemUser(user) {
      this.props.dispatch((0, _editSupplementActions.addUserToRem)(user));
    }
  }, {
    key: 'remUsers',
    value: function remUsers(supId) {
      this.props.dispatch((0, _editSupplementActions.remUsers)(supId, this.props.usersToRem));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var sup = this.props.sup;

      var authorized = sup.Authorized.map(function (user) {
        return user.Email;
      }).map(function (user) {
        return _react2.default.createElement(
          'div',
          { key: user, onClick: function onClick(e) {
              return _this2.addRemUser(user);
            } },
          ' ',
          _react2.default.createElement(
            _reactMaterialize.Tag,
            null,
            user
          ),
          ' '
        );
      });

      var usersInfo = this.props.usersToRem.map(function (user) {
        return _react2.default.createElement(
          'span',
          { key: user },
          ' ',
          user,
          ' '
        );
      });

      var res = null;
      if (this.props.usersToRem.length > 0) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 m6' },
              _react2.default.createElement(
                'div',
                { className: 'card ' },
                _react2.default.createElement(
                  'div',
                  { className: 'card-content' },
                  _react2.default.createElement(
                    'span',
                    { className: 'card-title' },
                    'Supplement : ',
                    sup.Id
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Authorized Users:'
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    authorized
                  )
                )
              )
            )
          ),
          _react2.default.createElement(_supplementModal2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 m6' },
              _react2.default.createElement(
                'div',
                { className: 'card blue-grey darken-1' },
                _react2.default.createElement(
                  'div',
                  { className: 'card-content white-text' },
                  _react2.default.createElement(
                    'span',
                    { className: 'card-title' },
                    'Will Remove Access from:'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    usersInfo
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'card-action' },
                  _react2.default.createElement(
                    'div',
                    { className: 'card-action' },
                    _react2.default.createElement(
                      'a',
                      { className: 'waves-effect waves-light btn modal-trigger',
                        onClick: function onClick(e) {
                          _this2.remUsers(sup.Id);
                        } },
                      'Remove Users'
                    )
                  )
                )
              )
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col s12 m6' },
            _react2.default.createElement(
              'div',
              { className: 'card ' },
              _react2.default.createElement(
                'div',
                { className: 'card-content' },
                _react2.default.createElement(
                  'span',
                  { className: 'card-title' },
                  'Supplement : ',
                  sup.Id
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Authorized Users:'
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  authorized
                )
              )
            )
          )
        ),
        _react2.default.createElement(_supplementModal2.default, null)
      );
    }
  }]);

  return EditSupplementCard;
}(_react2.default.Component)) || _class);
exports.default = EditSupplementCard;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _supplementFab = __webpack_require__(10);

var _supplementFab2 = _interopRequireDefault(_supplementFab);

var _supplementBtns = __webpack_require__(11);

var _supplementBtns2 = _interopRequireDefault(_supplementBtns);

var _editSupplementActions = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditSupplementModal = (_dec = (0, _reactRedux.connect)(function (store) {
  return { usersToRem: store.edit.usersToRem,
    removingUser: store.edit.removingUser,
    removedUser: store.edit.removedUser,
    remError: store.edit.remError
  };
}), _dec(_class = function (_React$Component) {
  _inherits(EditSupplementModal, _React$Component);

  function EditSupplementModal(props) {
    _classCallCheck(this, EditSupplementModal);

    return _possibleConstructorReturn(this, (EditSupplementModal.__proto__ || Object.getPrototypeOf(EditSupplementModal)).call(this, props));
  }

  _createClass(EditSupplementModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { id: 'modal1', className: 'modal' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'h4',
            null,
            'Saving Changes to supplement'
          ),
          _react2.default.createElement(_reactMaterialize.ProgressBar, null)
        )
      );
    }
  }]);

  return EditSupplementModal;
}(_react2.default.Component)) || _class);
exports.default = EditSupplementModal;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _requestSupplementModal = __webpack_require__(25);

var _requestSupplementModal2 = _interopRequireDefault(_requestSupplementModal);

var _requestSupplementActions = __webpack_require__(66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestSupplementCard = (_dec = (0, _reactRedux.connect)(function (store) {
  return { university: store.publish.university,
    univId: store.publish.univId,
    email: store.publish.email,
    modal: store.publish.modal,
    fullfiled: store.publish.requestFullfiled,
    eId: store.user.user.eid,
    userName: store.user.user.firstName + " " + store.user.user.lastName,
    dateOfBirth: store.user.user.dateOfBirth
  };
}), _dec(_class = function (_React$Component) {
  _inherits(RequestSupplementCard, _React$Component);

  function RequestSupplementCard(props) {
    _classCallCheck(this, RequestSupplementCard);

    var _this = _possibleConstructorReturn(this, (RequestSupplementCard.__proto__ || Object.getPrototypeOf(RequestSupplementCard)).call(this, props));

    _this.sendPubrequest = _this.sendPubrequest.bind(_this);
    _this.updateMail = _this.updateMail.bind(_this);
    _this.updateUnivValue = _this.updateUnivValue.bind(_this);
    _this.updateUniversityId = _this.updateUniversityId.bind(_this);
    return _this;
  }

  _createClass(RequestSupplementCard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'sendPubrequest',
    value: function sendPubrequest() {
      var university = this.props.university;
      // let userName = this.props.userName;
      // let eId = this.props.eId;
      var universityId = this.props.univId;
      var email = this.props.email;
      // let dateOfBirth = this.props.dateOfBirth;
      console.log(university, universityId, email);
      // university,username,eID,universityId,email,date
      this.props.dispatch((0, _requestSupplementActions.requestPublication)(university, universityId, email));
    }
  }, {
    key: 'updateUniversityId',
    value: function updateUniversityId(univId) {
      this.props.dispatch((0, _requestSupplementActions.updateUnivId)(univId));
    }
  }, {
    key: 'updateUnivValue',
    value: function updateUnivValue(e) {
      this.props.dispatch((0, _requestSupplementActions.updateUniversity)(e.target.value));
    }
  }, {
    key: 'updateMail',
    value: function updateMail(mail) {
      this.props.dispatch((0, _requestSupplementActions.updateEmail)(mail));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        $('select').material_select();
      });
      $(this.refs.mySelectBox).on('change', this.updateUnivValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.fullfiled) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'container', style: { marginTop: "2em" } },
            _react2.default.createElement(
              _reactMaterialize.Row,
              null,
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12 l6' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons prefix' },
                  'account_circle'
                ),
                _react2.default.createElement('input', { id: 'universityId', type: 'text', className: 'validate', onChange: function onChange(e) {
                    return _this2.updateUniversityId(e.target.value);
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'universityId' },
                  'UniversityId'
                )
              )
            ),
            _react2.default.createElement(
              _reactMaterialize.Row,
              null,
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12 l6' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons prefix' },
                  'email'
                ),
                _react2.default.createElement('input', { id: 'email', type: 'email', className: 'validate', onChange: function onChange(e) {
                    return _this2.updateMail(e.target.value);
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'email' },
                  'Email'
                )
              )
            ),
            _react2.default.createElement(
              _reactMaterialize.Row,
              null,
              _react2.default.createElement(
                'div',
                { className: 'col s12 l6' },
                _react2.default.createElement(
                  'span',
                  { style: { float: "left", paddingLeft: "0" }, className: 'col s1' },
                  _react2.default.createElement(
                    _reactMaterialize.Icon,
                    null,
                    'account_balance'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s11', style: { marginLeft: "0", paddingLeft: "0" } },
                  _react2.default.createElement(
                    'select',
                    { ref: 'mySelectBox' },
                    _react2.default.createElement(
                      'option',
                      { key: 'UAegean', value: 'UAegean' },
                      'University of the Aegean'
                    ),
                    _react2.default.createElement(
                      'option',
                      { key: 'UAgr', value: 'UAgr' },
                      'Agricultural University of Athens'
                    ),
                    _react2.default.createElement(
                      'option',
                      { key: 'UniPi', value: 'UniPi' },
                      'University of Piraeus'
                    )
                  ),
                  _react2.default.createElement(
                    'label',
                    { style: { left: "0" } },
                    'University'
                  )
                )
              )
            ),
            _react2.default.createElement(
              _reactMaterialize.Row,
              null,
              _react2.default.createElement(
                _reactMaterialize.Button,
                { style: { marginLeft: "0.5em" }, onClick: this.sendPubrequest },
                'Request'
              )
            )
          ),
          _react2.default.createElement(_requestSupplementModal2.default, null)
        );
      }

      return _react2.default.createElement(_reactRouterDom.Redirect, { from: '/app/request', to: "/app", push: true });
    }
  }]);

  return RequestSupplementCard;
}(_react2.default.Component)) || _class);
exports.default = RequestSupplementCard;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestPublication = requestPublication;
exports.updateUnivId = updateUnivId;
exports.updateUniversity = updateUniversity;
exports.updateEmail = updateEmail;

var _axios = __webpack_require__(12);

var _axios2 = _interopRequireDefault(_axios);

var _axiosRetry = __webpack_require__(13);

var _axiosRetry2 = _interopRequireDefault(_axiosRetry);

var _utils = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _axiosRetry2.default)(_axios2.default, { retries: 3, retryDelay: function retryDelay(retryCount) {
    console.log("retrying!!!");
    return retryCount * 1000;
  } });
// ES6
function requestPublication(university, universityId, email) {
  /*
  let universityName = req.body.uniName;
  let universityId = req.body.univId; //user univesrity ID (e.g. ge01117)
  let userEmail = req.body.email;
   */

  return function (dispatch) {
    console.log("wil dispatch");
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "PUBLISH_MODAL_OPEN" });
    dispatch({ type: "REQUEST_PUBLISH_SENT" });
    $('#modal1').modal('open');
    (0, _utils.retryAxiosNtimesPost)(4, 0, "/back/supplement/rest/request", { uniName: university, email: email,
      univId: universityId })
    // axios.post("/back/supplement/rest/request",{uniName:university,email:email,
    //                                      univId:universityId})
    .then(function (response) {
      $('#modal1').modal('close');
      dispatch({ type: "REQUEST_PUBLISH_FULLFILED", payload: response.data });
      dispatch({ type: "PUBLISH_MODAL_CLOSE" });
    }).catch(function (err) {
      dispatch({ type: "REQUEST_PUBLISH_REJECTED", payload: err });
    });
  };
}

function updateUnivId(universityId) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "UPDATE_UNIVID", payload: universityId });
  };
}

function updateUniversity(university) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "UPDATE_UNINIVERSITY", payload: university });
  };
}

function updateEmail(mail) {
  return function (dispatch) {
    dispatch({ type: "RESTART_CLOCK", payload: "" });
    dispatch({ type: "UPDATE_EMAIL", payload: mail });
  };
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMaterialize = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _sideNav = __webpack_require__(16);

var _sideNav2 = _interopRequireDefault(_sideNav);

var _navBar = __webpack_require__(29);

var _navBar2 = _interopRequireDefault(_navBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerLoading = function (_React$Component) {
  _inherits(ServerLoading, _React$Component);

  function ServerLoading() {
    _classCallCheck(this, ServerLoading);

    return _possibleConstructorReturn(this, (ServerLoading.__proto__ || Object.getPrototypeOf(ServerLoading)).apply(this, arguments));
  }

  _createClass(ServerLoading, [{
    key: 'render',


    //// <NavigationBar user={user}/>
    value: function render() {
      var user = this.props.user;
      return _react2.default.createElement(
        'div',
        { className: 'container', style: { marginTop: "2em" } },
        _react2.default.createElement(
          'div',
          { className: 'row', style: { marginLeft: "50%" } },
          _react2.default.createElement(_reactMaterialize.Preloader, { size: 'big', flashing: true })
        )
      );
    }
  }]);

  return ServerLoading;
}(_react2.default.Component);

exports.default = ServerLoading;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _userActions = __webpack_require__(15);

var _supplementCard = __webpack_require__(24);

var _supplementCard2 = _interopRequireDefault(_supplementCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountInfo = (_dec = (0, _reactRedux.connect)(function (store) {
  return { user: store.user.user
  };
}), _dec(_class = function (_React$Component) {
  _inherits(AccountInfo, _React$Component);

  function AccountInfo(props) {
    _classCallCheck(this, AccountInfo);

    var _this = _possibleConstructorReturn(this, (AccountInfo.__proto__ || Object.getPrototypeOf(AccountInfo)).call(this, props));

    _this.logoutUser = _this.logoutUser.bind(_this);
    return _this;
  }

  _createClass(AccountInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      $('.button-collapse').sideNav('hide');
    }
  }, {
    key: 'logoutUser',
    value: function logoutUser() {
      this.props.dispatch(_userActions.logout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var user = this.props.user;
      return _react2.default.createElement(
        'div',
        { className: 'main container', style: { marginTop: "3%" } },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'h5',
            { className: 'col s12' },
            'Your Personal Information'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'form',
            { className: 'col s12' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12' },
                _react2.default.createElement('input', { id: 'userName', style: { marginTop: "3em", color: "black" }, value: user.userName, type: 'text', disabled: true }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'userName', 'data-success': 'right' },
                  'User Name'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12' },
                _react2.default.createElement('input', { id: 'currentFamilyName', style: { marginTop: "3em", color: "black" }, value: user.familyName, type: 'text', disabled: true }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'currentFamilyName', 'data-success': 'right' },
                  'Family Name'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12' },
                _react2.default.createElement('input', { id: 'currentFamilyName', style: { marginTop: "3em", color: "black" }, value: user.intFamilyName, type: 'text', disabled: true }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'currentFamilyName', 'data-success': 'right' },
                  'Family Name in English'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12' },
                _react2.default.createElement('input', { id: 'currentGivenName', style: { marginTop: "3em", color: "black" }, value: user.firstName, type: 'text', disabled: true }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'currentGivenName', 'data-success': 'right' },
                  'Given Name'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12' },
                _react2.default.createElement('input', { id: 'currentGivenName', style: { marginTop: "3em", color: "black" }, value: user.intFirstName, type: 'text', disabled: true }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'currentGivenName', 'data-success': 'right' },
                  'Given Name in English'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12' },
                _react2.default.createElement('input', { id: 'dateOfBirth', type: 'text', style: { marginTop: "3em", color: "black" }, value: user.dateOfBirth, disabled: true }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'dateOfBirth', 'data-success': 'right' },
                  'Date of Birth'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s12' },
                _react2.default.createElement('input', { id: 'personIdentifier', type: 'text', style: { marginTop: "3em", color: "black" }, value: user.personIdentifier, disabled: true }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'personIdentifier', 'data-success': 'right' },
                  'Person Identifier'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col s12' },
                _react2.default.createElement(
                  'a',
                  { className: 'btn waves-effect waves-teal', onClick: function onClick(e) {
                      return _this2.logoutUser();
                    } },
                  'Log out'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AccountInfo;
}(_react2.default.Component)) || _class);
exports.default = AccountInfo;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _requestSupplementModal = __webpack_require__(25);

var _requestSupplementModal2 = _interopRequireDefault(_requestSupplementModal);

var _supplementCard = __webpack_require__(24);

var _supplementCard2 = _interopRequireDefault(_supplementCard);

var _validateCard = __webpack_require__(70);

var _validateCard2 = _interopRequireDefault(_validateCard);

var _inviteActions = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InviteViewCard = (_dec = (0, _reactRedux.connect)(function (store) {
  return { eId: store.user.user.eid,
    fetching: store.invite.fetching,
    message: store.invite.message,
    supplements: store.invite.supplements,
    validate: store.invite.validate
  };
}), _dec(_class = function (_React$Component) {
  _inherits(InviteViewCard, _React$Component);

  function InviteViewCard(props) {
    _classCallCheck(this, InviteViewCard);

    var _this = _possibleConstructorReturn(this, (InviteViewCard.__proto__ || Object.getPrototypeOf(InviteViewCard)).call(this, props));

    _this.validateInvite = _this.validateInvite.bind(_this);
    return _this;
  }

  _createClass(InviteViewCard, [{
    key: 'validateInvite',
    value: function validateInvite() {
      //this.props.dispatch(requestPublication(university,userName,eId,universityId,email));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var id = this.props.inviteId;
      this.props.dispatch((0, _inviteActions.getInvAndGenValCode)(id));
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.fetching) {
        return _react2.default.createElement(
          'div',
          { className: 'container', style: { marginTop: "10%" } },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 m12 l12' },
              this.props.message
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12 m12 l12' },
              _react2.default.createElement(_reactMaterialize.ProgressBar, null)
            )
          )
        );
      } else {
        if (this.props.error) {
          return _react2.default.createElement(
            'div',
            { className: 'container', style: { marginTop: "10%" } },
            this.props.error
          );
        }
        if (this.props.supplements.length > 0) {
          var sups = this.props.supplements;
          var supCards = sups.map(function (sup) {
            return _react2.default.createElement(_supplementCard2.default, { key: sup.Id, sup: sup,
              restricted: true
            });
          });
          return _react2.default.createElement(
            'div',
            { className: 'main container', style: { marginTop: "3%" } },
            supCards
          );
        }
        if (this.props.validate) {
          return _react2.default.createElement(
            'div',
            { className: 'main container', style: { marginTop: "3%" } },
            _react2.default.createElement(_validateCard2.default, { inviteId: this.props.inviteId })
          );
        }

        return _react2.default.createElement(
          'div',
          { className: 'container', style: { marginTop: "10%" } },
          'Not fetching'
        );
      }
    }
  }]);

  return InviteViewCard;
}(_react2.default.Component)) || _class);
exports.default = InviteViewCard;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactMaterialize = __webpack_require__(1);

var _requestSupplementModal = __webpack_require__(25);

var _requestSupplementModal2 = _interopRequireDefault(_requestSupplementModal);

var _inviteActions = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValidateCard = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    code: store.invite.code

  };
}), _dec(_class = function (_React$Component) {
  _inherits(ValidateCard, _React$Component);

  function ValidateCard(props) {
    _classCallCheck(this, ValidateCard);

    var _this = _possibleConstructorReturn(this, (ValidateCard.__proto__ || Object.getPrototypeOf(ValidateCard)).call(this, props));

    _this.updateCode = _this.updateCode.bind(_this);
    _this.validate = _this.validate.bind(_this);
    return _this;
  }

  _createClass(ValidateCard, [{
    key: 'validate',
    value: function validate() {
      var id = this.props.inviteId;
      this.props.dispatch((0, _inviteActions.sendValidation)(this.props.code, id));
    }
  }, {
    key: 'updateCode',
    value: function updateCode(code) {
      this.props.dispatch((0, _inviteActions.updateCode)(code));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // $(document).ready(function() {
      //   $('select').material_select();
      // });
      // $(this.refs.mySelectBox).on('change',this.updateUnivValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'container', style: { marginTop: "2em" } },
          _react2.default.createElement(
            _reactMaterialize.Row,
            null,
            _react2.default.createElement(
              'div',
              { className: 'input-field col s6' },
              _react2.default.createElement('input', { id: 'code', type: 'text', className: 'validate', onChange: function onChange(e) {
                  return _this2.updateCode(e.target.value);
                } }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'Code' },
                'Validation Code'
              )
            )
          ),
          _react2.default.createElement(
            _reactMaterialize.Row,
            null,
            _react2.default.createElement(
              _reactMaterialize.Button,
              { onClick: this.validate },
              'Validate'
            )
          )
        )
      );
    }
  }]);

  return ValidateCard;
}(_react2.default.Component)) || _class);
exports.default = ValidateCard;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (_ref) {
  var body = _ref.body,
      title = _ref.title,
      preloadedState = _ref.preloadedState,
      css = _ref.css;

  return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="utf-8">\n      <meta http-equiv="X-UA-Compatible" content="IE=edge">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n\n    \t<!-- Import Google Icon Font -->\n    \t<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    \t<!-- Import materialize.css -->\n    \t<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">\n      <style type="text/css">' + [].concat(_toConsumableArray(css)).join('') + '</style>\n      <link href="/public/navbar.css" rel="stylesheet">\n      <title>Diploma Supplement</title>\n    </head>\n      <body>\n        <!-- Import jQuery before materialize.js -->\n      \t<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>\n      \t<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>\n      \t<!-- And then your bundled js -->\n         <div id="root">' + body + '</div>\n         <script>\n           // WARNING: See the following for security issues around embedding JSON in HTML:\n           // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations\n           window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n         </script>\n        <script src="/main.bundle.js"></script>\n      </body>\n    </html>\n\n  ';
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(33);

var _reduxLogger = __webpack_require__(73);

var _reduxThunk = __webpack_require__(74);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromiseMiddleware = __webpack_require__(75);

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reducers = __webpack_require__(76);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxLogger.logger);

exports.default = (0, _redux.createStore)(_reducers2.default, middleware);

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("redux-promise-middleware");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
                  value: true
});

var _redux = __webpack_require__(33);

var _userReducer = __webpack_require__(77);

var _userReducer2 = _interopRequireDefault(_userReducer);

var _supplementsReducer = __webpack_require__(78);

var _supplementsReducer2 = _interopRequireDefault(_supplementsReducer);

var _editSupReducer = __webpack_require__(79);

var _editSupReducer2 = _interopRequireDefault(_editSupReducer);

var _requestPubReducer = __webpack_require__(80);

var _requestPubReducer2 = _interopRequireDefault(_requestPubReducer);

var _invitesReducer = __webpack_require__(81);

var _invitesReducer2 = _interopRequireDefault(_invitesReducer);

var _clockReducer = __webpack_require__(82);

var _clockReducer2 = _interopRequireDefault(_clockReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import tweets from "./tweetReducer"
exports.default = (0, _redux.combineReducers)({
                  user: _userReducer2.default,
                  sups: _supplementsReducer2.default,
                  edit: _editSupReducer2.default,
                  publish: _requestPubReducer2.default,
                  invite: _invitesReducer2.default,
                  clock: _clockReducer2.default
});
// import sideNav from "./sideNavReducer"

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    user: {},
    fetching: false,
    fetched: false,
    error: null
  };
  var action = arguments[1];


  switch (action.type) {
    case "FECTH_USER":
      {
        return _extends({}, state, { fetching: true });
      }
    case "FECTH_USER_REJECTED":
      {
        return _extends({}, state, { fetching: false, error: action.payload });
      }
    case "FETCH_USER_FULLFILED":
      {
        return _extends({}, state, {
          fetching: false,
          fetched: true,
          user: action.payload
        });
      }
    case "SET_USER_NAME":
      {
        // return {...state,
        //   user.name: action.payload
        // }
        return state;
      }
    case "SET_USER":
      {
        return _extends({}, state, {
          user: action.payload
        });
        return state;
      }

  }
  return state;
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        supplements: [],
        supError: null,
        fetching: false,
        sharing: false,
        shareError: null,
        sharingQR: false,
        shareErrorQR: null,
        QR: null,
        isUpdated: false
    };
    var action = arguments[1];


    switch (action.type) {
        case "GET_SUP_FULLFILED":
            {
                return _extends({}, state, { supplements: action.payload, fetching: false });
            }
        case "GET_SUP_REJECTED":
            {
                return _extends({}, state, { supError: action.payload, fetching: false });
            }
        case "GET_SUP":
            {
                return _extends({}, state, { fetching: true, isUpdated: true });
            }

        case "REMOVE_SUP_VIEW":
            {
                return _extends({}, state, { isUpdated: false });
            }

        case "SHARE_SUP_FULLFILED":
            {
                return _extends({}, state, { sharing: false, shareError: null });
            }
        case "SHARE_SUP_REJECTED":
            {
                return _extends({}, state, { sharing: false, shareError: action.payload });
            }
        case "SHARE_SUP_STARTED":
            {
                return _extends({}, state, { sharing: true, shareError: null });
            }
        case "OPEN_SHARE_BY_MAIL":
            {
                return _extends({}, state, { sharing: false, shareError: null });
            }

        case "SHARE_SUP_QR_FULLFILED":
            {
                return _extends({}, state, { sharingQR: false, shareErrorQR: null, QR: action.payload });
            }
        case "SHARE_SUP_QR_REJECTED":
            {
                return _extends({}, state, { sharingQR: false, shareErrorQR: action.payload, QR: null });
            }
        case "SHARE_SUP_QR":
            {
                return _extends({}, state, { sharingQR: true, shareQRErrorQR: null, QR: null });
            }
        case "OPEN_SHARE_BY_QR":
            {
                return _extends({}, state, { sharingQR: false, shareErrorQR: null, QR: null });
            }

    }
    return state;
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    usersToRem: [],
    removingUser: false,
    removedUser: false,
    remError: null,
    modal: false
  };
  var action = arguments[1];


  switch (action.type) {
    case "ADD_USER_REM":
      {
        return _extends({}, state, { usersToRem: [].concat(_toConsumableArray(state.usersToRem), [action.payload]) });
      }
    case "REM_USERS_SENT":
      {
        return _extends({}, state, { removingUser: true });
      }
    case "REM_USERS_FULLFILED":
      {
        return _extends({}, state, { removingUser: false, removedUser: true, usersToRem: [] });
      }
    case "REM_USERS_REJECTED":
      {
        return _extends({}, state, { removingUser: false, removedUser: true, remError: action.payload });
      }
    case "MODAL_OPEN":
      {
        return _extends({}, state, { modal: true });
      }
    case "MODAL_CLOSE":
      {
        return _extends({}, state, { modal: false });
      }

  }
  return state;
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    modal: false,
    univId: "",
    email: "",
    university: "UAegean",
    sendingRequest: false,
    requestFullfiled: false
  };
  var action = arguments[1];


  switch (action.type) {
    case "REQUEST_PUBLISH_SENT":
      {
        return _extends({}, state, { sendingRequest: true });
      }
    case "REQUEST_PUBLISH_FULLFILED":
      {
        return _extends({}, state, { sendingRequest: false, requestFullfiled: true, removedUser: true, usersToRem: [] });
      }
    case "REQUEST_PUBLISH_REJECTED":
      {
        return _extends({}, state, { sendingRequest: false, removedUser: true, remError: action.payload });
      }
    case "PUBLISH_MODAL_OPEN":
      {
        return _extends({}, state, { modal: true });
      }
    case "PUBLISH_MODAL_CLOSE":
      {
        return _extends({}, state, { modal: false, requestFullfiled: false });
      }
    case "UPDATE_UNIVID":
      {
        return _extends({}, state, { univId: action.payload });
      }
    case "UPDATE_UNINIVERSITY":
      {
        return _extends({}, state, { university: action.payload });
      }
    case "UPDATE_EMAIL":
      {
        return _extends({}, state, { email: action.payload });
      }
  }
  return state;
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    supplements: [],
    invite: null,
    error: null,
    fetching: false,
    message: "",
    validate: false,
    code: ""
  };
  var action = arguments[1];


  switch (action.type) {
    case "GET_INV":
      {
        return _extends({}, state, { fetching: true, message: "Fetching Invite..." });
      }
    case "GET_INV_FULLFILED":
      {
        return _extends({}, state, { fetching: false, invite: action.payload, message: "" });
      }
    case "GET_INV_SUP":
      {
        return _extends({}, state, { fetching: true, message: "Fetching supplement..." });
      }
    case "GET_INV_SUP_FULLFILED":
      {
        return _extends({}, state, { fetching: false, message: "",
          supplements: [].concat(_toConsumableArray(state.supplements), [action.payload]) });
      }
    case "SEND_VAL_CODE":
      {
        return _extends({}, state, { fetching: true, message: "Sending Validation code..." });
      }
    case "SEND_VAL_CODE_FULLFILED":
      {
        return _extends({}, state, { fetching: false, message: "", validate: true });
      }
    case "GET_INV_REJECTED":
      {
        return _extends({}, state, { fetching: false, message: "", validate: false, error: action.payload });
      }
    case "UPDATE_CODE":
      {
        return _extends({}, state, { code: action.payload });
      }
    case "SEND_UPDATE_CODE":
      {
        return _extends({}, state, { fetching: true, mesage: "Validating Invitation..." });
      }
  }
  return state;
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    timeOutMinutes: 2,
    timeOutSeconds: 59,
    startHour: null, //(new Date()).getHours(),
    startMinutes: null, //(new Date()).getMinutes(),
    startSeconds: null //(new Date()).getSeconds()
  };
  var action = arguments[1];


  var maxMinutes = process.env.SESSION_TIMEOUT | 2;

  switch (action.type) {

    case "REDUCE_SECOND":
      {
        var date = new Date();
        var secs = date.getSeconds();
        var mins = date.getMinutes();
        var hours = date.getHours();

        // start = 17.26:15   now = 17.28.01 ||  now= 28*360+01 = 10081, start= 26*360 +15=9375    minPassed = Math.floor(10140 -10260 ) / 360)
        // start = 17.59:01 now 18.00.10    ||             minDiff => 60 + 00 - 59 = 1, secDiff =>

        var startTimestamp = state.startHour * 3600 + state.startMinutes * 60 + state.startSeconds;
        var nowTimestamp = hours * 3600 + mins * 60 + secs;

        var timePassed = nowTimestamp - startTimestamp;
        console.log(" -------------  ");
        console.log("hours", Math.floor(timePassed / 3600));
        console.log("minutes", Math.floor(timePassed / 60));
        console.log("seconds", Math.floor(timePassed));
        console.log(" ------**-----  ");
        if (Math.floor(timePassed / 3600) != 0 || //if more than 0 hours have passed expired clock
        Math.floor(timePassed / 60) > maxMinutes) {
          //if more than MAX minutes have passed expired clock
          return _extends({}, state, { timeOutMinutes: 0, timeOutSeconds: 0 });
        }

        if (state.timeOutSeconds == 0) {
          return _extends({}, state, { timeOutMinutes: maxMinutes - Math.floor(timePassed / 60), timeOutSeconds: 59 //{...state, timeOutMinutes:state.timeOutMinutes-1, timeOutSeconds:59}
          });
        } else {
          return _extends({}, state, { timeOutMinutes: maxMinutes - Math.floor(timePassed / 60), timeOutSeconds: state.timeOutSeconds - 1 //{...state, timeOutMinutes:state.timeOutMinutes, timeOutSeconds:state.timeOutSeconds-1}
          });
        }
      }
    case "RESTART_CLOCK":
      {
        return _extends({}, state, { timeOutMinutes: maxMinutes, timeOutSeconds: 59, startHour: new Date().getHours(), startMinutes: new Date().getMinutes(), startSeconds: new Date().getSeconds() });
      }

  }
  return state;
}

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("session-file-store");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("connect-timeout");

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("njwt");

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


var express = __webpack_require__(18);
var router = express.Router();
var bcrypt = __webpack_require__(26);
var jwt = __webpack_require__(19);
var secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "testSecret"; //the secret comes from an enviroment variable
var request = __webpack_require__(27);
var authorizeAll = __webpack_require__(5).authorizeAll;
var authorizeAdmin = __webpack_require__(5).authorizeAdmin;
var getUserDetails = __webpack_require__(5).userDetailsFromToken;
var fs = __webpack_require__(4);
var path = __webpack_require__(3);

module.exports = router;

router.post('/register', function (req, res) {
  var userJSON = req.body; //in the body of the HTTP request we should have received a json here
  var hashedPass = bcrypt.hashSync(req.body.password, 10);
  userJSON.password = hashedPass;
  //save the user in the db...
  return res.json(userJSON);
});

router.get('/loginSuccess', function (req, res) {
  var cookie = req.cookies.dsHash;
  console.log("dsHashCookie: " + cookie);
  if (cookie === undefined) {
    res.redirect(303, "/");
  } else {
    res.redirect(303, "/supplement/view/invite/" + cookie);
  }
});

router.get('/loginSuccessReact', function (req, res) {
  var cookie = req.cookies.inviteHash;
  console.log("dsHashCookie: " + cookie);
  if (cookie === undefined) {
    res.redirect(303, "/app");
  } else {
    res.redirect(303, "/app/invite/" + cookie);
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


router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(303, "/login/landing");
    }
  });
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


var express = __webpack_require__(18);
var router = express.Router();
var bcrypt = __webpack_require__(26);
var jwt = __webpack_require__(19);
var secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "testSecret"; //the secret comes from an enviroment variable
var request = __webpack_require__(27);
var authorizeAll = __webpack_require__(5).authorizeAll;
var authorizeAdmin = __webpack_require__(5).authorizeAdmin;
var getUserDetails = __webpack_require__(5).userDetailsFromToken;
var uuid = __webpack_require__(35);

module.exports = router;

router.get(['/', '/home'], authorizeAll, function (req, res) {
  getUserDetails(req, res).then(function (details) {
    // res.render('stdMainView',{ title: 'Publish a new Diploma Supplement',
    // message: 'Welcome user: ' + details.eid ,
    // eID: details.eid,
    // userName: details.userName,
    // firstName: details.firstName,
    // lastName: details.familyName});
    res.redirect("/app");
  }).catch(function (err) {
    res.render('landing', { title: 'Login', message: 'Login to the DiplomaSupplement WebApp' });
  });
});

router.get('/landing', function (req, res) {
  res.render('landing', { title: 'Login', message: 'Login to the DiplomaSupplement WebApp' });
});

router.get('/eIDAS', function (req, res) {
  // if(!req.session.userType  && !req.session.eID){
  // res.redirect(303, "http://84.205.248.180/ISSPlus/ValidateToken?t="+ uuid()+"&sp=sp1&cc=CA&saml=eIDAS");
  res.redirect(303, process.env.LOGIN_ADDR);
  // }
});

router.get('/loginFail', function (req, res) {
  res.render('errorMessage', { 'message': 'Non-sucessful authentication. Please, return to the home page and re-initialize the process. If the authentication fails again, please contact your national eID provider' });
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


var express = __webpack_require__(18);
var router = express.Router();
var request = __webpack_require__(27);
var authorizeAll = __webpack_require__(5).authorizeAll;
var authorizeAdmin = __webpack_require__(5).authorizeAdmin;
var getUserDetails = __webpack_require__(5).userDetailsFromToken;
var basic = __webpack_require__(94);
var supUtils = __webpack_require__(105);
var emailUtil = __webpack_require__(108);
var randomstring = __webpack_require__(112);
var jwt = __webpack_require__(19);
var secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "testSecret"; //the secret comes from an enviroment variable
var stripchar = __webpack_require__(34).StripChar;
var uuid = __webpack_require__(35);

/* configuration */
var config = __webpack_require__(8);
var peer = config.peer;
var peerAddr = config.peerAddress;
var channel = config.channelName;
var org = config.org;
var chaincode = config.chaincode;

module.exports = router;

/**************** views ******************************/

router.get('/view', authorizeAll, function (req, res) {
  var userDetails = getUserDetails(req, res);
  userDetails.then(function (details) {
    var userEid = details.eid;
    console.log(details);
    console.log("\nSupplementsRouts.js /view :: userEid" + userEid);
    res.render('viewSupplements', { title: 'Published Supplements',
      message: 'Welcome user: ' + details.userName,
      userType: "Student",
      supplements: null,
      eID: userEid,
      userName: details.userName,
      firstName: details.firstName,
      lastName: details.familyName });
  }).catch(function (err) {
    res.render('errorMessage', { title: 'Ooops... an error occured!',
      message: err,
      stdId: req.session.eID });
  });;
});

/*
  Allows the user to view a DS based on an invite.
  If the user is not logged in they are asked to login.
  If they are logged in they check the inv:
    a) If it is finalized then the id of the user is checked against the allowed set
    b) else, a validation code is sent to the user.
*/
router.get('/view/invite/:inviteHash', function (req, res) {
  var token = req.cookies.access_token;
  var inviteHash = req.params.inviteHash;
  jwt.verify(token, "secret", { algorithms: ['HS256'] }, function (err, token) {
    if (err) {
      res.cookie('dsHash', inviteHash, { maxAge: 900000, httpOnly: true });
      res.render('loginEIDAS', { title: 'Login with eIDAS',
        message: 'Login with the eIDAS system to view this Diploma Supplement',
        token: uuid() });
      console.log(err);
    } else {
      //jwt token found.
      getUserDetails(req, res).then(function (details) {
        var userEid = details.eid;
        res.render('viewByInvite', { title: 'View DS by Invite',
          message: 'Request Diploma Supplement Access',
          token: "",
          invHash: inviteHash });
      });
    }
  });
});

router.get('/edit/:supId', authorizeAll, function (req, res) {
  var userDetails = getUserDetails(req, res);
  var supId = req.params.supId;
  userDetails.then(function (details) {
    var userEid = details.eid;
    basic.queryChaincode(peer, channel, chaincode, [supId, userEid], "getSupplementById", userEid, org).then(function (resp) {
      if (JSON.parse(resp).Owner === userEid) {
        res.render('editSupplement', { title: 'Edit Supplement',
          message: 'Welcome user: ' + details.userName,
          userType: "Student",
          supplement: JSON.parse(resp),
          eID: userEid,
          userName: details.userName,
          firstName: details.firstName,
          lastName: details.familyName });
      } else {
        res.render('errorMessage', { title: 'Ooops... an error occured!',
          message: "You can only edit supplements you own",
          stdId: "" });
      }
    }).catch(function (err) {
      res.render('errorMessage', { title: 'Ooops... an error occured!',
        message: error.toString(),
        stdId: "" });
    });
  });
});

router.get('/request', authorizeAll, function (req, res) {
  getUserDetails(req, res).then(function (details) {
    res.render('requestPublication', { title: 'Request DS Publication',
      message: "",
      eID: details.eid,
      userName: details.userName,
      firstName: details.firstName,
      lastName: details.familyName,
      dateOfBirth: details.dateOfBirth,
      eIDHash: details.eid
    });
  }).catch(function (err) {
    console.log(err);
  });
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint es6,  node:true */


var path = __webpack_require__(3);
var fs = __webpack_require__(4);
var util = __webpack_require__(7);
var config = __webpack_require__(8);
var helper = __webpack_require__(9);
var logger = helper.getLogger('install-chaincode');
var tx_id = null;

var join = __webpack_require__(100);
var createChannel = __webpack_require__(101);
var instantiate = __webpack_require__(102);
var query = __webpack_require__(103);
var invoke = __webpack_require__(104);
var evHelper = __webpack_require__(36);

exports.installChaincode = function (peers, chaincodeName, chaincodePath, chaincodeVersion, username, org) {
  console.log('\n============ Install chaincode on organizations ============\n');
  helper.setupChaincodeDeploy();
  var channel = helper.getChannelForOrg(org);
  var client = helper.getClientForOrg(org);

  return helper.getOrgAdmin(org).then(function (user) {
    var request = {
      targets: helper.newPeers(peers),
      chaincodePath: chaincodePath,
      chaincodeId: chaincodeName,
      chaincodeVersion: chaincodeVersion
    };
    console.log("test.js --> installChaincode");
    console.log(request);
    return client.installChaincode(request);
  }, function (err) {
    console.log('Failed to enroll user \'' + username + '\'. ' + err);
    throw new Error('Failed to enroll user \'' + username + '\'. ' + err);
  }).then(function (results) {
    var proposalResponses = results[0];
    var proposal = results[1];
    var all_good = true;
    for (var i in proposalResponses) {
      var one_good = false;
      if (proposalResponses && proposalResponses[0].response && proposalResponses[0].response.status === 200) {
        one_good = true;
        console.log('install proposal was good');
      } else {
        console.log('install proposal was bad');
      }
      all_good = all_good & one_good;
    }
    if (all_good) {
      console.log(util.format('Successfully sent install Proposal and received ProposalResponse: Status - %s', proposalResponses[0].response.status));
      console.log('\nSuccessfully Installed chaincode on organization ' + org + '\n');
      return 'Successfully Installed chaincode on organization ' + org;
    } else {
      console.log('Failed to send install Proposal or receive valid response. Response null or status is not 200. exiting...');
      return 'Failed to send install Proposal or receive valid response. Response null or status is not 200. exiting...';
    }
  }, function (err) {
    console.log( true ? err.stack : err);
    throw new Error( true ? err.stack : err);
  });
};

exports.createChannel = function () {
  createChannel.createChannel("mychannel", "../artifacts/channel/channel.tx", "nikos2", "org1").then(function (resp) {
    console.log("=============CHANEL CREATED===================");
  }).catch(function (err) {
    console.log(err);
  });
};

exports.joinAllOrgsOnChannel = function (chanelName) {
  join.joinChannel(chanelName, ["localhost:7051"], "nikos2", "org1").then(function (resp) {
    console.log("=============Peer localhost:7051 JOINED===================");
  }).then(function (resp) {
    join.joinChannel(chanelName, ["localhost:8051"], "nikos2", "org2");
    console.log("=============Peer localhost:8051 JOINED===================");
  }).catch(function (err) {
    console.log(err);
  });
};

exports.instantiateChaincode = function (channelName, chaincodeName, chaincodeVersion, functionName, args, username, org) {
  return instantiate.instantiateChaincode(channelName, chaincodeName, chaincodeVersion, functionName, args, username, org);
};

exports.queryChaincode = function (peer, channelName, chaincodeName, args, fcn, username, org) {
  return query.queryChaincode(peer, channelName, chaincodeName, args, fcn, username, org);
};

/**
  Invoke transaction and listen to custom DS events
**/
exports.invokeChaincode = function (peersUrls, channelName, chaincodeName, fcn, args, username, org) {
  return invoke.invokeChaincode(peersUrls, channelName, chaincodeName, fcn, args, username, org, evHelper.txDetectionEvent);
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = require("log4js");

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("fabric-client/lib/User.js");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = require("fabric-ca-client");

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var util = __webpack_require__(7);
var path = __webpack_require__(3);
var fs = __webpack_require__(4);

var Peer = __webpack_require__(21);
var EventHub = __webpack_require__(22);
var tx_id = null;
var nonce = null;
var config = __webpack_require__(8);
var helper = __webpack_require__(9);
var logger = helper.getLogger('Join-Channel');
//helper.hfc.addConfigFile(path.join(__dirname, 'network-config.json'));
var ORGS = helper.ORGS;
var allEventhubs = [];

//
//Attempt to send a request to the orderer with the sendCreateChain method
//
var joinChannel = function joinChannel(channelName, peers, username, org) {
	// on process exit, always disconnect the event hub
	var closeConnections = function closeConnections(isSuccess) {
		if (isSuccess) {
			console.log('\n============ Join Channel is SUCCESS ============\n');
		} else {
			console.log('\n!!!!!!!! ERROR: Join Channel FAILED !!!!!!!!\n');
		}
		console.log('');
		for (var key in allEventhubs) {
			var eventhub = allEventhubs[key];
			if (eventhub && eventhub.isconnected()) {
				//console.log('Disconnecting the event hub');
				eventhub.disconnect();
			}
		}
	};
	//console.log('\n============ Join Channel ============\n')
	logger.info(util.format('Calling peers in organization "%s" to join the channel', org));

	var client = helper.getClientForOrg(org);
	var channel = helper.getChannelForOrg(org);
	var eventhubs = [];

	return helper.getOrgAdmin(org).then(function (admin) {
		logger.info(util.format('received member object for admin of the organization "%s": ', org));
		tx_id = client.newTransactionID();
		var request = {
			txId: tx_id
		};

		return channel.getGenesisBlock(request);
	}).then(function (genesis_block) {
		tx_id = client.newTransactionID();
		var request = {
			targets: helper.newPeers(peers),
			txId: tx_id,
			block: genesis_block
		};

		for (var key in ORGS[org]) {
			if (ORGS[org].hasOwnProperty(key)) {
				if (key.indexOf('peer') === 0) {
					var data = fs.readFileSync(path.join(__dirname, ORGS[org][key]['tls_cacerts']));
					var eh = client.newEventHub();
					eh.setPeerAddr(ORGS[org][key].events, {
						pem: Buffer.from(data).toString(),
						'ssl-target-name-override': ORGS[org][key]['server-hostname']
					});
					eh.connect();
					eventhubs.push(eh);
					allEventhubs.push(eh);
				}
			}
		}

		var eventPromises = [];
		eventhubs.forEach(function (eh) {
			var txPromise = new Promise(function (resolve, reject) {
				var handle = setTimeout(reject, parseInt(config.eventWaitTime));
				eh.registerBlockEvent(function (block) {
					clearTimeout(handle);
					// in real-world situations, a peer may have more than one channels so
					// we must check that this block came from the channel we asked the peer to join
					if (block.data.data.length === 1) {
						// Config block must only contain one transaction
						var channel_header = block.data.data[0].payload.header.channel_header;
						if (channel_header.channel_id === channelName) {
							resolve();
						} else {
							reject();
						}
					}
				});
			});
			eventPromises.push(txPromise);
		});
		var sendPromise = channel.joinChannel(request);
		return Promise.all([sendPromise].concat(eventPromises));
	}, function (err) {
		console.log( true ? err.stack : err);
		throw new Error( true ? err.stack : err);
	}).then(function (results) {
		console.log(util.format('Join Channel R E S P O N S E : %j', results));
		if (results[0] && results[0][0] && results[0][0].response && results[0][0].response.status == 200) {
			logger.info(util.format('Successfully joined peers in organization %s to the channel \'%s\'', org, channelName));
			closeConnections(true);
			var response = {
				success: true,
				message: util.format('Successfully joined peers in organization %s to the channel \'%s\'', org, channelName)
			};
			return response;
		} else {
			console.log(' Failed to join channel');
			closeConnections();
			throw new Error('Failed to join channel');
		}
	}, function (err) {
		console.log( true ? err.stack : err);
		closeConnections();
		throw new Error( true ? err.stack : err);
	});
};
exports.joinChannel = joinChannel;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var util = __webpack_require__(7);
var fs = __webpack_require__(4);
var path = __webpack_require__(3);
var config = __webpack_require__(8);
var helper = __webpack_require__(9);
var logger = helper.getLogger('Create-Channel');
//Attempt to send a request to the orderer with the sendCreateChain method
var createChannel = function createChannel(channelName, channelConfigPath, username, orgName) {
	logger.debug('\n====== Creating Channel \'' + channelName + '\' ======\n');
	var client = helper.getClientForOrg(orgName);
	var channel = helper.getChannelForOrg(orgName);

	// read in the envelope for the channel config raw bytes
	var envelope = fs.readFileSync(path.join(__dirname, channelConfigPath));
	// extract the channel config bytes from the envelope to be signed
	var channelConfig = client.extractChannelConfig(envelope);

	//Acting as a client in the given organization provided with "orgName" param
	return helper.getOrgAdmin(orgName).then(function (admin) {
		logger.debug(util.format('Successfully acquired admin user for the organization "%s"', orgName));
		// sign the channel config bytes as "endorsement", this is required by
		// the orderer's channel creation policy
		var signature = client.signChannelConfig(channelConfig);

		var request = {
			config: channelConfig,
			signatures: [signature],
			name: channelName,
			orderer: channel.getOrderers()[0],
			txId: client.newTransactionID()
		};

		// send to orderer
		return client.createChannel(request);
	}, function (err) {
		logger.error('Failed to enroll user \'' + username + '\'. Error: ' + err);
		throw new Error('Failed to enroll user \'' + username + '\'' + err);
	}).then(function (response) {
		logger.debug(' response ::%j', response);
		if (response && response.status === 'SUCCESS') {
			logger.debug('Successfully created the channel.');
			var _response = {
				success: true,
				message: 'Channel \'' + channelName + '\' created Successfully'
			};
			return _response;
		} else {
			logger.error('\n!!!!!!!!! Failed to create the channel \'' + channelName + '\' !!!!!!!!!\n\n');
			throw new Error('Failed to create the channel \'' + channelName + '\'');
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		throw new Error( true ? err.stack : err);
	});
};

exports.createChannel = createChannel;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


var path = __webpack_require__(3);
var fs = __webpack_require__(4);
var util = __webpack_require__(7);
var hfc = __webpack_require__(20);
var Peer = __webpack_require__(21);
var EventHub = __webpack_require__(22);
var config = __webpack_require__(8);
var helper = __webpack_require__(9);
var logger = helper.getLogger('instantiate-chaincode');
hfc.addConfigFile(path.join(__dirname, 'network-config.json'));
var ORGS = hfc.getConfigSetting('network-config');
var tx_id = null;
var eh = null;

var instantiateChaincode = function instantiateChaincode(channelName, chaincodeName, chaincodeVersion, functionName, args, username, org) {
	console.log('\n============ Instantiate chaincode on organization ' + org + ' ============\n');

	var channel = helper.getChannelForOrg(org);
	var client = helper.getClientForOrg(org);

	return helper.getOrgAdmin(org).then(function (user) {
		// read the config block from the orderer for the channel
		// and initialize the verify MSPs based on the participating
		// organizations
		return channel.initialize();
	}, function (err) {
		console.log('Failed to enroll user \'' + username + '\'. ' + err);
		throw new Error('Failed to enroll user \'' + username + '\'. ' + err);
	}).then(function (success) {
		tx_id = client.newTransactionID();
		// send proposal to endorser
		var request = {
			chaincodeId: chaincodeName,
			chaincodeVersion: chaincodeVersion,
			fcn: functionName,
			args: args,
			txId: tx_id
		};
		return channel.sendInstantiateProposal(request);
	}, function (err) {
		console.log('Failed to initialize the channel');
		throw new Error('Failed to initialize the channel');
	}).then(function (results) {
		var proposalResponses = results[0];
		var proposal = results[1];
		var all_good = true;
		for (var i in proposalResponses) {
			var one_good = false;
			if (proposalResponses && proposalResponses[0].response && proposalResponses[0].response.status === 200) {
				one_good = true;
				logger.info('instantiate proposal was good');
			} else {
				console.log('instantiate proposal was bad');
			}
			all_good = all_good & one_good;
		}
		if (all_good) {
			logger.info(util.format('Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s", metadata - "%s", endorsement signature: %s', proposalResponses[0].response.status, proposalResponses[0].response.message, proposalResponses[0].response.payload, proposalResponses[0].endorsement.signature));
			var request = {
				proposalResponses: proposalResponses,
				proposal: proposal
			};
			// set the transaction listener and set a timeout of 30sec
			// if the transaction did not get committed within the timeout period,
			// fail the test
			var deployId = tx_id.getTransactionID();

			eh = client.newEventHub();
			var data = fs.readFileSync(path.join(__dirname, ORGS[org]['peer1']['tls_cacerts']));
			eh.setPeerAddr(ORGS[org]['peer1']['events'], {
				pem: Buffer.from(data).toString(),
				'ssl-target-name-override': ORGS[org]['peer1']['server-hostname']
			});
			eh.connect();

			var txPromise = new Promise(function (resolve, reject) {
				var handle = setTimeout(function () {
					eh.disconnect();
					reject();
				}, 30000);

				eh.registerTxEvent(deployId, function (tx, code) {
					logger.info('The chaincode instantiate transaction has been committed on peer ' + eh._ep._endpoint.addr);
					clearTimeout(handle);
					eh.unregisterTxEvent(deployId);
					eh.disconnect();

					if (code !== 'VALID') {
						console.log('The chaincode instantiate transaction was invalid, code = ' + code);
						reject();
					} else {
						logger.info('The chaincode instantiate transaction was valid.');
						resolve();
					}
				});
			});

			var sendPromise = channel.sendTransaction(request);
			return Promise.all([sendPromise].concat([txPromise])).then(function (results) {
				console.log('Event promise all complete and testing complete');
				return results[0]; // the first returned value is from the 'sendPromise' which is from the 'sendTransaction()' call
			}).catch(function (err) {
				console.log(util.format('Failed to send instantiate transaction and get notifications within the timeout period. %s', err));
				return 'Failed to send instantiate transaction and get notifications within the timeout period.';
			});
		} else {
			console.log('Failed to send instantiate Proposal or receive valid response. Response null or status is not 200. exiting...');
			return 'Failed to send instantiate Proposal or receive valid response. Response null or status is not 200. exiting...';
		}
	}, function (err) {
		console.log( true ? err.stack : err);
		return  true ? err.stack : err;
	}).then(function (response) {
		if (response.status === 'SUCCESS') {
			logger.info('Successfully sent transaction to the orderer.');
			return 'Chaincode Instantiateion is SUCCESS';
		} else {
			console.log('Failed to order the transaction. Error code: ' + response.status);
			return 'Failed to order the transaction. Error code: ' + response.status;
		}
	}, function (err) {
		console.log( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};
exports.instantiateChaincode = instantiateChaincode;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var path = __webpack_require__(3);
var fs = __webpack_require__(4);
var util = __webpack_require__(7);
var hfc = __webpack_require__(20);
var Peer = __webpack_require__(21);
var EventHub = __webpack_require__(22);
var config = __webpack_require__(8);
var helper = __webpack_require__(9);
var logger = helper.getLogger('Query');

var queryChaincode = function queryChaincode(peer, channelName, chaincodeName, args, fcn, username, org) {
	var channel = helper.getChannelForOrg(org);
	var client = helper.getClientForOrg(org);
	var target = buildTarget(peer, org);
	return helper.getRegisteredUsers(username, org).then(function (user) {
		tx_id = client.newTransactionID();
		// send query
		var request = {
			chaincodeId: chaincodeName,
			txId: tx_id,
			fcn: fcn,
			args: args
		};
		return channel.queryByChaincode(request, target);
	}, function (err) {
		logger.info('Failed to get submitter \'' + username + '\'');
		return  true ? err.stack : err;
	}).then(function (response_payloads) {
		if (response_payloads) {
			for (var i = 0; i < response_payloads.length; i++) {
				logger.info(args[0] + ' now has ' + response_payloads[i].toString('utf8') + ' after the move');
				// return args[0]+' now has ' + response_payloads[i].toString('utf8') +
				// 	' after the move';
				return response_payloads[i].toString('utf8');
			}
		} else {
			logger.error('response_payloads is null');
			return 'response_payloads is null';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).catch(function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

var getBlockByNumber = function getBlockByNumber(peer, blockNumber, username, org) {
	var target = buildTarget(peer, org);
	var channel = helper.getChannelForOrg(org);

	return helper.getRegisteredUsers(username, org).then(function (member) {
		return channel.queryBlock(parseInt(blockNumber), target);
	}, function (err) {
		logger.info('Failed to get submitter "' + username + '"');
		return  true ? err.stack : err;
	}).then(function (response_payloads) {
		if (response_payloads) {
			//logger.debug(response_payloads);
			logger.debug(response_payloads);
			return response_payloads; //response_payloads.data.data[0].buffer;
		} else {
			logger.error('response_payloads is null');
			return 'response_payloads is null';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).catch(function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

var getTransactionByID = function getTransactionByID(peer, trxnID, username, org) {
	var target = buildTarget(peer, org);
	var channel = helper.getChannelForOrg(org);

	return helper.getRegisteredUsers(username, org).then(function (member) {
		return channel.queryTransaction(trxnID, target);
	}, function (err) {
		logger.info('Failed to get submitter "' + username + '"');
		return  true ? err.stack : err;
	}).then(function (response_payloads) {
		if (response_payloads) {
			logger.debug(response_payloads);
			return response_payloads;
		} else {
			logger.error('response_payloads is null');
			return 'response_payloads is null';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).catch(function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

var getBlockByHash = function getBlockByHash(peer, hash, username, org) {
	var target = buildTarget(peer, org);
	var channel = helper.getChannelForOrg(org);

	return helper.getRegisteredUsers(username, org).then(function (member) {
		return channel.queryBlockByHash(Buffer.from(hash), target);
	}, function (err) {
		logger.info('Failed to get submitter "' + username + '"');
		return  true ? err.stack : err;
	}).then(function (response_payloads) {
		if (response_payloads) {
			logger.debug(response_payloads);
			return response_payloads;
		} else {
			logger.error('response_payloads is null');
			return 'response_payloads is null';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).catch(function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

var getChainInfo = function getChainInfo(peer, username, org) {
	var target = buildTarget(peer, org);
	var channel = helper.getChannelForOrg(org);

	return helper.getRegisteredUsers(username, org).then(function (member) {
		return channel.queryInfo(target);
	}, function (err) {
		logger.info('Failed to get submitter "' + username + '"');
		return  true ? err.stack : err;
	}).then(function (blockchainInfo) {
		if (blockchainInfo) {
			// FIXME: Save this for testing 'getBlockByHash'  ?
			logger.debug('===========================================');
			logger.debug(blockchainInfo.currentBlockHash);
			logger.debug('===========================================');
			//logger.debug(blockchainInfo);
			return blockchainInfo;
		} else {
			logger.error('response_payloads is null');
			return 'response_payloads is null';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).catch(function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

//getInstalledChaincodes
var getInstalledChaincodes = function getInstalledChaincodes(peer, type, username, org) {
	var target = buildTarget(peer, org);
	var channel = helper.getChannelForOrg(org);
	var client = helper.getClientForOrg(org);

	return helper.getOrgAdmin(org).then(function (member) {
		if (type === 'installed') {
			return client.queryInstalledChaincodes(target);
		} else {
			return channel.queryInstantiatedChaincodes(target);
		}
	}, function (err) {
		logger.info('Failed to get submitter "' + username + '"');
		return  true ? err.stack : err;
	}).then(function (response) {
		if (response) {
			if (type === 'installed') {
				logger.debug('<<< Installed Chaincodes >>>');
			} else {
				logger.debug('<<< Instantiated Chaincodes >>>');
			}
			var details = [];
			for (var i = 0; i < response.chaincodes.length; i++) {
				logger.debug('name: ' + response.chaincodes[i].name + ', version: ' + response.chaincodes[i].version + ', path: ' + response.chaincodes[i].path);
				details.push('name: ' + response.chaincodes[i].name + ', version: ' + response.chaincodes[i].version + ', path: ' + response.chaincodes[i].path);
			}
			return details;
		} else {
			logger.error('response is null');
			return 'response is null';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).catch(function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

var getChannels = function getChannels(peer, username, org) {
	var target = buildTarget(peer, org);
	var channel = helper.getChannelForOrg(org);
	var client = helper.getClientForOrg(org);

	return helper.getRegisteredUsers(username, org).then(function (member) {
		//channel.setPrimaryPeer(targets[0]);
		return client.queryChannels(target);
	}, function (err) {
		logger.info('Failed to get submitter "' + username + '"');
		return  true ? err.stack : err;
	}).then(function (response) {
		if (response) {
			logger.debug('<<< channels >>>');
			var channelNames = [];
			for (var i = 0; i < response.channels.length; i++) {
				channelNames.push('channel id: ' + response.channels[i].channel_id);
			}
			logger.debug(channelNames);
			return response;
		} else {
			logger.error('response_payloads is null');
			return 'response_payloads is null';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).catch(function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

function buildTarget(peer, org) {
	var target = null;
	if (typeof peer !== 'undefined') {
		var targets = helper.newPeers([helper.getPeerAddressByName(org, peer)]);
		if (targets && targets.length > 0) target = targets[0];
	}

	return target;
}

exports.queryChaincode = queryChaincode;
exports.getBlockByNumber = getBlockByNumber;
exports.getTransactionByID = getTransactionByID;
exports.getBlockByHash = getBlockByHash;
exports.getChainInfo = getChainInfo;
exports.getInstalledChaincodes = getInstalledChaincodes;
exports.getChannels = getChannels;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


var path = __webpack_require__(3);
var fs = __webpack_require__(4);
var util = __webpack_require__(7);
var hfc = __webpack_require__(20);
var Peer = __webpack_require__(21);
var config = __webpack_require__(8);
var helper = __webpack_require__(9);
var logger = helper.getLogger('invoke-chaincode');
var EventHub = __webpack_require__(22);
hfc.addConfigFile(path.join(__dirname, 'network-config.json'));
var ORGS = hfc.getConfigSetting('network-config');
var evHelper = __webpack_require__(36);

/**
	@param  eventHandler, an OPTIONAL function, that handles the custom events
					emmited by this transaction if any
**/
var invokeChaincode = function invokeChaincode(peersUrls, channelName, chaincodeName, fcn, args, username, org, eventHandler) {
	logger.debug(util.format('\n============ invoke transaction on organization %s ============\n', org));
	var client = helper.getClientForOrg(org);
	var channel = helper.getChannelForOrg(org);
	var targets = helper.newPeers(peersUrls);
	var tx_id = null;

	return helper.getRegisteredUsers(username, org).then(function (user) {
		tx_id = client.newTransactionID();
		logger.debug(util.format('Sending transaction "%j"', tx_id));
		// send proposal to endorser
		var request = {
			targets: targets,
			chaincodeId: chaincodeName,
			fcn: fcn,
			args: args,
			chainId: channelName,
			txId: tx_id
		};
		return channel.sendTransactionProposal(request);
	}, function (err) {
		logger.error('Failed to enroll user \'' + username + '\'. ' + err);
		throw new Error('Failed to enroll user \'' + username + '\'. ' + err);
	}).then(function (results) {

		var proposalResponses = results[0];
		var proposal = results[1];
		var all_good = true;
		for (var i in proposalResponses) {
			var one_good = false;
			if (proposalResponses && proposalResponses[0].response && proposalResponses[0].response.status === 200) {
				one_good = true;
				logger.info('transaction proposal was good');
			} else {
				logger.error('transaction proposal was bad');
			}
			all_good = all_good & one_good;
		}
		if (all_good) {
			logger.debug(util.format('Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s", metadata - "%s", endorsement signature: %s', proposalResponses[0].response.status, proposalResponses[0].response.message, proposalResponses[0].response.payload, proposalResponses[0].endorsement.signature));
			var request = {
				proposalResponses: proposalResponses,
				proposal: proposal
			};
			// set the transaction listener and set a timeout of 30sec
			// if the transaction did not get committed within the timeout period,
			// fail the test
			var transactionID = tx_id.getTransactionID();
			var eventPromises = [];

			var eventhubs = helper.newEventHubs(peersUrls, org);

			var _loop = function _loop(key) {
				var eh = eventhubs[key];
				eh.connect();

				var txPromise = new Promise(function (resolve, reject) {
					var handle = setTimeout(function () {
						eh.disconnect();
						reject();
					}, 30000);

					eh.registerTxEvent(transactionID, function (tx, code) {
						clearTimeout(handle);
						eh.unregisterTxEvent(transactionID);
						eh.disconnect();

						if (code !== 'VALID') {
							logger.error('The balance transfer transaction was invalid, code = ' + code);
							reject();
						} else {
							logger.info('The balance transfer transaction has been committed on peer ' + eh._ep._endpoint.addr);
							resolve();
						}
					});
				});
				eventPromises.push(txPromise);

				//In case the eventHandler is provided
				// we will listen for custom events and only when they are
				// detected will the promise resove
				if (eventHandler !== undefined) {

					var txEventPromise = new Promise(function (resolve, reject) {
						//peersUrls, channelName, chaincodeName, fcn, args, username, org, eventHandler
						evHelper.registerEventHubForOrg(org, chaincodeName, 'evtsender', function (event, hub, obj) {
							eventHandler(reject, resolve, event, hub, obj, transactionID);
						});
					});
					eventPromises.push(txEventPromise);
				}
			};

			for (var key in eventhubs) {
				_loop(key);
			};

			var sendPromise = channel.sendTransaction(request);

			return Promise.all([sendPromise].concat(eventPromises)).then(function (results) {
				logger.debug(' event promise all complete and testing complete');
				return results[0]; // the first returned value is from the 'sendPromise' which is from the 'sendTransaction()' call
			}).catch(function (err) {
				logger.error('Failed to send transaction and get notifications within the timeout period.');
				return 'Failed to send transaction and get notifications within the timeout period.';
			});
		} else {
			logger.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
			return 'Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...';
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	}).then(function (response) {
		if (response.status === 'SUCCESS') {
			logger.info('Successfully sent transaction to the orderer.');
			return tx_id.getTransactionID();
		} else {
			logger.error('Failed to order the transaction. Error code: ' + response.status);
			return 'Failed to order the transaction. Error code: ' + response.status;
		}
	}, function (err) {
		logger.error( true ? err.stack : err);
		return  true ? err.stack : err;
	});
};

exports.invokeChaincode = invokeChaincode;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var n = __webpack_require__(106)();
var hash = __webpack_require__(107);

module.exports.generateSupplementHash = generateSupplementHash;

function generateSupplementHash(employerEmail, supId, userName) {
      // console.log("the nonce is " + n());
      return hash.sha256().update(n() + employerEmail + supId + userName).digest('hex');
}

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("nonce");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = require("hash.js");

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(3);

var nodemailer = __webpack_require__(109);
var fileUtils = __webpack_require__(110);
var srvUtils = __webpack_require__(111);

exports.sendEmail = sendEmail;

/**
Sends an email and returns a Promise that it will be sent
**/
function sendEmail(receiverAddress, body) {

  return new Promise(function (resolve, reject) {
    var thePath = path.join(__dirname, '..', 'resources', 'emailCredentials');
    fileUtils.readFilePromise(thePath).then(function (_pass) {
      // console.log("pass" + pass);
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        //        service: 'gmail',
        host: 'localhost',
        port: '25',
        //      secure: false,
        tls: {
          rejectUnauthorized: false
        },
        auth: {
          //user: 'triantafyllou.ni@gmail.com',
          //pass: _pass
          user: 'user@mail.example.com',
          pass: 'pwd'
        }
      });

      console.log('Email Body ' + body);
      // setup email data with unicode symbols
      var mailOptions = {
        from: '"Diploma Supplement Service" <dss@aegean.gr>', // sender address
        to: receiverAddress, // list of receivers
        subject: 'A Diploma Supplement has been shared with you ', // Subject line
        text: body, //'Hello world ?', // plain text body
        html: body //Hello world ?</b>' // html body
      };
      transporter.sendMail(mailOptions).then(function (result) {
        console.log("mail sent");
        resolve(result);
      }).catch(function (err) {
        console.log(err);
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
};

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(4);
module.exports.readFilePromise = readFilePromise;

function readFilePromise(path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) {
        reject(err);
      } else {
        // console.log("the data is " + data);
        resolve(data);
      }
    });
  });
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serverInfo = {};

module.exports = serverInfo;

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ })
/******/ ]);