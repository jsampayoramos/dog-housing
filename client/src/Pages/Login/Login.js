import React, { useState } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Login.module.css';

const Login = props => {
    const [loginData, setLoginData] = useState({
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
        }
    });

    const setFormValues = (event) => {
        const {name, value} = event.target;

        setLoginData({
            ...loginData,
            [name]: {
                ...loginData[name],
                value: value
            }
        });
    };

    const loginForm = Object.keys(loginData).map(el => {
        return (
            <div key={el} className={styles.InputContainer}>
                <label>{loginData[el].label}</label>
                <Input 
                    elementType={loginData[el].type}
                    config={loginData[el].config}
                    value={loginData[el].value}
                    action={(event) => setFormValues(event)}
                />
            </div>
        );
    });

    return (
        <section className={styles.Login}>
            <form className={styles.AuthBox}>
                <h3>Benvindo</h3>
                <hr />
                {loginForm}
                <p>Não te lembras da palavra pass? Carregue aqui.</p>
                <Button>LOGIN</Button>
            </form>
        </section>
    );
};

export default Login;