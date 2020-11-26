import Sequelize from 'sequelize';

import sequelize from '../util/database.js';

const Listing = sequelize.define('listing', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    location: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['Lisboa', 'Porto', 'Faro']
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    floorAndDoor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numberOfAnimals: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    typeOfAnimals: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['Cão', 'Gato', 'Cães e gatos']
    },
    typeOfProperty: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['Apartamento', 'Moradia', 'Quinta', 'Hotel para cães']
    },
    imageString: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    servicesString: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false   
    },
    services: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.servicesString.split('_')
        },
        set(value) {
            throw new Error('Cannot set services');
        }
    },
    image: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.imageString.split(' ')
        },
        set(value) {
            throw new Error('Cannot set image URL');
        }
    }
});

export default Listing;