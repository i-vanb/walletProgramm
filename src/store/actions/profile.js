import {LOAD_PROFILE, UPDATE_PROFILE, CREATE_PROFILE, DELETE_PROFILE} from "../types"
import {DB} from "../../db"


export const createProfile = profile =>
    async dispatch => {
        await DB.createProfile(profile)
        dispatch({
            type: CREATE_PROFILE,
            payload: profile
        })
    }

export const loadProfile = () =>
    async dispatch => {
        const payload = await DB.getProfile()
        dispatch({
            type: LOAD_PROFILE,
            payload
        })
    }

export const updateProfile = profile =>
    async dispatch => {
        await DB.updateProfile(profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: profile
        })
    }

export const deleteProfile = () =>
    async dispatch => {
        await DB.deleteProfile()
        dispatch({
            type: DELETE_PROFILE
        })
    }
