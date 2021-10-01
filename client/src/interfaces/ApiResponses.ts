import { IUser } from "./IUser";

export interface AuthLoginResponse {
    data: IUser;
    token: string;
}

export interface RegisterResponse {
    status: number,
    message: string,
    error_message: string,
    data: IUser,
    token: string,
}