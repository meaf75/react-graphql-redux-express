import { Request, Response, Router } from 'express';

// Modelos
import UserModel, { IUser } from '../models/user-model';

// Middlewares and utils
import { validationResult } from 'express-validator';
import { FailedDependency, FailedDependencyEmailOrUserName, InvalidPassword, SignedIn, UserNotExist } from '../Classes/AppResponses';
import bcrypt from 'bcrypt';
import { ValidateLogin } from '../Classes/Validators/AuthValidators';
import { GenerateJwtToken } from '../Classes/AuthHelpers';

class AuthController {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /** Get all users  */
    async Login(req: Request, res: Response){

        const { body } = req;
        
        // Check for body errors
        const errors = validationResult(req);
                
        if (!errors.isEmpty()) {
            return res.status(FailedDependency.http_code).json({ message: FailedDependency.message, data: errors.array() });
        }

        // Check if user is already registered
        const user = await UserModel.findOne({ $or: [
            {email :  body.identifier_key},
            {user_name :  body.identifier_key}
        ]});

        // Did the user was found?
        if(!user)
            return res.status(UserNotExist.http_code).json({message: UserNotExist.message});

        const isValid = bcrypt.compareSync(body.password,user.password);
        
        // correct password?
        if(!isValid){
            return res.status(InvalidPassword.http_code).json({message: InvalidPassword.message});
        }

        // Remove common fields
        const data : any = user.toObject();
        delete data.password;
        delete data.password_salt;

        return res.status(SignedIn.http_code).json({
            message: SignedIn.message,
            data,
            token: GenerateJwtToken(user)
        })
    }

    /**
     * Controller routes
     */
    routes() {
        this.router.post('/login', ValidateLogin,this.Login);
    }
    
}

const authController = new AuthController();
export default authController.router;