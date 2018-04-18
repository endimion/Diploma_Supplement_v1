package main

import (
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
	)


/**
  Get all supplements that belong to a user submitting  the query
  If the user is a University all the supplements of teh University will be returned
  else, the supplements that denote him as the owner will only be returned
**/
func (t *SimpleChaincode) GetSupplements(stub shim.ChaincodeStubInterface, args []string) pb.Response {

  if len(args) != 1 {
    return shim.Error("Expectiong one argument! The userId")
  }

  userEid := args[0]

  //get all supplements from the state
  assetBytes, err := stub.GetState("assets")
  if err != nil {
    return shim.Error("{\"Error\":\"Failed to get state for key \"assets\"}")
  }
  res := Assets{}
  json.Unmarshal([]byte(assetBytes), &res)

  supps:= SupplementsAsset{Supplements:res.Supplements}
  matchingSupplements := make([]DiplomaSupplement,0)

  // v1.0 has not ABAC so we have to resolve to Identity based acecss control
  // invokerId,_ := stub.GetCreator() // this  returns the cerificate of the invoker
                                      // NOT usefull i think
                                      //TODO maybe add this as an extra security meassure

  for _,element := range supps.Supplements {
    // element is the element from someSlice for where we are
    if element.University == userEid  || element.Owner == userEid {
      matchingSupplements = append(matchingSupplements,element)
    }
  }
  encodedSupps,_ := json.Marshal(matchingSupplements)
  return shim.Success([]byte(encodedSupps))
}




	/**
			Get all the DiplomaSupplementInvites using its key (i.e. DS hash)
	**/
	func (t *SimpleChaincode) GetDiplomaSupplementInvitesByHash(stub shim.ChaincodeStubInterface, args []string) pb.Response {

		if len(args) != 1 {
			return shim.Error("Incorrect number of arguments. Expecting the hash of the diplomaSupplement")
		}
		dsHash := args[0]
		assetBytes, err := stub.GetState("assets")
		if err != nil {
			return shim.Error("{\"Error\":\"Failed to get state for key \"assets\"}")
		}
		res := Assets{}
		json.Unmarshal([]byte(assetBytes), &res)

		diplomaSupplementInvites:=res.DiplomaSupplementInvite
		result,ok := diplomaSupplementInvites[dsHash]
		if ok {
			encodedRes,_ := json.Marshal(result)
			return shim.Success([]byte(encodedRes))
			}else{
				return shim.Error("Could not find the requested ds hash")
			}
		}




    /**
    Get the supplement by the given id, if the user
    belongs to the Authorized Users for the supplemnt, or the user
    is the owner of the supplement
    **/
    func (t *SimpleChaincode) GetSupplementById(stub shim.ChaincodeStubInterface, args []string) pb.Response {

      if len(args) != 2 {
        return shim.Error("Incorrect number of arguments. Expecting the SupplementId and UserEid to query")
      }
      suplementId := args[0]
      userEid := args[1]

      assetBytes, err := stub.GetState("assets")
      if err != nil {
        return shim.Error("{\"Error\":\"Failed to get state for key \"assets\"}")
      }
      assets := Assets{}
      json.Unmarshal([]byte(assetBytes), &assets)

      supplement, position := FindSupplementInSlice(assets.Supplements, suplementId)
      if position == -1{
        return shim.Error("No Supplement Found with the given ID")
      }

      authorizedUsers   := supplement.Authorized
      isAllowed := false

      // v1.0 has not ABAC so we have to resolve to Identity based acecss control
      // eid, err := stub.GetCreator()
      // eidString := string(eid)

      if userEid == supplement.Owner{
        isAllowed = true
        }	else{
          for _,element := range authorizedUsers {
            // element is the element from someSlice for where we are
            if userEid == element.Eid {
              isAllowed = true
            }
          }
        }

        if isAllowed{
          encodedResult,err  := json.Marshal(supplement)
          if err != nil {
            return shim.Error("error marshalling supplement")
          }
          return shim.Success([]byte(encodedResult))
          }else{
            return shim.Error("User not Authorized to see this supplement")
          }
        }





  	/**
  			Get all the pendingn supplment request that are submitted to the
  			user eid invoking the transaction.
  		@Deprecated
  	**/
  	func (t *SimpleChaincode) GetPendingRequestByUniv(stub shim.ChaincodeStubInterface, args []string) pb.Response{
  		if len(args) != 1 {
  			return shim.Error("Incorrect number of arguments. Expecting 1, the userEid")
  		}
  		userEid := args[0]
  		// eid, err := stub.GetCreator()
  		// universityEid := string(eid)

  		assetBytes, err := stub.GetState("assets")
  		if err != nil {
  			return shim.Error("{\"Error\":\"Failed to get state for key \"assets\"}")
  		}
  		assets := Assets{}
  		json.Unmarshal([]byte(assetBytes), &assets)

  		matchingPendingRequests := make([]PublishRequest,0)
  		pendingReq := assets.PublishRequests
  		//fill the matching Requests
  		for _,request := range pendingReq {
  			if request.UniId == userEid {
  				matchingPendingRequests = append(matchingPendingRequests,request)
  			}
  		}
  		encodedRes,_ := json.Marshal(matchingPendingRequests)
  		return shim.Success([]byte(encodedRes))
    }
