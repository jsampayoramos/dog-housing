import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

import styles from './LandingPage.module.css';

const landingPage = props => {
    return (
        <section className={styles.LandingPage}>
            <SearchBar />
        </section>
    );
};

export default landingPage;