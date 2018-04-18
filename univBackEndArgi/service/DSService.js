
const ds = require('../model/DSModel.js');
const DiplomaSupplement = ds.Schema;
// const conn = ds.connection;
const mongoose = require('mongoose');
const utf8 = require('utf8');

/*
  Returns a promise
*/
module.exports.findAllDiplomaByCriterria = function(criteria){
  console.log("will query " );
  console.log(criteria);
  console.log("By " + criteria, utf8.decode(criteria.Name))  ;
  return DiplomaSupplement.find({
    'Holder_Info.StudentId':criteria.UniId,
    'Holder_Info.Name':utf8.decode(criteria.Name),
    'Holder_Info.DateOfBirth':criteria.DateOfBirth
  }).exec();
};
