import * as actionTypes from '../actions/actionsType';

const initialState = [];

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_LISTINGS:
            return [...action.payload];
        case actionTypes.ADD_NEW_LISTING:
            return [
                ...state,
                action.payload
            ];
        case actionTypes.DELETE_LISTING:
            return state.filter(list => list.id !== action.payload);
        default: return state;
    };
};

export default listingsReducer;