import * as actionTypes from '../actions/actionsType';

const initialState = [
    {
        title: 'Os patudos',
        rating: 4.5,
        description: 'No cantinho da casa da Joana, os animais são sempre felizes enquanto vai de férias',
        address: 'Avenida do Brasil, 1890-390',
        animals: ['Dogs', 'Cats'],
        pricePerNight: 14,
        totalPrice: 140
    }
];

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACES:
            return [...action.payload];
        default: return state;
    };
};

export default placesReducer;