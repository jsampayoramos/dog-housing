import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.module.css';

const navigationItems = props => {
    return(
        <ul className={styles.NavigationItems}>
            <NavigationItem action={props.action}>Quero ser anfitrião</NavigationItem>
            <NavigationItem action={props.action}>Opção 2</NavigationItem>
            <NavigationItem action={props.action}>Signup</NavigationItem>
            <NavigationItem action={props.action}>Login</NavigationItem>
        </ul>
    );
};

export default navigationItems;