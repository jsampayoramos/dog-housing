import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

import styles from './Drawer.module.css';

const drawer = props => {
    const drawerStyle = [styles.Drawer];

    if(props.status) {
        drawerStyle.push(styles.OpenDrawer)
    } else {
        drawerStyle.push(styles.CloseDrawer)
    }

    return (
        <div className={drawerStyle.join(' ')}>
            <ul>
                <h1>PetInn</h1>
                <NavigationItem to='#' action={props.closeDrawer} style={{marginTop: '15px'}}>Quero ser anfitrião</NavigationItem>
                <NavigationItem to='#' action={props.closeDrawer}>Opção 2</NavigationItem>
                <div className={styles.RegistrationContainer}>
                    <NavigationItem to='#' action={props.closeDrawer} style={{marginTop: 'auto'}}>Signup</NavigationItem>
                    <NavigationItem to='/login' action={props.closeDrawer}>Login</NavigationItem>
                </div>
            </ul>
        </div>
    )
};

export default drawer;