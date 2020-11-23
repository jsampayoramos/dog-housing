import React from 'react';

import Button from '../UI/Button/Button';

import styles from './ErrorModal.module.css';

const errorModal = props => {
    return (
        <div className={styles.ErrorModal}>
            <div className={styles.ErrorMessage}>
                <h3>Alguma coisa correr mal</h3>
                <hr />
                <p>ajsjansajnsjnsa sjsnjsanjsajnsnjanjas asjnasjnsajnsjnsjnsna asjnajnsjnsajnsajnasjnsa jnsajsanjsajnsajnsajnsa</p>
                <Button>Fechar</Button>
            </div>
        </div>
    );
};

export default errorModal;