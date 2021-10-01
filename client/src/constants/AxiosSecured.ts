import Axios, { AxiosInstance } from "axios"
import { Dispatch } from "redux";
import { SetUser, SetUserAuthToken } from "../store/app/AppAction";
import { AUTH_TOKEN_KEY } from "./local_storage_keys";

export let AxiosSecured : AxiosInstance = Axios.create();

export const SetupAxiosSecured = (dispatch : Dispatch<any>,auth_token : string) => {
    const _axiosSecured = Axios.create({
        headers: {
            'Authorization': auth_token
        },
    })

    _axiosSecured.interceptors.response.use(function (response) {
        // All is ok, continue
        return response;
    }, function (error) {
        // An error ocurred with the request, handle it

        if(error.response.status == 401){
            // Force logout
            dispatch(SetUserAuthToken(undefined))
            dispatch(SetUser(undefined))
            localStorage.removeItem(AUTH_TOKEN_KEY);
            console.log('Force logout');
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    AxiosSecured = _axiosSecured;
}