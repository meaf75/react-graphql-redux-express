export interface IResponseState {
    message: string,
    http_code: number,
}

export const UserCreate : IResponseState = {
    message: "User created",
    http_code: 201
}

export const ErrorUserCreate : IResponseState = {
    message: "An error ocurred trying to create the new user",
    http_code: 400
}

export const UserErrorUpdate : IResponseState = {
    message: "An error ocurred trying to update the user",
    http_code: 400
}

export const UserAlreadyExist : IResponseState = {
    message: "Providen user already exist",
    http_code: 400
}

export const UserNotExist : IResponseState = {
    message: "This user does not exist",
    http_code: 404
}

export const InvalidPassword : IResponseState = {
    message: "Invalid password or username",
    http_code: 401
}

export const SignedIn : IResponseState = {
    message: "Login ok",
    http_code: 200
}

export const UserDeleteState : IResponseState = {
    message: "User deleted",
    http_code: 200
}

export const FailedDependency : IResponseState = {
    message: "Failed Dependency, some request parameters are not valid",
    http_code: 424
}

export const FailedDependencyEmailOrUserName : IResponseState = {
    message: "Failed Dependency, email or username must be provided",
    http_code: FailedDependency.http_code
}

export const PageNotFound : IResponseState = {
    message: "Page not found",
    http_code: 404
}

export const AuthRequired : IResponseState = {
    message: "Auth token is required",
    http_code: 401
}

export const AuthTokenInvalid : IResponseState = {
    message: "Auth token is invalid",
    http_code: 401
}
