"use strict";


function requestPublication(evt){
  evt.preventDefault();
  let universityName = $("#uniName").val();
  let universityId = $("#uniId").val();
  let email = $("#email").val();
  let date = $("#DateOfBirth").val();

  $("form").hide();
  $("#preloader").show();

  $.post("/supplement/rest/request",{uniName:universityName,email:email, univId:universityId, dateOfBirth:date})
  .then(resp =>{
      console.log(resp);
      window.location.href="/home" ;
  }).fail(err =>{
     console.log(err);
      $("#headerMessage").text("Request failed");
  });
}
