const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let location = process.env.mongoURL||'localhost';
let connection = mongoose.connect("mongodb://"+location+'/dipSup', {
  useMongoClient: true,
  /* other options */
});
mongoose.Promise = Promise;


let dsSchema = new Schema({
  // uniId : String,
	// name: String,
	// surname: String,
  university: String,
  Holder_Info:{
    Name:String,
    DateOfBirth:String,
    StudentId:String,
    PlaceOfBirth:String
  },
  Qualification_Info:{
      Name:String,
      FieldsOfStudy:String,
      InstitutionName:String,
      InstitutionStatus:String,
      InstructionLanguage:String
  },
  Qualification_Level:{
    Level:String,
    ProgrammeLength:String,
    AccecssRequirements:String
  },
  Content_Info:{
    ModeOfStudy:String,
    ProgrammeRequirements:String,
    ProgrammeDetails: {
      Description : String,
      Modules : [{
          ModuleCode :String,
          NameOfTheModule: String,
          TypeOfModule: String,
          ExamPeriod: String,
          Grade: String,
          InWriting: String
      }],
      Legend : String
    },
    GradingScheme:String,
    OverallClassificationOfQualification:String
  },
  Qualification_Function:{
    AccessToFurtherStudy:String,
    ProfessionalStatus:String
  },
  Additional_Info:{
    AdditionalInfo:String,
    InfoSources:String
  },
  Supplement_Certification:{
    Date:String,
    Name:String,
    Capacity:String,
    Signature:String,
    Stamp:String
  },
  HigherEducationSystem_Info: {
    HigherEductaionSystemInfo:String
  },
  _id: Schema.Types.ObjectId
});




let DiplomaSupplement = connection.model('DiplomaSupplement', dsSchema,'diplomasupplements');

// make this available to our users in our Node applications
module.exports.Schema = DiplomaSupplement;
module.exports.connection = connection;
