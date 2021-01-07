import * as actionTypes from "./actionsType";

export const setError = (message) => {
    return {
        type: actionTypes.ADD_ERROR,
        payload: message,
    };
};

export const deleteError = () => {
    return {
        type: actionTypes.INITIALIZE_ERROR,
    };
};
