import {
    ADD_PERIOD,
    GET_PERIODS,
    DELETE_PERIOD
} from "../types"
import {DB} from "../../db"

export const addPeriod = name =>
    async dispatch => {
        const id = await DB.addPeriod(name)
        const payload = {
            id, name
        }
        dispatch({
            type: ADD_PERIOD,
            payload
        })
    }

export const getPeriods = () =>
    async dispatch => {
        const payload = await DB.getPeriods()
        dispatch({
            type: GET_PERIODS,
            payload
        })
    }

export const deletePeriod = id =>
    async dispatch => {
        await DB.deletePeriod(id)
        dispatch({
            type: DELETE_PERIOD,
            payload: parseInt(id)
        })
    }


