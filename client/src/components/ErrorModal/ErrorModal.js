import React from "react";
import { useDispatch } from "react-redux";

import Button from "../UI/Button/Button";
import * as errorActions from "../../store/actions/errorActions";

import styles from "./ErrorModal.module.css";

const ErrorModal = ({ message }) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.ErrorModal}>
            <div className={styles.ErrorMessage}>
                <h3>Alguma coisa correu mal</h3>
                <hr />
                <p>{message}</p>
                <Button action={() => dispatch(errorActions.deleteError())}>
                    Fechar
                </Button>
            </div>
        </div>
    );
};

export default ErrorModal;
