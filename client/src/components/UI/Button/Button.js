import React from 'react';

import styles from './Button.module.css';

const button = props => {
    return (
        <button onClick={props.action} className={styles.Button}>
            {props.children}
        </button>
    );
};

export default button;