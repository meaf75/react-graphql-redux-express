import { Request, Response, Router } from 'express';

// Modelos
import UserModel, { IUser } from '../models/user-model';

// Middlewares and utils
import { ValidateCreateUser } from '../Classes/Validators/UserValidators';
import { validationResult } from 'express-validator';
import { ErrorUserCreate, FailedDependency, UserAlreadyExist, UserCreate, UserNotExist } from '../Classes/AppResponses';
import bcrypt from 'bcrypt';
import { GenerateJwtToken, GetUserIdFromToken } from '../Classes/AuthHelpers';
import ValidateAuthToken from '../Classes/ValidateAuthToken';
import { CallbackError } from 'mongoose';

class UserController{

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /** Get all users  */
    GetCurrentUser(req: Request, res: Response){

        const userId = GetUserIdFromToken(req);

        // Search for the user
        UserModel.findOne({_id: userId}).select('user_name github_profile email').exec((err: CallbackError, user: IUser | null) =>{
            
            if (err || !user) 
                return res.status(UserNotExist.http_code).send({message: UserNotExist.message, data: err})

            return res.status(200).json({
                data: user
            })
        });
    }

    /** Create user */
    async AddUser(req: Request, res: Response){

        // Check for body errors
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(FailedDependency.http_code).json({ message: FailedDependency.message, data: errors.array() });
        }

        const userData : IUser = req.body;
        req.body.user_name = userData.user_name.toLowerCase();

        // Check if user is already registered
        const user = await UserModel.findOne({ $or: [
            {email :  userData.email},
            {user_name :  userData.user_name}
        ]});

        /** New user model entity */
        let newUserModel = new UserModel(req.body);
        newUserModel.password_salt = bcrypt.genSaltSync();
        newUserModel.password = bcrypt.hashSync(newUserModel.password,newUserModel.password_salt);
        newUserModel.created_at = new Date();

        // User already exist, skip
        if(user)
            return res.status(UserAlreadyExist.http_code).json({message: UserAlreadyExist.message});
        
        // Save new user
        newUserModel.save().then((result : IUser) => {

            // Remove common fields
            const data : any = result.toObject();
            delete data.password;
            delete data.password_salt;

            // Return new user
            return res.status(UserCreate.http_code).json({
                message: UserCreate.message, 
                data,
                token: GenerateJwtToken(result)
            });
        }).catch((err) => {
            console.error(err);
            
            // Return error
            return res.status(ErrorUserCreate.http_code).json({message: ErrorUserCreate.message, data: err});
        });
    }

    /**
     * Rutas del controlador
     */
    routes() {
        this.router.get('/current_user',ValidateAuthToken,this.GetCurrentUser);
        this.router.post('/user', ValidateCreateUser,this.AddUser);
    }
    
}

const userController = new UserController();
export default userController.router;