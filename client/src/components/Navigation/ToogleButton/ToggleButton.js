import React from 'react';

import styles from './ToggleButton.module.css';

const toggleButton = props => {
    return (
        <div className={styles.ToggleButton} onClick={props.action}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default toggleButton;