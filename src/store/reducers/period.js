import {
    ADD_PERIOD,
    GET_PERIODS,
    DELETE_PERIOD
} from "../types"

const initialState = []

export const periodReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PERIOD:
            return [...state, action.payload]

        case GET_PERIODS:
            state = action.payload
            return state

        case DELETE_PERIOD:
            return state.filter(i => i.id !== action.payload)

        default:
            return state
    }
}
