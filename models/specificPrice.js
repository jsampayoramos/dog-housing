import Sequelize from "sequelize";

import sequelize from "../util/database.js";

const SpecificPrice = sequelize.define("specificPrice", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    price: {
        allowNull: false,
        type: Sequelize.FLOAT,
    },
    dateFrom: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    dateTo: {
        allowNull: false,
        type: Sequelize.DATE,
    },
});

export default SpecificPrice;
