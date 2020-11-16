import React, { useState } from 'react';

import Input from '../UI/Input/Input';
import Icon from '../../components/UI/Icon/Icon';

import styles from './FilterBar.module.css';

const FilterBar = props => {
    const [filterBarState, setFilterBarState] = useState({
        location: {
            label: 'Location',
            type: 'input',
            config: {
                type: 'text'
            },
            value: ''
        },
        checkinDate: {
            label: 'Check-in Date',
            type: 'date',
            config: {

            },
            value: ''
        },
        checkoutDate: {
            label: 'Check-out Date',
            type: 'date',
            config: {

            },
            value: ''
        },
        numberOfPets: {
            label: '# of pets',
            type: 'input',
            config: {
                type: 'number'
            },
            value: ''
        }
    });

    const [filterToggle, setFilterToggle] = useState(false);
    
    const inputContainerClass = [styles.InputContainer]

    if(filterToggle) {
        inputContainerClass.push(styles.OpenFilter);
    } else {
        inputContainerClass.push(styles.CloseFilter);
    }

    const formArray = Object.keys(filterBarState).map(cur => {
        return (
            <div key={cur} className={inputContainerClass.join(' ')}>
                <label>{filterBarState[cur].label}</label>
                <Input 
                    elementType={filterBarState[cur].type}
                    config={filterBarState[cur].config}
                    value={filterBarState[cur].value}
                    className={filterBarState[cur].type === 'date' ? styles.DatePicker : null}
                />
            </div>
        );
    });

    return (
        <div className={styles.FilterBar}>
            <div className={styles.FilterControl} >
                <h3>Filters</h3>
                <Icon icon='plus-square' size='2x' action={() => setFilterToggle(prevState => !prevState)}/>
            </div>
            {formArray}
        </div>
    );
};

export default FilterBar;