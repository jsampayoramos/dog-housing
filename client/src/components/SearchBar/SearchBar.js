import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import Input from '../UI/Input/Input';
import Icon from '../UI/Icon/Icon';

import styles from './SearchBar.module.css';
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = props => {   
    const [searchBarState, setSearchBarState] = useState({
        location: {
            type: 'input',
            config: {
                type: 'text',
                placeholder: 'Selecione o concelho'
            },
            value:''
        },
        checkIn: {
            type: 'input',
            config: {
                type: 'date',
                placeholder: 'Check-in'
            },
            value:''
        },
        checkOut: {
            type: 'input',
            config: {
                type: 'date',
                placeholder: 'Check-in'
            },
            value:''
        },
        animals: {
            type: 'select',
            config: {
                defaultValue: 'Cão',
            },
            options: ['Cão', 'Gato'],
            value:''
        },
    })
    
    return (
        <div className={styles.SearchBar}>
            <div className={styles.LocationContainer}>
                <Input 
                    elementType={searchBarState.location.type}
                    config={searchBarState.location.config}
                    value={searchBarState.location.value}
                    style={{
                        height: '35px',
                        border: 'none',
                        borderColor: 'none'
                    }}
                />
            </div>
            <div className={styles.CheckContainer}>
                <DatePicker className={styles.DatePickerClass} placeholderText='Check-in' />
            </div>
            <div className={styles.CheckContainer}>
                <DatePicker className={styles.DatePickerClass} placeholderText='Check-out' />
            </div>
            <div className={styles.AnimalsContainer}>
                <Input
                    elementType={searchBarState.animals.type}
                    config={searchBarState.animals.config}
                    value={searchBarState.animals.value}
                    options={searchBarState.animals.options}
                    style={{
                        height: '35px',
                        border: 'none',
                        color: 'grey'
                    }}
                />
            </div>
            <Icon icon='search' size='2x' style={{
                color: 'white',
                backgroundColor: 'rgb(0, 176, 240)',
                padding: '8px',
                borderRadius: '15px'
            }}/>
        </div>
    );
};

export default SearchBar;