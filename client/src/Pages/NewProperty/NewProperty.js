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
            options: ['Apartamento', 'Moradia/Vivenda'],
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
        )
    })

    return (
        <section className={styles.NewProperty} >
            <h3>Adicionar propriedade</h3>
            <hr />
            <form>
                {formArray}
                <div className={styles.ButtonContainer}>
                    <Button><Link to='/listings'>Cancelar</Link></Button>
                    <Button>Adicionar</Button>
                </div>
            </form>
        </section>
    );
};

export default NewProperty;