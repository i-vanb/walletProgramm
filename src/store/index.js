import {createStore, combineReducers, applyMiddleware} from "redux";
import {profileReducer} from "./reducers/profile";
import thunk from "redux-thunk";
import {periodsReducer} from "./reducers/period";

const rootReducer = combineReducers({
    profile: profileReducer, period: periodsReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
