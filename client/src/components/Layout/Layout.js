import React from 'react';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

import styles from './Layout.module.css';

const layout = props => {
    return (
        <React.Fragment>
            <header className={styles.Header}>
                <h1>PetsInn</h1>
                <NavigationItems />
            </header>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default layout;