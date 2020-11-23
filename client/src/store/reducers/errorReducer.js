import * as actionTypes from '../actions/actionsType';

const initialState = {
    status: false,
    message: ''
};

const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ERROR:
            return {
                status: true,
                message: action.payload
            };
        case actionTypes.DELETE_ERROR:
            return {
                status: false,
                message: ''
            };
        default: return state;
    };
};

export default errorReducer;