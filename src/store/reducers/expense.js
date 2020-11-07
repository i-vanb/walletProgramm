import {
    GET_EXPENSES,
    GET_ALL_EXPENSES,
    ADD_EXPENSE,
    CHANGE_EXPENSE_NAME,
    CHANGE_EXPENSE_SUM,
    CHANGE_EXPENSE_CATEGORY,
    DELETE_EXPENSE
} from "../types"

const initialState = []

export const expenseReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_EXPENSE:
            return [...state, action.payload]

        case CHANGE_EXPENSE_NAME:
            return state.map(i => i.id === action.payload.id
                ? ({...i, name:action.payload.name}) : i)

        case CHANGE_EXPENSE_SUM:
            return state.map(i => i.id === action.payload.id
            ? ({...i, sum:action.payload.sum}) : i)

        case CHANGE_EXPENSE_CATEGORY:
            return state.map(i => i.id === action.payload.id
                ? ({...i, category: action.payload.category}) : i)

        case GET_EXPENSES:
            state = action.payload
            return state

        case GET_ALL_EXPENSES:
            state = action.payload
            return state

        case DELETE_EXPENSE:
            return state.filter(i => i.id !== action.payload)

        default:
            return state
    }
}
