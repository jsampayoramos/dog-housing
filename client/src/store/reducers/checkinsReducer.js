import * as actionTypes from '../actions/actionsType';

const initialState = [
    {
        checkinDate: '20/02/2020',
        checkinTime: '15:30',
        checkoutDate: '20/03/2020',
        checkoutTime: '17:30',
        name: 'João Ramos',
        numberOfPets: '4',
        address: 'Rua Amália Rodrigues'
    },
    {
        checkinDate: '20/06/2020',
        checkinTime: '16:00',
        checkoutDate: '30/07/2020',
        checkoutTime: '17:30',
        name: 'Pedro Ramos',
        numberOfPets: '2',
        address: 'Rua dos panascas'
    }
];

const checkinsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_CHECKINS:
            return [...action.payload]
        default: return state;
    };
};

export default checkinsReducer;