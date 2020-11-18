import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.module.css';

const navigationItems = props => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem to='#'>Quero ser anfitrião</NavigationItem>
            <NavigationItem to='#'>Opção 2</NavigationItem>
            <NavigationItem to='/signup'>Signup</NavigationItem>
            <NavigationItem to='/login'>Login</NavigationItem>
        </ul>
    );
};

export default navigationItems;