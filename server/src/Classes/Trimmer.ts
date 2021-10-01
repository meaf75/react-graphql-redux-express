import { Request, Response, NextFunction, Router } from 'express';

function TrimProperties(obj: any) : any {

    if (obj !== null && typeof obj === 'object') {

        for ( var prop in obj ) {

            // if the property is an object trim it too
            if ( typeof obj[prop] === 'object' ) {
                return TrimProperties(obj[prop]);
            }

            // if it's a string remove begin and end whitespaces
            if ( typeof obj[prop] === 'string' ) {
                obj[prop] = obj[prop].trim();
            }

        }

    }

}

const Trimmer = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        TrimProperties(req.body);
    }

    if (req.params) {
        TrimProperties(req.params);
    }

    if (req.query) {
        TrimProperties(req.query);
    }
    next();
};

export default Trimmer;