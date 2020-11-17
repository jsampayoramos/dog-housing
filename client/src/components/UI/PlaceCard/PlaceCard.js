import React from 'react';

import HouseImage from '../../../assets/images/house_one.jpg';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

import styles from './PlaceCard.module.css';

const placeCard = props => {  
    return (
        <div>
            <div className={styles.PlaceCard}>
                <div className={styles.ImageContainer}>
                    <img src={HouseImage} alt='house' />
                </div>
                <div className={styles.InfoContainer}>
                    <div className={styles.Title}>
                        <h3>{props.title}</h3>
                        <Icon 
                            icon='star' 
                            size='1x' 
                        />
                        <p>{props.rating}</p>
                    </div>
                    <div className={styles.AddressContainer}>
                        <Icon 
                            icon='map-marker-alt' 
                            size='1x' 
                        />
                        <p>{props.address}</p>
                    </div>
                    <p className={styles.PlaceDescription}>{props.description}</p>
                </div>
                <div className={styles.PriceContainer}>
                    <div>
                        <Icon 
                            icon='paw' 
                            size='1x' 
                        />
                        <p>{props.animals.length > 1 ? props.animals.join(' and ') : props.animals[0]}</p>
                    </div>
                    <div id={styles.Prices}>
                        <h3>{`Total ${props.totalPrice} €`}</h3>
                        <p>{`${props.pricePerNight} € / noite`}</p>
                    </div>
                    <Button>VER OFERTA</Button>
                </div>
            </div>
        </div>
    );
};

export default placeCard;