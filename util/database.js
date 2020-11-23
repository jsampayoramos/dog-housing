import Sequelize from 'sequelize';

let sequelize;

if (process.env.DATABASE_URL) {
// the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: true
});
} else {
// the application is executed on the local machine
    sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE, process.env.SEQUELIZE_USER, process.env.SEQUELIZE_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
    });
}

export default sequelize;