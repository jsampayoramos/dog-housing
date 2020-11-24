import React from 'react';

import styles from './NextCheckin.module.css';
import '../NextCheckins.css';

const nextCheckin = props => {
    return (
        <div className={styles.NextCheckin}>
            <span className='checkin-date'>{props.checkinDate}</span>
            <span className='checkin-time'>{props.checkinTime}</span>
            <span className='checkout-date'>{props.checkoutDate}</span>
            <span className='checkout-time'>{props.checkoutTime}</span>
            <span className='checkin-name'>{props.name}</span>
            <span className='checkin-number-pets'>{props.numberOfPets}</span>
            <span className='checkin-address'>{props.address}</span>
        </div>
    );
};

export default nextCheckin;