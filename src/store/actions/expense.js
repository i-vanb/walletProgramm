import {
    GET_EXPENSES,
    GET_ALL_EXPENSES,
    ADD_EXPENSE,
    CHANGE_EXPENSE_NAME,
    CHANGE_EXPENSE_SUM,
    CHANGE_EXPENSE_CATEGORY,
    DELETE_EXPENSE
} from "../types"
import {DB} from "../../db"

export const addExpense = (name, sum, date, period, category) =>
    async dispatch => {
        const id = await DB.addExpense(name, sum, date, period, category)
        const payload = {
            id, name, sum: parseFloat(sum), date, period, category
        }
        dispatch({
            type: ADD_EXPENSE,
            payload
        })
    }

export const changeExpenseName = (id, name) =>
    async dispatch => {
        await DB.changeExpenseName(id, name)
        dispatch({
            type: CHANGE_EXPENSE_NAME,
            payload: {id: parseInt(id), name}
        })
    }

export const changeExpenseSum = (id, sum) =>
    async dispatch => {
        await DB.changeExpenseSum(id, sum)
        dispatch({
            type: CHANGE_EXPENSE_SUM,
            payload: {
                id: parseInt(id),
                sum: parseFloat(sum)
            }
        })
    }

export const changeExpenseCategory = (id, category) =>
    async dispatch => {
        await DB.changeExpenseCategory(id, category)
        dispatch({
            type: CHANGE_EXPENSE_CATEGORY,
            payload: {id: parseInt(id), category}
        })
    }

export const getExpense = period =>
    async dispatch => {
        const payload = await DB.getExpenses(period)
        dispatch({
            type: GET_EXPENSES,
            payload
        })
    }

export const getAllExpenses = () =>
    async dispatch => {
        const payload = await DB.getAllExpenses()
        dispatch({
            type: GET_ALL_EXPENSES,
            payload
        })
    }

export const deleteExpense = id =>
    async dispatch => {
        await DB.deleteExpense(id)
        dispatch({
            type: DELETE_EXPENSE,
            payload: parseInt(id)
        })
    }






