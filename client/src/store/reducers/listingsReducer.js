import * as actionTypes from '../actions/actionsType';

const initialState = [
    {
        address: 'Rua Amália Rodrigues, 23, 3ºesq',
        propertyType: 'Apartment',
        status: 'active',
        numberOfPets: 5,
        typeOfPets: ['Dogs', 'Cats']
    },
    {
        address: 'Rua José Antunes, 23, 3ºesq',
        propertyType: 'Apartment',
        status: 'active',
        numberOfPets: 5,
        typeOfPets: ['Dogs', 'Cats']
    }
];

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_LISTINGS:
            return [action.payload];
        default: return state;
    };
};

export default listingsReducer;