import React from 'react';

import FilterBar from '../../components/FilterBar/FilterBar';
import PlaceCard from '../../components/UI/PlaceCard/PlaceCard';

import styles from './Results.module.css';

const results = props => {
    return (
        <section className={styles.Results}>
            <FilterBar />
            <PlaceCard />
        </section>
    );
};

export default results;