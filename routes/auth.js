import express from 'express';
import bodyAPIs from 'express-validator';

import * as authControler from '../controllers/auth.js';

const router = express.Router();
const { body } = bodyAPIs;

router.put(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 8}),
        body('name')
            .trim()
            .not()
            .isEmpty(),
        body('accountType')
            .trim()
            .not()
            .isEmpty(),
        body('birthday')
            .isISO8601()
            .toDate()
    ], 
    authControler.signup
);

router.post('/login', authControler.login);

export default router;