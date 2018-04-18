import axios from "axios"
// ES6
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });


import {retryAxiosNtimes,retryAxiosNtimesPost} from './utils'


export function addUserToRem(userEmail) {
    return {
        type: "ADD_USER_REM",
        payload: userEmail
      }
}

export function remUsers(supplementId,users) {
  return  function(dispatch){
     console.log("wil dispatch");
     dispatch({type:"MODAL_OPEN"});
     dispatch({type:"REM_USERS_SENT"});
     console.log("wil open");

     let data = {};
     data.supId = supplementId;
     data.emails = users;

    console.log(users);

    $('#modal1').modal('open');
    retryAxiosNtimesPost(4,0,"/back/supplement/rest/removeInvites",data)
     // axios.post("/back/supplement/rest/removeInvites",data)
     .then(response =>{
       dispatch({type:"REM_USERS_FULLFILED",payload:response.data})
       dispatch({type:"MODAL_CLOSE"});
        $('#modal1').modal('close');
     })
     .catch(err=>{
       dispatch({type:"REM_USERS_REJECTED",payload:err})
     });

   }
}
