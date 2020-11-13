import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Icon.module.css';

const Icon = props => {
    return (
        <FontAwesomeIcon icon={props.icon} size={props.size} style={props.style} className={styles.Icon}/>
    );
};

export default Icon;