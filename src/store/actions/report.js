import {
    GET_REPORT_PERIOD,
    GET_REPORT_INCOMES
} from "../types"
import {DB} from "../../db"


export const getReportPeriod = name =>
    async dispatch => {
        const payload = await DB.getReportPeriod(name)
        dispatch({
            type: GET_REPORT_PERIOD,
            payload: {[name]: payload}
        })
    }

export const getReportIncomes = period =>
    async dispatch => {
        const payload = await DB.getIncomes(period)
        dispatch({
            type: GET_REPORT_INCOMES,
            payload: {[period]: payload}}
        )
    }


