import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import styles from './NewProperty.module.css';

const NewProperty = props => {
    const [form, setForm] = useState({
        address: {
            label: 'Morada',
            type: 'input',
            config: {
                required: true,
                name: 'address',
                type: 'text'
            },
            value: ''
        },
        floorAndDoor: {
            label: 'Andar e Porta',
            type: 'input',
            config: {
                required: true,
                name: 'address',
                type: 'text'
            },
            value: ''
        },
        numberOfAnimals: {
            label: '# of Pets',
            type: 'input',
            config: {
                required: true,
                name: 'address',
                type: 'number'
            },
            value: ''
        },
        typeOfAnimals: {
            label: 'Morada',
            type: 'select',
            config: {
                required: true,
                defaultValue: 'Cão'
            },
            options: ['Cão', 'Gato'],
            value: ''
        },
        typeOfProperty: {
            label: 'Tipo de propriedade',
            type: 'select',
            config: {
                required: true,
                defaultValue: 'Apartamento'
            },
            options: ['Apartamento', 'Moradia', 'Quinta', 'Hotel para cães'],
            value: ''
        },
        description: {
            label: 'Descrição',
            type: 'textarea',
            config: {
                required: true,
                name: 'message'
            },
            value: ''
        }
    });

    const [checkBoxForm, setCheckBoxForm] = useState({
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
    });

    const [ checkedOptions, setCheckedOptions] = useState([]);

    const setFormValues = event => {
        const {name, value} = event.target;

        setForm({
            ...form,
            [name]: {
                ...form[name],
                value: value
            }
        });
    };

    const formArray = Object.keys(form).map(el => {
        if(el !== 'description') {
            return (
                <React.Fragment>
                    <label>{form[el].label}</label>
                    <Input
                        style={{
                            marginBottom: '10px'
                        }}
                        action={setFormValues} 
                        elementType={form[el].type}
                        config={form[el].config}
                        value={form[el].value}
                        options={form[el].type === 'select' ? form[el].options : null}
                    />
                </React.Fragment>
            );
        };
    });

    const setChecked = (event) => {
        let checkedOptionsCopy = [...checkedOptions];
        const index = checkedOptionsCopy.indexOf(event.target.value);
        if(index === -1) {
            checkedOptionsCopy = [...checkedOptionsCopy, event.target.value];
        } else {
            checkedOptionsCopy.splice(index, 1); 
        };
        setCheckedOptions(checkedOptionsCopy);
    }

    const checkBoxArray = Object.keys(checkBoxForm).map(key => {
        return (
            <div className={styles.CheckBoxUnitContainer}>
                <label>{checkBoxForm[key].label}</label>
                <Input elementType={checkBoxForm[key].type} config={checkBoxForm[key].config} value={checkBoxForm[key].value} action={setChecked} />
            </div>
        )
    })
    console.log(checkedOptions);
    return (
        <section className={styles.NewProperty} >
            <h3>Adicionar propriedade</h3>
            <hr />
            <form>
                {formArray}
                <div className={styles.CheckBoxContainer}>
                    <h3>Serviços</h3>
                    {checkBoxArray}
                </div>
                <label>{form.description.label}</label>
                <Input
                    style={{
                        marginBottom: '10px'
                    }}
                    action={setFormValues} 
                    elementType={form.description.type}
                    config={form.description.config}
                    value={form.description.value}
                />
                <div className={styles.ButtonContainer}>
                    <Button><Link to='/listings'>Cancelar</Link></Button>
                    <Button>Adicionar</Button>
                </div>
            </form>
        </section>
    );
};

export default NewProperty;