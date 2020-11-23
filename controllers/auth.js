import bodyAPIs from 'express-validator';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

const { validationResult } = bodyAPIs; 

export const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const error = new Error('Validation went wrong');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        
        const { name, accountType, birthday, email, password } = req.body;

        const repeatedUser = await User.findAll({where: {email: email}})

        if(repeatedUser.length > 0) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }

        const hashPass = await bcrypt.hash(password, 12);
    
        const user = await User.create({
            name,
            accountType,
            birthday,
            email,
            password: hashPass
        });

        return res.status(201).json({
            message: 'User created successfuly'
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};