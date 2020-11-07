import {
    GET_INCOMES,
    GET_ALL_INCOMES,
    ADD_INCOME,
    CHANGE_INCOME_NAME,
    CHANGE_INCOME_SUM,
    DELETE_INCOME
} from "../types"

const initialState = []

export const incomeReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_INCOME:
            return [...state, action.payload]

        case CHANGE_INCOME_NAME:
            return state.map(i => i.id === action.payload.id
                ? ({...i, name:action.payload.name}) : i)

        case CHANGE_INCOME_SUM:
            return state.map(i => i.id === action.payload.id
            ? ({...i, sum:action.payload.sum}) : i)

        case GET_INCOMES:
            state = action.payload
            return state

        case GET_ALL_INCOMES:
            state = action.payload
            return state

        case DELETE_INCOME:
            return state.filter(i => i.id !== action.payload)

        default:
            return state
    }
}
