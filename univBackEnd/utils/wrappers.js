
const UNIVERSITY = process.env.UNIVERSITY||"UAgean";



module.exports.wrapDbResToProto = function(ds){

  let HolderInfo = {
    StudentId: ds.Holder_Info.StudentId,
    DateOfBirth: ds.Holder_Info.DateOfBirth,
    Name: ds.Holder_Info.Name
  };
  let QualificationInfo ={
    InstructionLanguage:ds.Qualification_Info.InstructionLanguage,
    InstitutionStatus:ds.Qualification_Info.InstitutionStatus,
    InstitutionName:ds.Qualification_Info.InstitutionName,
    FieldsOfStudy:ds.Qualification_Info.FieldsOfStudy,
    Name:ds.Qualification_Info.Name
  };

  let QualificationLevel={
    Level: ds.Qualification_Level.Level,
    ProgrammeLength: ds.Qualification_Level.ProgrammeLength,
    AccecssRequirements: ds.Qualification_Level.AccecssRequirements
  };



let modules = [];
  console.log(ds.Content_Info.ProgrammeDetails.Modules);
  ds.Content_Info.ProgrammeDetails.Modules.forEach(mod =>{
    modules.push({
      ModuleCode :mod.ModuleCode,
      NameOfTheModule: mod.NameOfTheModule,
      TypeOfModule: mod.TypeOfModule,
      ExamPeriod: mod.ExamPeriod,
      Grade: mod.Grade,
      InWriting: mod.InWriting
    });
  });

  let programmeDetail ={
    Description : ds.Content_Info.ProgrammeDetails.Description,
    Modules: modules,
    Legend: ds.Content_Info.ProgrammeDetails.Legend
  }
// console.log("modules!!!!");
// console.log(modules);
// console.log("programmeDetail!!!!");
// console.log(programmeDetail);
  let ContentInfo ={
    ModeOfStudy: ds.Content_Info.ModeOfStudy,
    ProgrammeRequirements: ds.Content_Info.ProgrammeRequirements,
    ProgrammeDetails: programmeDetail,
    GradingScheme: ds.Content_Info.GradingScheme,
    OverallClassificationOfQualification: ds.Content_Info.OverallClassificationOfQualification
  };



  let QualificationFunction ={
    AccessToFurtherStudy: ds.Qualification_Function.AccessToFurtherStudy,
    ProfessionalStatus: ds.Qualification_Function.ProfessionalStatus
  }

  let AdditionalInfo ={
    AdditionalInfo : ds.Additional_Info.AdditionalInfo,
    InfoSources: ds.Additional_Info.InfoSources
  }
  let SupplementCertification={
    Date: ds.Supplement_Certification.Date,
    Name : ds.Supplement_Certification.Name,
    Capacity:ds.Supplement_Certification.Capacity,
    Signature:ds.Supplement_Certification.Signature,
    Stamp:ds.Supplement_Certification.Stamp
  }

  let HigherEducationSystemInfo={
    HigherEducationSystem_Info : ds.HigherEducationSystem_Info.HigherEducationSystem_Info
  }

  // console.log("ContentInfo.ProgrammeDetails!!!!!!!!!!!!!");
  // console.log(ContentInfo.ProgrammeDetails);

  return {
    university: UNIVERSITY,
    Holder_Info: HolderInfo,
    Qualification_Info: QualificationInfo,
    Qualification_Level :QualificationLevel,
    Content_Info : ContentInfo,
    Qualification_Function: QualificationFunction,
    Additional_Info: AdditionalInfo,
    Supplement_Certification : SupplementCertification,
    HigherEducationSystem_Info: HigherEducationSystemInfo,
    id: ds._id.valueOf().toString()
  }


};
