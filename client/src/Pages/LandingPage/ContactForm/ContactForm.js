import React, { useState } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import styles from './ContactForm.module.css';

const ContactForm = props => {
    const [contactForm, setContactForm] = useState({
        name: {
            label: 'Name',
            type: 'input',
            config: {
                required: true,
                type: 'text',
                name: 'name'
            },
            value: ''
        },
        email: {
            label: 'E-mail',
            type: 'input',
            config: {
                required: true,
                type: 'email',
                name: 'email'
            },
            value: ''
        },
        message: {
            label: 'Mensagem',
            type: 'textarea',
            config: {
                required: true,
                type: 'email',
                name: 'message'
            },
            value: ''
        }
    });

    const setFormValues = event => {
        const { name, value } = event.target;
        setContactForm({
            ...contactForm,
            [name]: {
                ...contactForm[name],
                value: value
            }
        });
    };

    const contactFormArray = Object.keys(contactForm).map(el => {
        return (
            <div key={el} className={styles.InputContainer}>
                <label className={styles[el]}>{contactForm[el].label}</label>
                <Input 
                    elementType={contactForm[el].type}
                    config={contactForm[el].config}
                    value={contactForm[el].value}
                    action={(event) => setFormValues(event)}
                />
            </div>
        );
    });
    
    return (
        <section className={styles.ContactForm}>
            <h2>Contacte-nos</h2>
            <hr />
            <form className={styles.ContactFormBox}>
                {contactFormArray}
                <Button>Submeter</Button>
            </form>
        </section>
    );
};

export default ContactForm;