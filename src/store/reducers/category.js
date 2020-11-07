import {
    ADD_CATEGORY,
    CHANGE_CATEGORY_NAME,
    CHANGE_CATEGORY_SUM,
    GET_CATEGORIES,
    DELETE_CATEGORY
} from "../types"

const initialState = []

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_CATEGORY:
            return [...state, action.payload]

        case CHANGE_CATEGORY_NAME:
            return state.map(i => i.id === action.payload.id
                ? ({...i, name:action.payload.name}) : i)

        case CHANGE_CATEGORY_SUM:
            return state.map(i => i.id === action.payload.id
            ? ({...i, sum:action.payload.sum}) : i)

        case GET_CATEGORIES:
            state = action.payload
            return state

        case DELETE_CATEGORY:
            return state.filter(i => i.id !== action.payload)

        default:
            return state
    }
}
