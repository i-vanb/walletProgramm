import {
    CHANGE_LANGUAGE,
    CHANGE_THEME,
    GET_SETTINGS
} from "../types"
import {DB} from "../../db"

export const changeLanguage = (language) =>
    async dispatch => {
        await DB.changeLanguage(language)
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: {language}
        })
    }

export const changeTheme = (theme) =>
    async dispatch => {
        await DB.changeTheme(theme)
        dispatch({
            type: CHANGE_THEME,
            payload: {theme}
        })
    }

export const getSettings = () =>
    async dispatch => {
        const payload = await DB.getSettings()
        dispatch({
            type: GET_SETTINGS,
            payload
        })
    }
