import {
    ADD_CATEGORY,
    CHANGE_CATEGORY_NAME,
    CHANGE_CATEGORY_SUM,
    GET_CATEGORIES,
    DELETE_CATEGORY
} from "../types"
import {DB} from "../../db"

export const addCategory = (name, icon, iconLibrary) =>
    async dispatch => {
        const id = await DB.addCategory(name, icon, iconLibrary)
        const payload = {
            id, name, 'sum': 0, icon, iconLibrary
        }
        dispatch({
            type: ADD_CATEGORY,
            payload
        })
    }

export const changeCategoryName = (id, name) =>
    async dispatch => {
        await DB.changeCategoryName(id, name)
        dispatch({
            type: CHANGE_CATEGORY_NAME,
            payload: {id: parseInt(id), name}
        })
    }

export const changeCategorySum = (id, sum) =>
    async dispatch => {
        await DB.changeCategorySum(id, sum)
        dispatch({
            type: CHANGE_CATEGORY_SUM,
            payload: {
                id: parseInt(id),
                sum: parseFloat(sum)
            }
        })
    }

export const getCategories = () =>
    async dispatch => {
        const payload = await DB.getCategories()
        dispatch({
            type: GET_CATEGORIES,
            payload
        })
    }

export const deleteCategory = id =>
    async dispatch => {
        await DB.deleteCategory(id)
        dispatch({
            type: DELETE_CATEGORY,
            payload: parseInt(id)
        })
    }
