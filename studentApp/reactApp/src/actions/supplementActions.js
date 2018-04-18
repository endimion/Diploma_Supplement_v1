
import DS from "../assets/fakeDS"

import axios from "axios"
// ES6
import axiosRetry from 'axios-retry';
import {retryAxiosNtimes,retryAxiosNtimesPost} from './utils'


axiosRetry(axios, { retries: 3 });

export function  getSupplementsByEid(userEid, counter) {

   return  function(dispatch){
         dispatch({type: "GET_SUP"} );
         retryAxiosNtimes(4, 0, "/back/supplement/rest/view")
         .then(response =>{
               dispatch({type: "GET_SUP_FULLFILED",payload:JSON.parse(response.data)})
         })
         .catch(err=>{
            dispatch({type:"GET_SUP_REJECTED",payload:err});
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
   }
}





export function  removeSupplements() {
   return  function(dispatch){
         dispatch({type: "REMOVE_SUP_VIEW"} );
   }
}



export function  openShareByMail(supId) {
  return  function(dispatch){
     dispatch({type: "OPEN_SHARE_BY_MAIL"} );
      // console.log(supId)  ;
     $('#mailModal'+supId).modal('open');
  }
}

export function  shareByMail(_supId,_email) {
  return  function(dispatch){
  dispatch({type: "SHARE_SUP_STARTED"});
  let data = {email: _email, supId: _supId };
  retryAxiosNtimesPost(4,0,"/back/supplement/rest/inviteByMail",data)
     // axios.post("/back/supplement/rest/inviteByMail",data)
        .then(response =>{
          dispatch({type: "SHARE_SUP_FULLFILED"});
          // console.log('#modal'+_supId);
          $('#mailModal'+_supId).modal('close');
        })
        .catch(err=>{
          dispatch({type:"SHARE_SUP_REJECTED",payload:err.toString()})
        });
  }
}




export function  openShareByQR(supId) {
  return  function(dispatch){
     dispatch({type: "OPEN_SHARE_BY_QR"} );
      console.log(supId)  ;
     $('#qrModal'+supId).modal('open');
  }
}

export function  shareByQR(_supId,_email) {
  return  function(dispatch){
  dispatch({type: "SHARE_SUP_QR"});
      retryAxiosNtimesPost(4,0,"/back/supplement/rest/inviteByQR",{"supId":_supId, "email":_email})
       // axios.post("/back/supplement/rest/inviteByQR",{"supId":_supId, "email":_email})
        .then(response =>{
          // console.log(response);
          dispatch({type: "SHARE_SUP_QR_FULLFILED",
                    //payload:'<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>'
                      payload:response.data
                  });
        })
        .catch(err=>{
          dispatch({type:"SHARE_SUP_QR_REJECTED",payload:err.toString()})
        });
  }
}
