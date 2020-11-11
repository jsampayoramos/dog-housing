import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const navigationItem = props => {
    return (
        <NavLink
            to='#'
            className={styles.NavigationItem}
            style={props.style}
        >
            {props.children}
        </NavLink>
    );
};

export default navigationItem;