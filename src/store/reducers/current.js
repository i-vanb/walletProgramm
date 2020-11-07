import {
    INIT_CURRENT_PERIOD,
    ADD_CURRENT_CATEGORY,
    GET_CURRENT_PERIOD,
    CHANGE_CURRENT_CATEGORY_NAME,
    CHANGE_CURRENT_CATEGORY_PLAN,
    CHANGE_CURRENT_CATEGORY_FACT,
    DELETE_CURRENT_CATEGORY
} from "../types"

const initialState = []

export const currentReducer = (state = initialState, action) => {
    switch (action.type) {

        case INIT_CURRENT_PERIOD:
            return state

        case ADD_CURRENT_CATEGORY:
            return [...state, action.payload]

        case CHANGE_CURRENT_CATEGORY_NAME:
            return state.map(i => i.id === action.payload.id
                ? ({...i, name:action.payload.name}) : i)

        case CHANGE_CURRENT_CATEGORY_PLAN:
            return state.map(i => i.id === action.payload.id
                ? ({...i, plan:action.payload.plan}) : i)

        case CHANGE_CURRENT_CATEGORY_FACT:
            return state.map(i => i.id === action.payload.id
                ? ({...i, fact:action.payload.fact}) : i)

        case GET_CURRENT_PERIOD:
            state = action.payload
            return state

        case DELETE_CURRENT_CATEGORY:
            return state.filter(i => i.id !== action.payload)

        default:
            return state
    }
}
