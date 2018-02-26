import axios from "axios"
// ES6
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export function requestPublication(university,universityId,email) {
    /*
    let universityName = req.body.uniName;
    let universityId = req.body.univId; //user univesrity ID (e.g. ge01117)
    let userEmail = req.body.email;

    */

    return  function(dispatch){
     console.log("wil dispatch");
     dispatch({type:"PUBLISH_MODAL_OPEN"});
     dispatch({type:"REQUEST_PUBLISH_SENT"});
    $('#modal1').modal('open');
     axios.post("/back/supplement/rest/request",{uniName:university,email:email,
                                          univId:universityId})
    .then(response =>{
       $('#modal1').modal('close');
       dispatch({type:"REQUEST_PUBLISH_FULLFILED",payload:response.data})
       dispatch({type:"PUBLISH_MODAL_CLOSE"});
     })
     .catch(err=>{
       dispatch({type:"REQUEST_PUBLISH_REJECTED",payload:err})
     });

   }
}


export function updateUnivId(universityId) {
     return {type:"UPDATE_UNIVID" ,payload:universityId};
}

export function updateUniversity(university) {
     return {type:"UPDATE_UNINIVERSITY", payload:university};
}

export function updateEmail(mail) {
     return {type:"UPDATE_EMAIL",payload:mail};
}
