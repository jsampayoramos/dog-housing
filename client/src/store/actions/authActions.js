import * as actionTypes from './actionsType';

export const login = (payload) => {
    localStorage.setItem('token', payload.token);
    localStorage.setItem('userId', payload.userId);
    return {
        type: actionTypes.LOGIN,
        payload
    };
};

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.LOGOUT
    };
};

export const autoLogin = () => {
    const token = localStorage.getItem('token') || '';
    const userId = parseInt(localStorage.getItem('userId')) || '';

    return {
        type: actionTypes.LOGIN,
        payload: {
            token,
            userId
        }
    };
};