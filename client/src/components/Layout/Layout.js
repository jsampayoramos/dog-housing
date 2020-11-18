import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import ToggleButton from '../Navigation/ToogleButton/ToggleButton';
import Drawer from '../Navigation/Drawer/Drawer';
import Modal from '../UI/Modal/Modal';
import Icon from '../UI/Icon/Icon';

import styles from './Layout.module.css';

const Layout = props => {
    const [drawerState, setDrawer] = useState(false);
    
    const { pathname } = useLocation();

    let footer;

    if(pathname === '/') {
        footer = (
            <footer className={styles.Footer}>
                <div className={styles.FooterContainer}>
                    <div className={styles.ContactItems}>
                        <div>
                            <Icon icon='map-marker-alt' />
                            <p>Rua da Igreja, nº5</p>
                        </div>
                        <div>
                            <Icon icon='phone' />
                            <p>966662266</p>
                        </div>
                        <div>
                            <Icon icon='envelope-open' />
                            <p>info@petsinn.pt</p>
                        </div>
                    </div>
                    <p>Marca registada</p>
                    <p>aaahhhhhaaaaaa</p>
                </div>
            </footer>
        );
    };

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
                    <NavigationItems/>
                    <ToggleButton action={closeDrawer}/>
                </div>
                {drawerState ? <Modal action={closeDrawer}/> : null}
                <Drawer status={drawerState} closeDrawer={closeDrawer}/>
            </header>
            <main>
                {props.children}
            </main>
            {footer}
        </div>
    );
};

export default Layout;