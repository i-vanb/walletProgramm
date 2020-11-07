import {
    CHANGE_WALLET_SAVING,
    CHANGE_WALLET_SUM,
    GET_WALLET
} from "../types"
import {DB} from "../../db"

export const changeWalletSum = (sum) =>
    async dispatch => {
        await DB.changeWalletSum(parseFloat(sum))
        console.log('changeWalletSum', sum)
        dispatch({
            type: CHANGE_WALLET_SUM,
            payload: {sum: parseFloat(sum)}
        })
    }

export const changeWalletSaving = (saving) =>
    async dispatch => {
        await DB.changeWalletSaving(parseFloat(saving))
        dispatch({
            type: CHANGE_WALLET_SAVING,
            payload: {saving: parseFloat(saving)}
        })
    }

export const getWallet = () =>
    async dispatch => {
        const payload = await DB.getWallet()
        dispatch({
            type: GET_WALLET,
            payload
        })
    }
