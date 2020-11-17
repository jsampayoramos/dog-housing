import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

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
            type: 'date',
            config: {
                placeholderText: 'Check-in'
            },
            value:''
        },
        checkOut: {
            type: 'date',
            config: {
                type: 'date',
                placeholderText: 'Check-in'
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
    console.log(props);
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
                <Input
                    elementType={searchBarState.checkIn.type}
                    className={styles.DatePickerClass}
                    config={searchBarState.checkIn.config}
                />
            </div>
            <div className={styles.CheckContainer}>
                <Input
                    elementType={searchBarState.checkOut.type}
                    className={styles.DatePickerClass}
                    config={searchBarState.checkOut.config}
                />
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
            <Icon icon='search' size='2x' action={() => props.history.push('/results')}/>
        </div>
    );
};

export default withRouter(SearchBar);