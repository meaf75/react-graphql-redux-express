import { IUser } from "../models/user-model";
import jwt from 'jsonwebtoken';
import AppEnviroment from "./EnvConfigs";
import { Request } from 'express';

export const GenerateJwtToken = (user: IUser) => {
    return jwt.sign({},AppEnviroment.JWT_HASH as string, {
        audience: 'user',
        algorithm: 'HS256',
        subject: user.id
    });
}

export const GetUserIdFromToken = (req: Request) => {
    return jwt.decode(req.headers.authorization as string)?.sub;
}