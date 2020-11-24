import React from 'react';

import NextCheckins from '../../components/NextCheckins/NextCheckins';

import styles from './Dashboard.module.css';

const dashboard = props => {    
    return(
        <section className={styles.Dashboard}>
            <h3>Dashboard</h3>
            <hr />
            <NextCheckins />
        </section>
    );
};

export default dashboard;