import { AppState, AppActionTypes } from './AppTypes';

export const appInitialState: AppState = {    
    user: undefined,
    user_auth_token: undefined,
    repositories: [],
    starredRepositories: [],
    githubUserNotFound: false,
    github_img_url: ''
}

export const appReducer = (state: AppState = appInitialState, action: AppActionTypes): AppState => {
    const currentState = { ...state };
    
    switch (action.type) {
        case "SET_USER": {
            currentState.user = action.payload.data;
            break;
        }
        case "SET_USER_AUTH_TOKEN": {
            currentState.user_auth_token = action.payload.data;
            break;
        }
        case "SET_USER_REPOSITORIES": {
            currentState.repositories = action.payload.data;
            break;
        }
        case "SET_USER_STARRED_REPOSITORIES": {
            currentState.starredRepositories = action.payload.data;
            break;
        }
        case "SET_USER_NOT_FOUND": {
            currentState.githubUserNotFound = action.payload.data;
            break;
        }
        case "SET_GITHUB_PROFILE_URL": {
            currentState.github_img_url = action.payload.data;
            break;
        }
        default:
            return currentState;
    }
    return currentState;
}