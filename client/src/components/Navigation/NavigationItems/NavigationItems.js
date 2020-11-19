import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';
import Icon from '../../UI/Icon/Icon';

import styles from './NavigationItems.module.css';

const NavigationItems = props => {
    const [dropdown, setDropdown] = useState(false);

    let loginAndSignup = (
        <React.Fragment>
            <NavigationItem to='/signup'>Signup</NavigationItem>
            <NavigationItem to='/login'>Login</NavigationItem>
        </React.Fragment>
    );

    const dropdownClass = [styles.DropdownBox];

    dropdown ? dropdownClass.push(styles.Open) : dropdownClass.push(styles.Close);

    const toggleDropdown = (event) => {
        const { tagName } = event.target;

        if(tagName === 'SPAN') {
            setDropdown(false);
        } else if(tagName === 'path' || tagName === 'svg') {
            setDropdown(prevState => !prevState);
        }
    };

    if(props.isAuth) {
        loginAndSignup = (
            <li className={styles.LoginIcon} name='icon' onClick={(event) => toggleDropdown(event)}>
                <Icon icon='user' size='2x' />
                <div className={dropdownClass.join(' ')} name='dropdown'>
                    <span onClick={(event) => toggleDropdown(event)}>Dashboard</span>
                    <Link to='/listings'><span onClick={(event) => toggleDropdown(event)}>Alojamentos</span></Link>
                    <span onClick={(event) => toggleDropdown(event)}>Logout</span>
                </div>
            </li>
        );
    }
    
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem to='#'>Quero ser anfitrião</NavigationItem>
            <NavigationItem to='#'>Opção 2</NavigationItem>
            {loginAndSignup}
        </ul>
    );
};

export default NavigationItems;