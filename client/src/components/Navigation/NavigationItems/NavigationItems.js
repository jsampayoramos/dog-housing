import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.module.css';

const navigationItems = props => {
    return(
        <ul className={styles.NavigationItems}>
            <NavigationItem>Quero ser anfitrião</NavigationItem>
            <NavigationItem>Opção 2</NavigationItem>
            <NavigationItem>Signup</NavigationItem>
            <NavigationItem>Login</NavigationItem>
        </ul>
    );
};

export default navigationItems;