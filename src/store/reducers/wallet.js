import {
    CHANGE_WALLET_SAVING,
    CHANGE_WALLET_SUM,
    GET_WALLET
} from "../types"

const initialState = {sum: 0, saving: 0}

export const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_WALLET_SUM:
            return {...state, ...action.payload}

        case CHANGE_WALLET_SAVING:
            return {...state, ...action.payload}

        case GET_WALLET:
            return state = action.payload

        default:
            return state
    }
}
