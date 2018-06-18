package main

import (
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
	"strings"
)



//Adds a request by a user to the university to publish his DS
func (t *SimpleChaincode) RequestSupplementPublication(stub shim.ChaincodeStubInterface, args []string)  pb.Response {
		if len(args) != 7 {
			return SendErrorEvent(stub,"Incorrect number of arguments. Expecting 7, the first is the userEid")
		}

		userEid := args[0]
		//name,eid,uniId,email,userEid,university
		name := args[1]
		eid := args[2]
		uniId := args[3]
		email  := args[4]
		eidHash := args[5]
		university := args[6]

		//get the assets from the state
		assetBytes, err := stub.GetState("assets")
		if err != nil {
			return SendErrorEvent(stub,"Failed to get state for key \"assets\"")
		}
		//get the supplements from the assets
		assets := Assets{}
		json.Unmarshal([]byte(assetBytes), &assets)
		pubRequestsSlice := assets.PublishRequests


		isIssuedBySender  :=	( userEid == eid)
		if isIssuedBySender {
			request := PublishRequest{
				Name  : name,
				Eid : eid,
				Email : email,
				UniId : uniId,
				EidHash : eidHash,
				University : university }
			pubRequestsSlice = append(pubRequestsSlice,request)
			assets.PublishRequests = pubRequestsSlice

			//update the state with the new assets
			encodedAssets,err  := json.Marshal(assets)
			if err != nil {
				return SendErrorEvent(stub,"Could not Marshal Assets")
			}
			err = stub.PutState("assets", []byte(encodedAssets))
			if err != nil {
				SendErrorEvent(stub,"Could not put assets to state")
			}
			//Execution of chaincode finishe successfully
			SendSuccessEvent(stub,request,"Tx chaincode finished OK.")
		}else{
			SendErrorEvent(stub,"Could not put assets to state")
		}

		return shim.Success(nil)
	}


/*
  Puts a new DiplomaSupplement to the state
  args[0] the DiplomaSupplement JSON string

	Requires that there exist a PubRequest with
	(request.EidHash == suplement.Owner) &&
 	(request.University == suplement.University)
*/
func (t *SimpleChaincode) Publish(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 2 {
	return SendErrorEvent(stub,  "Incorrect number of arguments. Expecting 2. The DS JSON and UserEid"  )
	}
	//encode into a DiplomaSupplement strct the argument
	suplementString := args[0]
	userEid := args[1]
	suplement := DiplomaSupplement{}
	json.Unmarshal([]byte(suplementString), &suplement)


	// invokerId, _ := stub.GetCreator()
	isIssuedBySender  :=	( userEid == suplement.University)

	if isIssuedBySender{
			//get the assets from the state
			assetBytes, err := stub.GetState("assets")
			if err != nil {
				return SendErrorEvent(stub,"{\"Error\":\"Failed to get state for key \"assets\"}" )
			}
			assets := Assets{}
			json.Unmarshal([]byte(assetBytes), &assets)

			found := false
			index := -1
			pubRequestsSlice := assets.PublishRequests
			for indx, request := range pubRequestsSlice{
				if (request.EidHash == suplement.Owner) &&
				(request.University == suplement.University){
					found = true
					index = indx
					break
				}
			}
			if found {
				//apend the received supplement to the assets
				supplementSlice := assets.Supplements
				supplementSlice = append(supplementSlice,suplement)
				assets.Supplements = supplementSlice

				//remove the request from the pending requests
				pubRequestsSlice= RemoveFromReqSlice(pubRequestsSlice,index)
				assets.PublishRequests = pubRequestsSlice

				//update the state with the new assets
				encodedAssets,err  := json.Marshal(assets)
				if err != nil {
					return SendErrorEvent(stub, "Could not  marshal assets")
				}
				err = stub.PutState("assets", []byte(encodedAssets))
				if err != nil {
					return SendErrorEvent(stub,"Could not place assets back in the state" )
				}
				//Execution of chaincode finished successfully
				return SendSuccessEvent(stub,PublishRequest{},"Tx chaincode finished OK.")

			}else{
				return SendErrorEvent(stub,"No Publication Request Found for" + suplement.Owner + " \n " + suplement.University)
			}
		}else{
			return SendErrorEvent(stub," Identities not match, expecting " + suplement.University + " found " + userEid )
		}
		return shim.Success(nil)
}



		// Puts a new DSMAp to the state
		// args[0] the DSMAP  JSON string
		// Only a user that has the attribute typeOfUser = Student can invoke this transaction with success
		// and he has to be the owner of the supplment as that is identified by the DSId fieled of the DSMAP struct
		func (t *SimpleChaincode) AddDiplomaSupplementInvite(stub shim.ChaincodeStubInterface, args []string)  pb.Response {
			if len(args) != 2 {
				return SendErrorEvent(stub,"Incorrect number of arguments. Expecting 2. DSInvite and UserEid")
			}

			//encode into a DiplomaSupplementInvite from strct the argument
			dsinviteString := args[0]
			dsinvite := DiplomaSupplementInvite{}
			json.Unmarshal([]byte(dsinviteString), &dsinvite)
			senderEid := args[1]

			//
			// // Here the ABAC API is called to verify the attributes, only then will the new
			// // supplement be added
			// isUniversity, _ := stub.VerifyAttribute("typeOfUser", []byte("Student"))
			suplementId := dsinvite.DSId
			//
			//
			assetBytes, err := stub.GetState("assets")
			if err != nil {
				return SendErrorEvent(stub, "Error, Failed to get state for key \"assets\"" )
			}
			assets := Assets{}
			json.Unmarshal([]byte(assetBytes), &assets)
			//
			supplement, position := FindSupplementInSlice(assets.Supplements, suplementId)
			if position == -1{
				return SendErrorEvent(stub, "Error, No Supplement Found with the given ID:: " + suplementId + ".")
			}
			//
			// //check if the supplement is issued by the user sending the transaction
			// isIssuedBySender, _ := stub.VerifyAttribute("eID", []byte(supplement.Owner))
			//
			if senderEid == supplement.Owner{
			// 	//apend the received DiplomaSupplementInvite to the assets
				assets.DiplomaSupplementInvite[dsinvite.DSHash] = dsinvite
			//
			// 	//update the state with the new assets
				encodedAssets,err  := json.Marshal(assets)
				if err != nil {
					return SendErrorEvent(stub, "Error, Marshaling Assets" )
				}
				err = stub.PutState("assets", []byte(encodedAssets))
				if err != nil {
					return SendErrorEvent(stub,  "Error,putting assets back in state" )
				}
			// 	//Execution of chaincode finishe successfully
				return SendSuccessEvent(stub,PublishRequest{},"Tx chaincode finished OK.")
			}
			return shim.Success(nil)
		}



		/*
		Adds the given recepientEid (args[1]) as the the Recepient of the DiplomaSupplementInvite
		which is identified by the give DSHash (args[0]) and updates the authorized users of
		the actual diplpoma supplement
		*/
		func (t *SimpleChaincode) AddRecepientToDSInvite(stub shim.ChaincodeStubInterface, args []string) pb.Response {
			if len(args) != 3 {
				return SendErrorEvent(stub,"Wrong number of arguments, Expecting 3")
			}
			// //encode into a DiplomaSupplementInvite from strct the argument
			dsHash := args[0]
			recepientEid := args[1]
			emailedCode := args[2]
			//
			// //get the assets from the state
			assetBytes, err := stub.GetState("assets")
			if err != nil {
				return SendErrorEvent(stub,  "{ Error : Failed to get state for key assets }")
			}
			assets := Assets{}
			json.Unmarshal([]byte(assetBytes), &assets)
			//
			//find the DSInvite in the state
			dsInv,ok:= assets.DiplomaSupplementInvite[dsHash]
			if ok {
				if dsInv.Recipient != "" {
					return SendErrorEvent(stub, "Error, DiplomaSupplementInvite is already finalized! Cannot add new Recipient!")
				}else{
						if dsInv.Code != emailedCode {
							return SendErrorEvent(stub,  "Error, Wrong Authorization code!")
						}else{
								dsInv.Recipient = recepientEid
			// 					//update the assets and put them in the state
			// 					//update the DSInvite
								assets.DiplomaSupplementInvite[dsHash] = dsInv
			//
			// 					//update the actual supplement
								supplementSlice := assets.Supplements
								suplementId := dsInv.DSId
								supToUpdate , position := FindSupplementInSlice(supplementSlice, suplementId)
								if position == -1 {
									return SendErrorEvent(stub,"Error, No supplement found for the given ID::" +suplementId+".")
								}
								authorizedUserEntry  := AuthorizedUser{Email:dsInv.Email, Eid: recepientEid}
								supToUpdate.Authorized = append(supToUpdate.Authorized,authorizedUserEntry)
			// 					//delete the old version of the supplement
								supplementSlice = RemoveFromSupSlice(supplementSlice,position)
			// 					//add the new supplement
								supplementSlice = append(supplementSlice,supToUpdate)
								assets.Supplements = supplementSlice
			//
								encodedAssets,err  := json.Marshal(assets)
								if err != nil {
									return SendErrorEvent(stub,"Error, Marshaling assets")
								}
								err = stub.PutState("assets", []byte(encodedAssets))
								if err != nil {
									return SendErrorEvent(stub,"Error, putting assets")
								}
			// 					//Execution of chaincode finishe successfully
								return SendSuccessEvent(stub,PublishRequest{},"Tx chaincode finished OK.")
							}
						}
						}else{
							return SendErrorEvent(stub, "Error, No DiplomaSupplementInvite Found with the given hash " + dsHash)
						}
						return  shim.Success(nil)
					}


/*
generates a random string and adds it at the field of the DSInvite
*/
func (t *SimpleChaincode) AddCodeForDSInvite(stub shim.ChaincodeStubInterface, args []string) pb.Response {
		if len(args) != 2 {
			return SendErrorEvent(stub,"Incorrect number of arguments. Expecting 2")
		}
		dsHash := args[0]
		emailCode := args[1]
		// //get the assets from the state
		assetBytes, err := stub.GetState("assets")
		if err != nil {
			return SendErrorEvent(stub,"{Error : Failed to get state for key  assets}")
		}
		assets := Assets{}
		json.Unmarshal([]byte(assetBytes), &assets)
		//
		// //find the DSInvite in the state
		dsInv,ok:= assets.DiplomaSupplementInvite[dsHash]
		if ok {
		if dsInv.Recipient != "" {
			return SendErrorEvent(stub,"Error, DiplomaSupplementInvite is already finalized! Cannot add new Recipient!")
		}else{
			dsInv.Code = emailCode
		// //update the assets and put them in the state
		// //update the DSInvite
			assets.DiplomaSupplementInvite[dsHash] = dsInv
		//
			encodedAssets,err  := json.Marshal(assets)
			if err != nil {
				return SendErrorEvent(stub,"Error, encoding assets")
			}
			err = stub.PutState("assets", []byte(encodedAssets))
			if err != nil {
				return SendErrorEvent(stub,"Error,putting assets in state")
			}
		// //Execution of chaincode finishe successfully
		 	return SendSuccessEvent(stub,PublishRequest{},"Tx chaincode finished OK.")
			}
		}else{
			return SendErrorEvent(stub,"Error, No DiplomaSupplementInvite Found with the given hash " + dsHash )
		}
	return shim.Success(nil)
}


// Updates a DiplomaSupplement, passed by its id, (args[0]) such that
// it can be viewed by the user args[1]

/* @Deprecated */
func (t *SimpleChaincode) AddAuthorizedUser(stub shim.ChaincodeStubInterface, args []string) pb.Response {
			// if len(args) != 3 {
			// return SendErrorEvent(stub,"Incorrect number of arguments. Expecting 2")
			// }
			// //the DiplomaSupplement id
			// suplementId := args[0]
			// //the user that should be allowed to view the supplement
			// newUser := args[1]
			// email := args[2]
			//
			// //get the assets from the state
			// assetBytes, err := stub.GetState("assets")
			// if err != nil {
			// return SendErrorEvent(stub,"{\"Error\":\"Failed to get state for key \"assets\"}")
			// }
			// //get the supplements from the assets
			// assets := Assets{}
			// json.Unmarshal([]byte(assetBytes), &assets)
			// supplementSlice := assets.Supplements
			//
			// supToUpdate , position := FindSupplementInSlice(supplementSlice, suplementId)
			// if position == -1 {
			// return SendErrorEvent(stub,"No supplement found with the given ID " + suplementId)
			// }
			//
			//
			// // Here the ABAC API is called to verify the attributes, only then will the
			// // supplement be updated
			// isStudent, _ := stub.VerifyAttribute("typeOfUser", []byte("Student"))
			// isOwner, _ := stub.VerifyAttribute("eID", []byte(supToUpdate.Owner))
			//
			// if isStudent && isOwner{
			//
			// authorizedUserEntry := AuthorizedUser{Email: email, Eid : newUser }
			// supToUpdate.Authorized = append(supToUpdate.Authorized,authorizedUserEntry)
			//
			// //delete the old version of the supplement
			// supplementSlice = RemoveFromSupSlice(supplementSlice,position)
			// //add the new supplement
			// supplementSlice = append(supplementSlice,supToUpdate)
			//
			// assets.Supplements = supplementSlice
			//
			// //update the state with the new assets
			// encodedAssets,err  := json.Marshal(assets)
			// if err != nil {
			// 	return SendErrorEvent(stub,"Error Marshaling Assets")
			// }
			// err = stub.PutState("assets", []byte(encodedAssets))
			// if err != nil {
			// 	return SendErrorEvent(stub,"Error putting assets in state")
			// }
			// //Execution of chaincode finishe successfully
			// SendSuccessEvent(stub,PublishRequest{},"Tx chaincode finished OK.")
			// }
	return shim.Success(nil)
}


//takes as input the supplementID and
// a list of users that will be removed from the authorizedUsers
//of that supplement
func (t *SimpleChaincode) UninviteUsers(stub shim.ChaincodeStubInterface, args []string)  pb.Response {
		if len(args) != 3 {
			return SendErrorEvent(stub,"Incorrect number of arguments. Expecting 3")
		}
		// //the DiplomaSupplement id
		suplementId := args[0]
		emailsString := args[1]
		sender := args[2]

		emailsArray := strings.Split(emailsString,";")

		//
		//get the assets from the state
		assetBytes, err := stub.GetState("assets")
		if err != nil {
		return SendErrorEvent(stub,"Failed to get state for key \"assets\"")
		}
		//get the supplements from the assets
		assets := Assets{}
		json.Unmarshal([]byte(assetBytes), &assets)
		supplementSlice := assets.Supplements
		//
		supToUpdate , position := FindSupplementInSlice(supplementSlice, suplementId)
		if position == -1 {
			return SendErrorEvent(stub,"No supplement found with the given ID"+suplementId)
		}
		//
		// // Here the ABAC API is called to verify the attributes, only then will the
		// // supplement be updated
		// isStudent, _ := stub.VerifyAttribute("typeOfUser", []byte("Student"))
		// isOwner, _ := stub.VerifyAttribute("eID", []byte(supToUpdate.Owner))
		if supToUpdate.Owner == sender {
		// // authorizedUsers := supToUpdate.Authorized
		for _, mail := range emailsArray{
			for index, authUser := range supToUpdate.Authorized {
				if mail == authUser.Email {
					supToUpdate.Authorized = RemoveAuthUserFromSlice(supToUpdate.Authorized,index)
					break
				}
			}
		}
		// //delete the old version of the supplement
		supplementSlice = RemoveFromSupSlice(supplementSlice,position)
		// //add the new supplement
		supplementSlice = append(supplementSlice,supToUpdate)
		//
		assets.Supplements = supplementSlice
		//
		// //update the state with the new assets
		encodedAssets,err  := json.Marshal(assets)
		if err != nil {
			return SendErrorEvent(stub,"Error Marshaling Assets")
		}
		err = stub.PutState("assets", []byte(encodedAssets))
		if err != nil {
			return SendErrorEvent(stub,"Error putting assets")
		}
		// //Execution of chaincode finishe successfully
			return SendSuccessEvent(stub,PublishRequest{},"Tx chaincode finished OK.")
		}else{
			return SendErrorEvent(stub,"User not allowed to do this action")
		}
	return shim.Success(nil)
}
