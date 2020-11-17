import React from 'react';
import { useSelector } from 'react-redux';

import FilterBar from '../../components/FilterBar/FilterBar';
import PlaceCard from '../../components/UI/PlaceCard/PlaceCard';

import styles from './Results.module.css';

const Results = props => {
    const places = useSelector(state => state.places);

    const placesArray = places.map(place => {
        return (
            <PlaceCard 
                title={place.title}
                rating={place.rating}
                address={place.address}
                description={place.description}
                animals={place.animals}
                totalPrice={place.totalPrice}
                pricePerNight={place.pricePerNight}
            />
        )
    })

    return (
        <section className={styles.Results}>
            <FilterBar />
            {placesArray}
        </section>
    );
};

export default Results;