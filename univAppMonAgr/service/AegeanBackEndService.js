

const PROTO_PATH = __dirname + '/../protos/ds_backend_service.proto';
const BACK_END = process.env.BACK_END||"localhost";
const BACK_END_PORT=process.env.BACK_END_PORT||"50051";
const grpc = require('grpc');
const dsBackend = grpc.load(PROTO_PATH).dsbackend;
let client = new dsBackend.DsBackend(BACK_END+":"+BACK_END_PORT,
                                       grpc.credentials.createInsecure());


module.exports.findAllDiplomaByCriterria = function(criteria){
  console.log("Sending query to backend");
  console.log(criteria);
  let results = [];
  return new Promise((resolve, reject) => {
      let call = client.getDiplomaSupplements(criteria);
      call.on('data', function(ds) {
        console.log("received DS");
        console.log(ds);
        results.push(ds);
      });
      call.on('end',function(){
        console.log(results);
        resolve(results);
      });
  });
}
