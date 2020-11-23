import express from 'express';
import bodyParser from 'body-parser';

import sequelize from './util/database.js';
import authRoutes from './routes/auth.js';

import User from './models/user.js';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const { statusCode = '500', message: errorMessage, data: errorData} = error;
    return res.status(statusCode).json({
        message: errorMessage,
        data: errorData
    });
});

sequelize.sync()
    .then(res => {
        app.listen(process.env.PORT || 5000); 
    })
    .catch(error => {
        console.log(error)
    })
