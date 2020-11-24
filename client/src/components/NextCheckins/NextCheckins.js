import React from 'react';
import { useSelector } from 'react-redux';

import NextCheckin from './NextCheckin/NextCheckin';

import styles from './NextCheckins.module.css';
import './NextCheckins.css';

const NextCheckins = props => {
    const checkins = useSelector(state => state.checkins);

    const checkinArray = checkins.map(checkin => <NextCheckin {...checkin} />);

    return (
        <div className={styles.NextCheckins}>
            <h3>Próximos checkins</h3>
            <span className='checkin-date'>Checkin date</span>
            <span className='checkin-time'>Checkin time</span>
            <span className='checkout-date'>Checkout date</span>
            <span className='checkout-time'>Checkout time</span>
            <span className='checkin-name'>Name</span>
            <span className='checkin-number-pets'># of pets</span>
            <span className='checkin-address'>Address</span>
            {checkinArray}
        </div>
    );
};

export default NextCheckins;