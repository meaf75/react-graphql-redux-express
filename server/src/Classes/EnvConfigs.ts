
class ApplicationEnv {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    PASSWORD_SALT: string;
    JWT_HASH: string;

    constructor(){
        this.DB_HOST = process.env.DB_HOST as string;
        this.DB_PORT = Number.parseInt(process.env.DB_PORT as string);
        this.DB_NAME = process.env.DB_NAME as string;
        this.PORT = Number.parseInt(process.env.PORT as string);
        this.PASSWORD_SALT = process.env.PASSWORD_SALT as string;
        this.JWT_HASH = process.env.JWT_HASH as string;
    }
}

const AppEnviroment = new ApplicationEnv();
export default AppEnviroment;
