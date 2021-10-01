import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import { AuthRequired, AuthTokenInvalid } from './AppResponses';
import AppEnviroment from './EnvConfigs';

/**
 * Validate if the request contains a valid token
 */
const ValidateAuthToken = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.headers.authorization){
        return res.status(AuthRequired.http_code).json({message: AuthRequired.message});
    }

    try {
        var decoded = jwt.verify(req.headers.authorization as string, AppEnviroment.JWT_HASH as string);
        next();
    } catch (error) {
        return res.status(AuthTokenInvalid.http_code).json({
            message: AuthTokenInvalid.message
        });
    }
};

export default ValidateAuthToken;