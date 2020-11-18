import * as actionTypes from '../actions/actionsType';

const initialState = {
    token: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                token: action.payload
            }
        default: return state;
    };
};

export default authReducer;