import { Dispatch } from "react";
import { IRepository } from "../../interfaces/IRepository";
import { IUser } from "../../interfaces/IUser";
import { AppActionTypes } from './AppTypes';

export const SetUser = (newUser: IUser | undefined) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: "SET_USER",
        payload: {
            data: newUser
        }
    });
}

export const SetUserAuthToken = (value?: string) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: "SET_USER_AUTH_TOKEN",
        payload: {
            data: value
        }
    });
}

export const SetUserRepositories = (value: IRepository[]) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: "SET_USER_REPOSITORIES",
        payload: {
            data: value
        }
    });
}

export const SetUserStarredRepositories = (value: IRepository[]) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: "SET_USER_STARRED_REPOSITORIES",
        payload: {
            data: value
        }
    });
}

export const SetUserNotFound = (value: boolean) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: "SET_USER_NOT_FOUND",
        payload: {
            data: value
        }
    });
}

export const SetProfileGithubUrl = (value: string) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: "SET_GITHUB_PROFILE_URL",
        payload: {
            data: value
        }
    });
}
