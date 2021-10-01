import { IRepository } from "../../interfaces/IRepository";
import { IUser } from "../../interfaces/IUser";
import { AddElementActionType } from "../StoreTypes";

export interface AppState {    
    user?: IUser;
    user_auth_token?: string;
    repositories?: IRepository[];
    starredRepositories?: IRepository[];
    githubUserNotFound: boolean;    
    github_img_url: string;
}

export const SET_USER = 'SET_USER';
export const SET_USER_AUTH_TOKEN = 'SET_USER_AUTH_TOKEN';
export const SET_USER_REPOSITORIES = 'SET_USER_REPOSITORIES';
export const SET_USER_STARRED_REPOSITORIES = 'SET_USER_STARRED_REPOSITORIES';
export const SET_USER_NOT_FOUND = 'SET_USER_NOT_FOUND';
export const SET_GITHUB_PROFILE_URL = 'SET_GITHUB_PROFILE_URL';

export type AppActionTypes =
    AddElementActionType<typeof SET_USER, IUser | undefined> |
    AddElementActionType<typeof SET_USER_AUTH_TOKEN, string | undefined> |
    AddElementActionType<typeof SET_USER_REPOSITORIES, IRepository[]> |
    AddElementActionType<typeof SET_USER_STARRED_REPOSITORIES, IRepository[]> |
    AddElementActionType<typeof SET_USER_NOT_FOUND, boolean> |
    AddElementActionType<typeof SET_GITHUB_PROFILE_URL, string>