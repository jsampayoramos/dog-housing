import * as actionTypes from "../actions/actionsType";

const initialState = {
    message: "",
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ERROR:
            return {
                ...state,
                message: action.payload,
            };
        case actionTypes.INITIALIZE_ERROR:
            return initialState;
        default:
            return state;
    }
};

export default errorReducer;
