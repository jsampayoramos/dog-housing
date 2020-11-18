import React, { useState } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Signup.module.css';

const Signup = props => {
    const [signupForm, setSignupForm] = useState({
        name: {
            label: 'Nome Completo',
            type: 'input',
            config: {
                type: 'text',
                required: true,
                name: 'name'
            },
            value: ''
        },
        type: {
            label: 'Tipo de conta',
            type: 'select',
            config: {
                defaultValue: 'Anfitrião',
                name: 'type'
            },
            options: ['Anfitrião', 'Hóspede']
        },
        birthday: {
            label: 'Data de aniversário',
            type: 'date',
            config: {
                required: true,
                name: 'birthday'
            },
            value: ''
        },
        email: {
            label: 'E-mail',
            type: 'input',
            config: {
                type: 'email',
                required: true,
                name: 'email'
            },
            value: ''
        },
        password: {
            label: 'Password',
            type: 'input',
            config: {
                type: 'password',
                required: true,
                name: 'password'
            },
            value: ''
        },
        confirmPassword: {
            label: 'Confirm password',
            type: 'input',
            config: {
                type: 'password',
                required: true,
                name: 'confirmPassword'
            },
            value: ''
        }
    });

    const setFormValue = event => {
        if(event.target) {
            const { name, value } = event.target;

            return setSignupForm({
                ...signupForm,
                [name]: {
                    ...signupForm[name],
                    value: value
                }
            });
        };

        setSignupForm({
            ...signupForm,
            birthday: {
                ...signupForm.birthday,
                value: event
            }
        });

    }

    const signupFormArray = Object.keys(signupForm).map(el => {
        return (
            <div key={el} className={styles.InputContainer}>
                <label>{signupForm[el].label}</label>
                <Input
                    elementType={signupForm[el].type}
                    config={signupForm[el].config}
                    value={signupForm[el].value}
                    options={signupForm[el].options}
                    action={setFormValue}
                />
            </div>
        );
    });
    
    return (
        <section className={styles.Signup}>
            <form className={styles.SignupBox}>
                <h3>Junte-se à nossa comunidade</h3>
                <hr />
                {signupFormArray}
                <Button>Signup</Button>
            </form>
        </section>
    );
};

export default Signup;