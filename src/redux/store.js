import { legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as AuthReducer } from "./authentication/reducer";

export const store = legacy_createStore(AuthReducer, applyMiddleware(thunk));
