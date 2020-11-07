import {
    GET_PLANS,
    ADD_PLAN,
    CHANGE_PLAN_NAME,
    CHANGE_PLAN_SUM,
    CHANGE_PLAN_CATEGORY,
    CHANGE_PLAN_DEADLINE,
    DELETE_PLAN
} from "../types"

const initialState = []

export const planReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_PLAN:
            return [...state, action.payload]

        case CHANGE_PLAN_NAME:
            return state.map(i => i.id === action.payload.id
                ? ({...i, name:action.payload.name}) : i)

        case CHANGE_PLAN_SUM:
            return state.map(i => i.id === action.payload.id
            ? ({...i, sum:action.payload.sum}) : i)

        case CHANGE_PLAN_CATEGORY:
            return state.map(i => i.id === action.payload.id
                ? ({...i, category:action.payload.category}) : i)

        case CHANGE_PLAN_DEADLINE:
            return state.map(i => i.id === action.payload.id
                ? ({...i, deadline:action.payload.deadline}) : i)

        case GET_PLANS:
            state = action.payload
            return state

        case DELETE_PLAN:
            return state.filter(i => i.id !== action.payload)

        default:
            return state
    }
}
