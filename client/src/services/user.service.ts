import axios from "axios";
import { API_ENDPOINT } from "../constants/ApiEndpoint";
import { AxiosSecured } from "../constants/AxiosSecured";

export const GetCurrentUser = () => {
    return AxiosSecured.get(`${API_ENDPOINT}/api/current_user`);
}

export const CreateUser = (body: {user_name: string, github_profile: string, password: string, email: string}) => {
    return axios.post(`${API_ENDPOINT}/api/user`,body);
}