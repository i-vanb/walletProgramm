import {
    GET_REPORT_PERIOD,
    GET_REPORT_INCOMES
} from "../types"

const initialState = {
    categories: {}, incomes: {}
}

export const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT_PERIOD:
            state = {...state, categories: {...state.categories, ...action.payload}}
            return state

        case GET_REPORT_INCOMES:
            state = {...state, incomes: {...state.incomes, ...action.payload}}
            return state

        default:
            return state
    }
}
