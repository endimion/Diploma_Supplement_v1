"use strict";


function requestPublication(evt){
  evt.preventDefault();
  let universityName = $("#uniName").val();
  let universityId = $("#uniId").val();
  let email = $("#email").val();
  let date = $("#DateOfBirth").val();

  $("form").hide();
  $("#preloader").show();

  let requestPub = function(){
    $.post("/supplement/rest/request",{uniName:universityName,email:email, univId:universityId, dateOfBirth:date})
    .then(resp =>{
      if(typeof(resp) === "string"
          && (resp.indexOf("Timeout") >= 0 || resp.indexOf("Endpoint read failed") >= 0 )){
          requestPub();
      }else{
        console.log(resp);
        window.location.href="/home" ;
      }
    }).fail(err =>{
       console.log(err);
        $("#headerMessage").text("Request failed");
    });
  };

  requestPub();
}
