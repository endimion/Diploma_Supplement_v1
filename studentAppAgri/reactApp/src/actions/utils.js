import axios from "axios"
import axiosRetry from 'axios-retry';


axiosRetry(axios, { retries: 3 });

export function retryAxiosNtimes(times, counter, url){
  const config = {
    headers: { Pragma: 'no-cache'},
  }
    return new Promise( (resolve,reject) => {
      axios.get(url,config)
      .then(response =>{
        resolve(response);
      })
      .catch(err => {
          if(counter < times){
              counter++;
              console.log("will try again " + counter);
              sleep(1000)
              .then( () => {resolve(retryAxiosNtimes(times,counter,url));
                    });
          }else{
            console.log(`tried ${counter} times`);
            reject(err);
          }
    });
  });
}



export function retryAxiosNtimesPost(times, counter, url,data){
  const config = {
    headers: { Pragma: 'no-cache'},
  }
    return new Promise( (resolve,reject) => {
      axios.post(url,data,config)
      .then(response =>{
        resolve(response);
      })
      .catch(err => {
          if(counter < times){
              counter++;
              console.log("will try again " + counter);
              sleep(1000)
              .then( () => {resolve(retryAxiosNtimes(times,counter,url));
                    });
          }else{
            console.log(`tried ${counter} times`);
            reject(err);
          }
    });
  });
}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
