import React, { useState } from 'react';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import ToggleButton from '../Navigation/ToogleButton/ToggleButton';
import Drawer from '../Navigation/Drawer/Drawer';

import styles from './Layout.module.css';

const Layout = props => {
    const [drawerState, setDrawer] = useState(false);
    return (
        <React.Fragment>
            <header className={styles.Header}>
                <div className={styles.HeaderContainer}>
                    <h1>PetsInn</h1>
                    <NavigationItems />
                    <ToggleButton action={() => setDrawer(prevState => !prevState)}/>
                </div>
                <Drawer status={drawerState}>
                    <NavigationItems />
                </Drawer>
            </header>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default Layout;