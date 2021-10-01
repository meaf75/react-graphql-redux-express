import { check } from 'express-validator'

export const ValidateLogin = [     
    check('identifier_key')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isLength({min: 4}).withMessage('must be greater than 4')
        .exists().withMessage('key is required'),
    check('password')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isLength({min: 3}).withMessage('must be greater than 3')
        .exists().withMessage('key is required'),
];
