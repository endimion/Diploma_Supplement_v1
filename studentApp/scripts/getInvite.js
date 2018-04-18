"use strict";

$( document ).ready(function() {

    let invHash = $("#invHash").text();

    $.get("/supplement/rest/invite/"+invHash)
      .then(resp =>{
        let invite = JSON.parse(resp);
        // console.log(invite);
        $("#meassageDiv").text("Checking constraints...");
        console.log("invite ");
        console.log(invite);
        if(invite.Recipient !== ""){
          $.get("/supplement/rest/view/"+invite.DSId).done(resp=>{
              makeSupplementCard(JSON.parse(resp),false);
          }).fail(err =>{
            $("#headerMessage").text("UnAuthorized Access!");
            $("#supPreloader").hide();
            console.log(err);
          });
        }else{
            $("#meassageDiv").text("Sending validation Code...");
            genValidationCode(invHash);
        }
       });
});


function genValidationCode(invHash){
  $.post("/supplement/rest/invite/"+invHash+"/sendMail")
  .done(resp =>{
      console.log(resp);
       generateValidationForm(invHash);
  }).fail(err =>{
      $("#headerMessage").text("validation failed");
      console.log(err);
  });
}


function generateValidationForm(invHash){
    $("#supPreloader").hide();
    let form  = $("<form>",{"action":"/supplement/invite/"+invHash+"/authorize"});
    let formGroup = $("<div>",{"class":"form-group"});
    let label = $("<label>",{"for":"validationCode"});
    label.text("Validation Code:");
    formGroup.append(label);
    let codeInput = $("<input>",{"class":"form-control","type":"text","name":"validationCode","id":"validationCode"});
    formGroup.append(codeInput);
    let hash = $("<input>",{"class":"form-control","type":"hidden","name":"hash","id":"hash","value":invHash});
    formGroup.append(hash);

    let validate = $("<a>",{"class":"waves-effect waves-green btn-flat","onclick":'validateDS()'});
    validate.text("Validate");
    formGroup.append(validate);

    form.append(formGroup);
    $("#validationForm").append(form);
}


function validateDS(){
  let code = $("#validationCode").val();
  let inviteHash = $("#hash").val();
  $("#supPreloader").show();
  $.post("/supplement/rest/invite/"+inviteHash+"/authorize",{inviteHash:inviteHash,validationCode:code}).then(resp =>{
    console.log(resp);
    console.log(resp.status);
    makeSupplementCard(JSON.parse(resp),false);

  }).fail(err =>{
      $("#headerMessage").text("validation failed");
      // console.log(err);
  });
}
