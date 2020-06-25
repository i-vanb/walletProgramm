import {
    CREATE_EXPENSE,
    CREATE_INCOME,
    CREATE_PERIOD,
    END_PERIOD, LOAD_CURRENT_DATA,
    LOAD_EXPENSES,
    LOAD_INCOMES,
    LOAD_PERIODS, MAKE_EXPENSE
} from "../types"
import {DB} from "../../db"

export const createPeriod = ({name, dateS, monthS, yearS, dateF, monthF, yearF}) =>
    async dispatch => {
        await DB.createPeriod({name, dateS, monthS, yearS, dateF, monthF, yearF})
        dispatch({
            type: CREATE_PERIOD,
            payload: {name, dateS, monthS, yearS, dateF, monthF, yearF}
        })
    }

export const endPeriod = id =>
    async dispatch => {
        await DB.finishPeriod(id)
        dispatch({
            type: END_PERIOD,
            payload: id
        })
    }

export const loadPeriods = () =>
    async dispatch => {
        const payload = await DB.getPeriods()
        dispatch({
            type: LOAD_PERIODS,
            payload
        })
    }

export const getCurrentData = () =>
    async dispatch => {
        const period = await DB.getLastPeriod()
        const name = period[0].name
        const expenses = await DB.getExpense('expense_' + name)
        const incomes = await DB.getIncomes('income_' + name)
        dispatch({
            type: LOAD_CURRENT_DATA,
            payload: {
                period, expenses: {[name]: expenses}, incomes: {[name]: incomes}
            }
        })

    }

export const initExpenses = (name) =>
    async dispatch => {
        await DB.initExpenses('expense_' + name)
        dispatch({
            type: CREATE_EXPENSE,
            payload: name
        })
    }

export const loadExpenses = (name) =>
    async dispatch => {
        const expenses = await DB.getExpense('expense_' + name)
        dispatch({
            type: LOAD_EXPENSES,
            payload: {
                [name]: expenses
            }
        })
    }

export const makeExpense = (tableName, category, name, sum) =>
    async dispatch => {
        let table = 'expense_' + tableName
        await DB.createExpense(table, category, name, sum)
        dispatch({
            type: MAKE_EXPENSE,
            payload: {tableName, category, name, sum}
        })
    }

export const makeIncome = (tableName, name, sum, date) =>
    async dispatch => {
        if (!date) {
            let now = new Date()
            let currentDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
            date = Date.parse(currentDate.toLocaleString())
        }
        const payload = {
            table: 'income_' + tableName,
            name: name || 'income',
            sum,
            date
        }
        await DB.createIncome(payload)
        dispatch({
            type: MAKE_EXPENSE,
            payload
        })
    }


export const initIncomes = (name) =>
    async dispatch => {
        await DB.initIncomes('income_' + name)
        dispatch({
            type: CREATE_INCOME,
            payload: name
        })
    }

export const loadIncomes = (name) =>
    async dispatch => {
        const incomes = await DB.getIncomes('income_' + name)
        dispatch({
            type: LOAD_INCOMES,
            payload: {
                [name]: incomes
            }
        })
    }


// export const updateProfile = profile =>
//     async dispatch => {
//         await DB.updateProfile(profile)
//         dispatch({
//             type: UPDATE_PROFILE,
//             payload: profile
//         })
//     }
//
// export const deleteProfile = () =>
//     async dispatch => {
//         await DB.deleteProfile()
//         dispatch({
//             type: DELETE_PROFILE
//         })
//     }
