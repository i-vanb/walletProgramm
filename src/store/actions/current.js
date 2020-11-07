import {
    INIT_CURRENT_PERIOD,
    ADD_CURRENT_CATEGORY,
    GET_CURRENT_PERIOD,
    CHANGE_CURRENT_CATEGORY_NAME,
    CHANGE_CURRENT_CATEGORY_PLAN,
    CHANGE_CURRENT_CATEGORY_FACT,
    DELETE_CURRENT_CATEGORY
} from "../types"
import {DB} from "../../db"


export const initCurrentPeriod = (name) =>
    async dispatch => {
        await DB.initCurrentPeriod(name)
        dispatch({
            type: INIT_CURRENT_PERIOD
        })
    }

export const addCurrentCategory = (table, name, plan, fact, icon, iconLibrary) =>
    async dispatch => {
        const id = await DB.addCurrentCategory(table, name, plan, fact, icon, iconLibrary)
        const payload = {
            id,
            name,
            plan: parseFloat(plan),
            fact: parseFloat(fact),
            icon,
            iconLibrary
        }
        dispatch({
            type: ADD_CURRENT_CATEGORY,
            payload
        })
    }

export const changeCurrentCategoryName = (table, id, name) =>
    async dispatch => {
        await DB.changeCurrentCategoryName(table, id, name)
        dispatch({
            type: CHANGE_CURRENT_CATEGORY_NAME,
            payload: {id: parseInt(id), name}
        })
    }

export const changeCurrentCategoryPlan = (table, id, plan) =>
    async dispatch => {
        await DB.changeCurrentCategoryPlan(table, id, plan)
        dispatch({
            type: CHANGE_CURRENT_CATEGORY_PLAN,
            payload: {
                id: parseInt(id),
                plan: parseFloat(plan)
            }
        })
    }

export const changeCurrentCategoryFact = (table, id, fact) =>
    async dispatch => {
        await DB.changeCurrentCategoryFact(table, id, fact)
        dispatch({
            type: CHANGE_CURRENT_CATEGORY_FACT,
            payload: {
                id: parseInt(id),
                fact: parseFloat(fact)
            }
        })
    }

export const getCurrentPeriod = name =>
    async dispatch => {
        const payload = await DB.getCurrentPeriod(name)
        dispatch({
            type: GET_CURRENT_PERIOD,
            payload
        })
    }

export const deleteCurrentCategory = (table, id) =>
    async dispatch => {
        await DB.deleteCurrentCategory(table, id)
        dispatch({
            type: DELETE_CURRENT_CATEGORY,
            payload: parseInt(id)
        })
    }





