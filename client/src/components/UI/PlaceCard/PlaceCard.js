import React from 'react';
import { useSelector } from 'react-redux';

import HouseImage from '../../../assets/images/house_one.jpg';
import Icon from '../Icon/Icon';

import styles from './PlaceCard.module.css';

const PlaceCard = props => {
    const places = useSelector(state => state.places);
    
    const placesArray = places.map(place => {
        return (
            <div className={styles.PlaceCard}>
                <div className={styles.ImageContainer}>
                    <img src={HouseImage} alt='house' />
                </div>
                <div className={styles.InfoContainer}>
                    <div className={styles.Title}>
                        <h3>{place.title}</h3>
                        <Icon 
                            icon='star' 
                            size='1x' 
                        />
                        <p>{place.rating}</p>
                    </div>
                    <div className={styles.AddressContainer}>
                        <Icon 
                            icon='map-marker-alt' 
                            size='1x' 
                        />
                        <p>{place.address}</p>
                    </div>
                    <p>{place.description}</p>
                </div>
                <div className={styles.PriceContainer}>
                    <p>{place.animals.length > 1 ? place.animals.join(' and ') : places.animals[0]}</p>
                    <p>{`${place.pricePerNight} € / noite`}</p>
                    <h3>{`Preço Total ${place.totalPrice}`}</h3>
                </div>
            </div>
        )
    });
    
    return (
        <div>
            {placesArray}
        </div>
    );
};

export default PlaceCard;