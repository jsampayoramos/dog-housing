import { useReducer, useCallback } from "react";
import axios from "axios";

const initialState = {
    data: null,
    error: "",
    id: null,
};

const httpReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_SUCCESSFUL":
            return {
                ...state,
                data: action.payload,
                id: action.id,
            };
        case "REQUEST_FAILED":
            return {
                ...state,
                error: action.payload,
                id: action.id,
            };
        case "INITIALIZE_STATE":
            return initialState;
        default:
            return state;
    }
};

const useHttp = () => {
    const [httpState, dispatch] = useReducer(httpReducer, initialState);

    const sendRequest = useCallback(async (url, body, method, token, id) => {
        dispatch({ type: "SEND_REQUEST" });
        const configFile = {
            headers: { Authorization: "Bearer " + token },
            url,
            data: body,
            method,
        };
        if (id) configFile.params = { id };
        try {
            const data = await axios(configFile);
            dispatch({ type: "REQUEST_SUCCESSFUL", payload: data, id });
        } catch (err) {
            dispatch({
                type: "REQUEST_FAILED",
                payload: err.response.statusText,
                id,
            });
        }
    }, []);

    const initializeState = useCallback(
        () => dispatch({ type: "INITIALIZE_STATE" }),
        []
    );

    return {
        data: httpState.data,
        error: httpState.error,
        id: httpState.id,
        sendRequest: sendRequest,
        initializeState: initializeState,
    };
};

export default useHttp;
