import React, { useState } from 'react';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import ToggleButton from '../Navigation/ToogleButton/ToggleButton';
import Drawer from '../Navigation/Drawer/Drawer';
import Modal from '../UI/Modal/Modal';

import styles from './Layout.module.css';

const Layout = props => {
    const [drawerState, setDrawer] = useState(false);
    
    const closeDrawer = (event) => {
        event.preventDefault();
        setDrawer(prevState => !prevState);
    }

    return (
        <div className={styles.Layout}>
            <div className={styles.Overlay} />
            <div className={styles.BackgroundImage} />
            <header className={styles.Header}>
                <div className={styles.HeaderContainer}>
                    <h1>PetsInn</h1>
                    <NavigationItems action={closeDrawer}/>
                    <ToggleButton action={closeDrawer}/>
                </div>
                {drawerState ? <Modal action={closeDrawer}/> : null}
                <Drawer status={drawerState} closeDrawer={closeDrawer}/>
            </header>
            <main>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;