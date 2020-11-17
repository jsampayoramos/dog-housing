import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const navigationItem = props => {
    return (
        <NavLink
            to={'/login'}
            className={styles.NavigationItem}
            style={props.style}
            onClick={props.action}
        >
            {props.children}
        </NavLink>
    );
};

export default navigationItem;