import bodyAPIs from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findAll({where: {email}})
        
        if(user.length === 0) {
            const error = new Error('Invalid authentication');
            error.statusCode = 401;
            error.message = 'E-mail não existe';
            throw error;
        }

        const passwordCheck = await bcrypt.compare(password, user[0].password);
        
        if(!passwordCheck) {
            const error = new Error('Invalid authentication');
            error.statusCode = 401;
            error.message = 'Palavra passe incorrecta';
            throw error;
        }

        const token = jwt.sign({
            username: user.email,
            userId: user[0].id
        },
        process.env.TOKEN_SECRET_WORD,
        {expiresIn: '1h'});

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            userId: user[0].id
        });
    } catch(err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }

}