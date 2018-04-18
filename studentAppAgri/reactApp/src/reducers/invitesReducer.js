export default function reducer(state={
  supplements:[],
  invite:null,
  error:null,
  fetching:false,
  message:"",
  validate:false,
  code:""
},action){

  switch(action.type){
    case "GET_INV":{
        return {...state, fetching: true, message:"Fetching Invite..."}
    }
    case "GET_INV_FULLFILED":{
        return {...state, fetching: false, invite:action.payload, message:""}
    }
    case "GET_INV_SUP":{
       return {...state, fetching: true,message:"Fetching supplement..."}
    }
    case "GET_INV_SUP_FULLFILED":{
      return {...state, fetching: false, message:"",
              supplements: [...state.supplements,action.payload] }
    }
    case "SEND_VAL_CODE":{
      return {...state, fetching: true, message:"Sending Validation code..."}
    }
    case "SEND_VAL_CODE_FULLFILED":{
      return {...state, fetching: false,message:"",validate:true}
    }
    case "GET_INV_REJECTED":{
      return {...state, fetching: false,message:"",validate:false,error:action.payload}
    }
    case "UPDATE_CODE":{
      return {...state, code:action.payload}
    }
    case "SEND_UPDATE_CODE":{
      return {...state, fetching:true,mesage:"Validating Invitation..."}
    }
  }
  return state
}
