import Sequelize from 'sequelize';

import sequelize from '../util/database.js';

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    accountType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default User;