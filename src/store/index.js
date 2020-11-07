import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {categoryReducer} from "./reducers/category";
import {periodReducer} from "./reducers/period";
import {walletReducer} from "./reducers/wallet";
import {incomeReducer} from "./reducers/income";
import {expenseReducer} from "./reducers/expense";
import {planReducer} from "./reducers/plan";
import {currentReducer} from "./reducers/current";
import {settingsReducer} from "./reducers/settings";
import {reportReducer} from "./reducers/report";

const rootReducer = combineReducers({
    category: categoryReducer,
    period: periodReducer,
    wallet: walletReducer,
    income: incomeReducer,
    expense: expenseReducer,
    plan: planReducer,
    current: currentReducer,
    settings: settingsReducer,
    report: reportReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
