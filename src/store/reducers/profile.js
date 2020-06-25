import {LOAD_PROFILE, UPDATE_PROFILE, CREATE_PROFILE, DELETE_PROFILE} from "../types"

const initialState = {
    user: {}, loading: true
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            if(!action.payload) {
                return {...state, loading: false}
            }
            return {
                ...state,
                user: action.payload,
                loading: false
            }

        case UPDATE_PROFILE:
            return {
                ...state,
                user: action.payload
            }

        case CREATE_PROFILE:
            return {
                ...state,
                user: action.payload
            }

        case DELETE_PROFILE:
            return {
                ...state,
                user: {}
            }

        default:
            return state
    }
}
