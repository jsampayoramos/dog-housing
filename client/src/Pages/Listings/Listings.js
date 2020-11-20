import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Listing from './Listing/Listing';

import styles from './Listings.module.css';
import './Listings.css';

const Listings = props => {
    const listings = useSelector(state => state.listings);
    
    const listingsArray = listings.map(listing => {
        return (
            <Listing
                key={listing.address} 
                {...listing}
            />
        );
    });

    return (
        <section className={styles.Listings} >
            <div>
                <h3>As tuas propriedades</h3>
                <Button><Link to='/listings/newproperty'>Adicionar propriedade</Link></Button>
            </div>
            <div className={styles.Header}>
                <span className='spanListingImage'></span>
                <span className='spanAddress'>Morada</span>
                <span className='spanPropertyType'>Tipo de propriedade</span>
                <span className='spanStatus'>Status</span>
                <span className='spanNumberOfPets'># Pets</span>
                <span className='spanTypeOfPets'>Type of pets</span>
                <span className='spanClose'></span>
            </div>
            <hr />
            {listingsArray}
        </section>
    );
};

export default Listings;