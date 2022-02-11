import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  commercialListReducer,
  commercialDetailsReducer,
  commercialDeleteReducer,
  commercialCreateReducer,
  commercialUpdateReducer,
 
} from "./reducers/commercialReducers";

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";


const reducer = combineReducers({
  commercialList: commercialListReducer,
  commercialDetails: commercialDetailsReducer,
  commercialDelete: commercialDeleteReducer,
  commercialCreate: commercialCreateReducer,
  commercialUpdate: commercialUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
