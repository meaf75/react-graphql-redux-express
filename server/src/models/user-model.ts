import { Schema, model, Document, Model } from 'mongoose';


export interface IUser extends Document {
    user_name: string;
    github_profile: string;
    password: string;
    password_salt: string;
    email: string;
    created_at: Date;
}

const USER_DOCUMENT_NAME = 'User'

/** Scheema para usuarios */
const UserSchema = new Schema<IUser>({
    user_name: {
        type: String,
        required: true,        
    },
    github_profile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    password_salt: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    created_at : {
        type : Date,
        default: Date.now
    }
});

const UserModel : Model<IUser> = model<IUser>(USER_DOCUMENT_NAME,UserSchema);

export default UserModel;
