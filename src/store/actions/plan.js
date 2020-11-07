import {
    GET_PLANS,
    ADD_PLAN,
    CHANGE_PLAN_NAME,
    CHANGE_PLAN_SUM,
    CHANGE_PLAN_CATEGORY,
    CHANGE_PLAN_DEADLINE,
    DELETE_PLAN
} from "../types"
import {DB} from "../../db"

export const addPlan = (name, sum, date, category, deadline) =>
    async dispatch => {
        const id = await DB.addPlan(name, sum, date, category, deadline)
        const payload = {
            id,
            name,
            sum: parseFloat(sum),
            date: parseInt(date),
            category,
            deadline: parseInt(deadline)
        }
        dispatch({
            type: ADD_PLAN,
            payload
        })
    }

export const changePlanName = (id, name) =>
    async dispatch => {
        await DB.changePlanName(id, name)
        dispatch({
            type: CHANGE_PLAN_NAME,
            payload: {id: parseInt(id), name}
        })
    }

export const changePlanSum = (id, sum) =>
    async dispatch => {
        await DB.changePlanSum(id, sum)
        dispatch({
            type: CHANGE_PLAN_SUM,
            payload: {
                id: parseInt(id),
                sum: parseFloat(sum)
            }
        })
    }

export const changePlanCategory = (id, category) =>
    async dispatch => {
        await DB.changePlanCategory(id, category)
        dispatch({
            type: CHANGE_PLAN_CATEGORY,
            payload: {
                id: parseInt(id),
                category
            }
        })
    }

export const changePlanDeadline = (id, deadline) =>
    async dispatch => {
        await DB.changePlanDeadline(id, deadline)
        dispatch({
            type: CHANGE_PLAN_DEADLINE,
            payload: {
                id: parseInt(id),
                deadline: parseInt(deadline)
            }
        })
    }

export const getPlans = () =>
    async dispatch => {
        const payload = await DB.getPlans()
        dispatch({
            type: GET_PLANS,
            payload
        })
    }

export const deletePlan = id =>
    async dispatch => {
        await DB.deletePlan(id)
        dispatch({
            type: DELETE_PLAN,
            payload: parseInt(id)
        })
    }






