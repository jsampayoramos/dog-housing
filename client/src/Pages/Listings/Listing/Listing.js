import React from 'react';

import ListingImage from '../../../assets/images/house_one.jpg';
import Icon from '../../../components/UI/Icon/Icon';

import styles from './Listing.module.css';

const listing = props => {
    return (
        <div className={styles.Listing}>
            <span className='spanListingImage'><img src={ListingImage} alt='Property' /></span>
            <span className='spanAddress'>{props.address}</span>
            <span className='spanPropertyType'>{props.propertyType}</span>
            <span className='spanStatus'>{props.status}</span>
            <span className='spanNumberOfPets'><Icon icon='paw' size='1x' />{props.numberOfPets}</span>
            <span className='spanTypeOfPets'>{props.typeOfPets.length > 1 ? props.typeOfPets.join(' | ') : props.typeOfPets}</span>
            <span className='spanClose'><Icon icon='times' size='1x'/></span>
        </div>
    );
};

export default listing;