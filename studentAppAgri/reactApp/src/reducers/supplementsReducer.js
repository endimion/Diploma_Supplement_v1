export default function reducer(state={
  supplements:[],
  supError:null,
  fetching:false,
  sharing:false,
  shareError:null,
  sharingQR:false,
  shareErrorQR:null,
  QR:null,
  isUpdated:false
},action){

  switch(action.type){
    case "GET_SUP_FULLFILED":{
        return {...state, supplements:action.payload, fetching: false}
    }
    case "GET_SUP_REJECTED":{
      return {...state, supError:action.payload,fetching: false}
    }
    case "GET_SUP":{
        return {...state, fetching:true, isUpdated:true}
    }

    case "REMOVE_SUP_VIEW":{
      return {...state,isUpdated:false}
    }

    case "SHARE_SUP_FULLFILED":{
        return {...state,sharing:false,shareError:null}
    }
    case "SHARE_SUP_REJECTED":{
        return {...state,sharing:false,shareError:action.payload}
    }
    case "SHARE_SUP_STARTED":{
        return {...state,sharing:true,shareError:null}
    }
    case "OPEN_SHARE_BY_MAIL":{
        return {...state,sharing:false,shareError:null}
    }



    case "SHARE_SUP_QR_FULLFILED":{
        return {...state,sharingQR:false,shareErrorQR:null,QR: action.payload}
    }
    case "SHARE_SUP_QR_REJECTED":{
        return {...state,sharingQR:false,shareErrorQR:action.payload,QR:null}
    }
    case "SHARE_SUP_QR":{
        return {...state,sharingQR:true,shareQRErrorQR:null,QR:null}
    }
    case "OPEN_SHARE_BY_QR":{
        return {...state,sharingQR:false,shareErrorQR:null,QR:null}
    }


  }
  return state
}
