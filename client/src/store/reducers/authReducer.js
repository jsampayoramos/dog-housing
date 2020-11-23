import * as actionTypes from '../actions/actionsType';

const initialState = {
    token: '',
    userId: '',
    expiration: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        case actionTypes.LOGOUT:
            return {
                ...initialState
            };
        default: return state;
    };
};

export default authReducer;