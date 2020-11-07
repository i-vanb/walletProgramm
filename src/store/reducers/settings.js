import {
    CHANGE_LANGUAGE,
    CHANGE_THEME,
    GET_SETTINGS
} from "../types"

const initialState = {theme: '', language: ''}

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {...state, ...action.payload}

        case CHANGE_THEME:
            return {...state, ...action.payload}

        case GET_SETTINGS:
            return state = action.payload

        default:
            return state
    }
}
