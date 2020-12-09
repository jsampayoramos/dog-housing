import React from 'react';

import ListingImage from '../../../assets/images/house_one.jpg';
import Icon from '../../../components/UI/Icon/Icon';

import styles from './Listing.module.css';

const listing = props => {
    return (
        <div className={styles.Listing}>
            <span className='spanListingImage'><img src={props.image[0]} alt='Property' /></span>
            <span className='spanAddress'>{props.address}</span>
            <span className='spanPropertyType'>{props.typeOfProperty}</span>
            <span className='spanStatus'>{props.status}</span>
            <span className='spanNumberOfPets'><Icon icon='paw' size='1x' />{props.numberOfAnimals}</span>
            <span className='spanTypeOfPets'>{props.typeOfAnimals}</span>
            <span className='spanClose'><Icon icon='pen' size='1x' action={props.editAction}/><Icon icon='times' size='1x' action={props.deleteAction}/></span>
        </div>
    );
};

export default listing;