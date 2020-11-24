import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const authHeaders = req.get('Authorization');
    if(!authHeaders) {
        const error = new Error('Authentication failed');
        error.statusCode = 401;
        throw error;
    };
    const token = authHeaders.split('')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_WORD);
    } catch(error) {
        error.statusCode = 401;
        error.message = 'Wrong token';
        next(error);
    }

    if(!decodedToken) {
        const error = new Error('Authentication failed');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;

    next();
};