import {combineReducers} from "redux"

// import tweets from "./tweetReducer"
import user from "./userReducer"
// import sideNav from "./sideNavReducer"
import sups from "./supplementsReducer"
import edit from "./editSupReducer"
import publish from "./requestPubReducer"

export default combineReducers({
                  user,
                  sups,
                  edit,
                  publish
})