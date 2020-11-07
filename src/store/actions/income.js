import {
    GET_INCOMES,
    GET_ALL_INCOMES,
    ADD_INCOME,
    CHANGE_INCOME_NAME,
    CHANGE_INCOME_SUM,
    DELETE_INCOME
} from "../types"
import {DB} from "../../db"

export const addIncome = (name, sum, date, period) =>
    async dispatch => {
        const id = await DB.addIncome(name, sum, date, period)
        const payload = {
            id, name, sum: parseFloat(sum), date, period
        }
        console.log('payload',payload)
        dispatch({
            type: ADD_INCOME,
            payload
        })
    }

export const changeIncomeName = (id, name) =>
    async dispatch => {
        await DB.changeIncomeName(id, name)
        dispatch({
            type: CHANGE_INCOME_NAME,
            payload: {id: parseInt(id), name}
        })
    }

export const changeIncomeSum = (id, sum) =>
    async dispatch => {
        await DB.changeIncomeSum(id, sum)
        dispatch({
            type: CHANGE_INCOME_SUM,
            payload: {
                id: parseInt(id),
                sum: parseFloat(sum)
            }
        })
    }

export const getIncomes = period =>
    async dispatch => {
        const payload = await DB.getIncomes(period)
        dispatch({
            type: GET_INCOMES,
            payload
        })
    }

export const getAllIncomes = () =>
    async dispatch => {
        const payload = await DB.getAllIncomes()
        dispatch({
            type: GET_ALL_INCOMES,
            payload
        })
    }

export const deleteIncome = id =>
    async dispatch => {
        await DB.deleteIncome(id)
        dispatch({
            type: DELETE_INCOME,
            payload: parseInt(id)
        })
    }






