export default function reducer(state={
    timeOutMinutes: 2,
    timeOutSeconds: 59,
    startHour: null,//(new Date()).getHours(),
    startMinutes:null ,//(new Date()).getMinutes(),
    startSeconds: null//(new Date()).getSeconds()
},action){

  const maxMinutes = process.env.SESSION_TIMEOUT|2;

  switch(action.type){

    case "REDUCE_SECOND":{
        let date =  new Date();
        let secs = date.getSeconds();
        let mins = date.getMinutes();
        let hours = date.getHours();

        // start = 17.26:15   now = 17.28.01 ||  now= 28*360+01 = 10081, start= 26*360 +15=9375    minPassed = Math.floor(10140 -10260 ) / 360)
        // start = 17.59:01 now 18.00.10    ||             minDiff => 60 + 00 - 59 = 1, secDiff =>

        let startTimestamp = state.startHour*3600 + state.startMinutes*60 + state.startSeconds;
        let nowTimestamp =  hours*3600 + mins*60 +secs;

         let timePassed =  nowTimestamp - startTimestamp;
         console.log(" -------------  ");
         console.log("hours", Math.floor(timePassed/3600));
         console.log("minutes",Math.floor(timePassed/60) );
         console.log("seconds",Math.floor(timePassed) );
         console.log(" ------**-----  ");
         if(Math.floor(timePassed/3600) != 0 ||  //if more than 0 hours have passed expired clock
            Math.floor(timePassed/60) > maxMinutes   ){ //if more than MAX minutes have passed expired clock
            return  {...state, timeOutMinutes:0, timeOutSeconds:0}
         }


        if(state.timeOutSeconds == 0){
          return  {...state,timeOutMinutes: maxMinutes - Math.floor(timePassed/60) , timeOutSeconds:59}//{...state, timeOutMinutes:state.timeOutMinutes-1, timeOutSeconds:59}
        }else{
            return  {...state,timeOutMinutes: maxMinutes - Math.floor(timePassed/60), timeOutSeconds:state.timeOutSeconds-1}//{...state, timeOutMinutes:state.timeOutMinutes, timeOutSeconds:state.timeOutSeconds-1}
        }
    }
    case "RESTART_CLOCK":{
      return {...state,   timeOutMinutes: maxMinutes, timeOutSeconds: 59,startHour: (new Date()).getHours(), startMinutes: (new Date()).getMinutes(), startSeconds: (new Date()).getSeconds() }
    }



  }
  return state
}
