
const ds = require('../model/DSModel.js');
const signServ = require("./SignService.js");
const DiplomaSupplement = ds.Schema;
// const conn = ds.connection;
const mongoose = require('mongoose');
/*
  Returns a promise
*/
module.exports.findAllDiplomaByCriterria = function(criteria){
  console.log("will query " );
  console.log(criteria);
  console.log("By " + criteria)  ;
  return DiplomaSupplement.find({
    'Holder_Info.StudentId':criteria.UniId,
    'Holder_Info.Name':criteria.Name,
    'Holder_Info.DateOfBirth':criteria.DateOfBirth
  }).exec();
};


module.exports.saveDipSup = function(diplomaSupplement){

}


module.exports.saveTestDS = function(){
  let testDS = new  DiplomaSupplement({
    name: 'testName2',
    uniId: 'testUniId',
    surname: 'surname',
    university: 'testUniversity',
    _id:  new mongoose.Types.ObjectId
  });

  console.log("will attempt to save");
  console.log(testDS);

  testDS.save(function(err) {
    if (err){console.log(err)}
    console.log('User created!');
  });

};
