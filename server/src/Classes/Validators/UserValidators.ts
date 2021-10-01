import { check } from 'express-validator'

/** Built validator for 'Store' method in 'UserController' */
export const ValidateCreateUser = [     
    check('user_name')
        .not().isEmpty().withMessage('key value cannot be empty')
        .exists().withMessage('key is required')
        .isLength({min: 4}).withMessage('must be greater than 4'),
    check('github_profile')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isLength({min: 4}).withMessage('must be greater than 4')
        .exists().withMessage('key is required'),
    check('password')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isLength({min: 3}).withMessage('must be greater than 3')
        .exists().withMessage('key is required'),
    check('email')
        .not().isEmpty().withMessage('key value cannot be empty')
        .exists().withMessage('key is required')
        .normalizeEmail().isEmail().withMessage('Field must be an email'),
];

export const ValidateDeleteUser = [
    check('user_id')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isLength({min: 6}).withMessage('must be greater than 6')
        .exists().withMessage('key is required'),
]