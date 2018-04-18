export default function reducer(state={
  usersToRem:[],
  removingUser:false,
  removedUser: false,
  remError: null,
  modal:false
},action){

  switch(action.type){
    case "ADD_USER_REM":{
        return {...state, usersToRem : [...state.usersToRem,action.payload]}
    }
    case "REM_USERS_SENT":{
      return {...state, removingUser:true}

    }
    case "REM_USERS_FULLFILED":{
      return {...state, removingUser:false,removedUser:true,usersToRem:[]}
    }
    case "REM_USERS_REJECTED":{
      return {...state, removingUser:false,removedUser:true,remError:action.payload}
     }
    case "MODAL_OPEN":{
      return {...state,modal:true}
    }
    case "MODAL_CLOSE":{
      return {...state,modal:false}
    }

  }
  return state
}
