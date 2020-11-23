import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

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

app.use(morgan('combined'));

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const { statusCode = '500', message: errorMessage, data: errorData} = error;
    return res.status(statusCode).json({
        message: errorMessage,
        data: errorData
    });
});

if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

sequelize.sync()
    .then(res => {
        app.listen(process.env.PORT || 5000); 
        console.log('a correr')
    })
    .catch(error => {
        console.log(error)
    })
