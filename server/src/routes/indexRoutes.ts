import { Request, Response, Router, NextFunction } from 'express';
import userController from './UserController';
import { PageNotFound } from '../Classes/AppResponses';
import authController from './AuthController';

class IndexRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();        
    }

    routes(): void {
        this.router.use('/api', userController);
        this.router.use('/api', authController);

        // Middlewares
        this.router.use(this.pageNotFound);
        this.router.use(this.unknownError);
    }

    pageNotFound = async (req: Request, res: Response) => {
        return res.status(PageNotFound.http_code).json({error: PageNotFound.message});
    }

    unknownError = async (_error: any,req: Request, res: Response) => {
        return res.status(500).json({error: _error.stack});
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;