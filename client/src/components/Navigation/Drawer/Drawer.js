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
                <div onClick={props.closeDrawer}><NavigationItem to='#' style={{marginTop: '15px'}}>Quero ser anfitrião</NavigationItem></div>
                <div onClick={props.closeDrawer}><NavigationItem to='#'>Opção 2</NavigationItem></div>
                <div className={styles.RegistrationContainer}>
                    <div onClick={props.closeDrawer}><NavigationItem to='/signup' style={{marginTop: 'auto'}}>Signup</NavigationItem></div>
                    <div onClick={props.closeDrawer}><NavigationItem to='/login'>Login</NavigationItem></div>
                </div>
            </ul>
        </div>
    )
};

export default drawer;