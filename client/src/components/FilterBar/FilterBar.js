import React, { useState } from 'react';

import Input from '../UI/Input/Input';
import Icon from '../../components/UI/Icon/Icon';
import Button from '../UI/Button/Button';

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

    const [orderBy, setOrderBy] = useState({
        order: {
            label: 'Ordenar por',
            type: 'select',
            config: {
                required: 'true',
                defaultValue: 'Rating'
            },
            options: ['Rating', 'Preço'],
            value: 'Rating'
        }
    });

    const [typeAccomodation, setTypeAccomodation] = useState({
        apartment: {
            label: 'Apartamento',
            type: 'checkbox',
            config: {
                type: 'checkbox',
                name: 'accomodationType'
            },
            value: 'Apartamento'
        },
        moradia: {
            label: 'Moradia',
            type: 'checkbox',
            config: {
                type: 'checkbox',
                name: 'accomodationType'
            },
            value: 'Moradia'
        },
        quinta: {
            label: 'Quinta',
            type: 'checkbox',
            config: {
                type: 'checkbox',
                name: 'accomodationType'
            },
            value: 'Quinta'
        },
        hotel: {
            label: 'Hotel para cães',
            type: 'checkbox',
            config: {
                type: 'checkbox',
                name: 'accomodationType'
            },
            value: 'Hotel para cães'
        }
    });

    const [ameneties, setAmeneties] = useState({
        walks: {
            label: 'Passeios diários',
            type: 'checkbox',
            config: {
                type: 'checkbox',
                name: 'ameneties'
            },
            value: 'Passeios diários'
        },
        balcony: {
            label: 'Jardim/Terraço',
            type: 'checkbox',
            config: {
                type: 'checkbox',
                name: 'ameneties'
            },
            value: 'Jardim/Terraço'
        }
    })

    // const [filterToggle, setFilterToggle] = useState(false);

    const [addFilterToggle, setAddFilterToggle] = useState(false);

    const [checkedOptions, setCheckedOptions] = useState({
        accomodationType: [],
        ameneties: []
    });
    
    const inputContainerClass = [styles.InputContainer]

    // if(filterToggle) {
    //     inputContainerClass.push(styles.OpenFilter);
    // } else {
    //     inputContainerClass.push(styles.CloseFilter);
    // }

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

    const setChecked = (event) => {
        const {name, value} = event.target;
        const checkedOptionsCopy = {...checkedOptions}
        const index = checkedOptionsCopy[name].indexOf(value);
        if(index === -1) {
            checkedOptionsCopy[name] = [...checkedOptionsCopy[name], value];
        } else {
            checkedOptionsCopy[name].splice(index, 1); 
        };
        setCheckedOptions(checkedOptionsCopy);
    }

    const checkAccomodationArray = Object.keys(typeAccomodation).map(type => {
        return (
            <div className={styles.CheckBox}>
                <label>{typeAccomodation[type].label}</label>
                <Input elementType={typeAccomodation[type].type} config={typeAccomodation[type].config} value={typeAccomodation[type].value} action={setChecked}/>
            </div>
        );
    });
    
    const checkAmenetiesArray = Object.keys(ameneties).map(type => {
        return (
            <div className={styles.CheckBox}>
                <label>{ameneties[type].label}</label>
                <Input elementType={ameneties[type].type} config={ameneties[type].config} value={ameneties[type].value} action={setChecked}/>
            </div>
        );
    });

    let addFilterClass = addFilterToggle ? styles.OpenAddFilter : styles.CloseAddFilter;

    return (
        <div className={styles.FilterBar}>
            {/* <div className={styles.FilterControl} >
                <h3>Filters</h3>
                <Icon icon='plus-square' size='2x' action={() => setFilterToggle(prevState => !prevState)}/>
            </div> */}
            <div className={styles.FilterContainer}>
                <form>
                    {formArray}
                </form>
                <Icon icon={addFilterToggle ? 'minus' : 'plus'} action={() => setAddFilterToggle(prevState => !prevState)}/>
                <form className={addFilterClass}>
                    <div className={styles.OrderContainer} >
                        <label>{orderBy.order.label}</label>
                        <Input elementType={orderBy.order.type} config={orderBy.order.config} value={orderBy.order.value} options={orderBy.order.options}/>
                    </div>
                    <div className={styles.CheckBoxContainer}>
                        {checkAccomodationArray}
                    </div>
                    <div className={styles.CheckBoxContainer}>
                        {checkAmenetiesArray}
                    </div>
                </form>
            </div>        
        </div>
    );
};

export default FilterBar;