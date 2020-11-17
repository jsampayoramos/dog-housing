import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.module.css';

const navigationItems = props => {
    return(
        <ul className={styles.NavigationItems}>
            <NavigationItem action={props.action} to='#'>Quero ser anfitrião</NavigationItem>
            <NavigationItem action={props.action} to='#'>Opção 2</NavigationItem>
            <NavigationItem action={props.action} to='#'>Signup</NavigationItem>
            <NavigationItem action={props.action} to='/login'>Login</NavigationItem>
        </ul>
    );
};

export default navigationItems;