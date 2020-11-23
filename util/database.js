import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE, process.env.SEQUELIZE_USER, process.env.SEQUELIZE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;