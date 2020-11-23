import * as actionTypes from '../actions/actionsType';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TOGGLE_LOADING:
            return !state;
        default: return state;
    };
};

export default loadingReducer;