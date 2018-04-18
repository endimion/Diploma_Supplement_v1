export default function reducer(state={
  sideBarOpen:false
},action){

  switch(action.type){
    case "SIDE_BAR_OPEN":{

        return {...state, sideBarOpen:true}
    }
    case "SIDE_BAR_CLOSE":{
       
      return {...state, sideBarOpen:false}

    }
  }
  return state
}
