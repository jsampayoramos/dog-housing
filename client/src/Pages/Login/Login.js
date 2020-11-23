import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as authActions from '../../store/actions/authActions';
import * as loadingActions from '../../store/actions/loadingActions';

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

    const [ errorState, setError ] = useState({
        status: false,
        message: ''
    })

    const dispatch = useDispatch();
    const history = useHistory();

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

    const submitLogin = async (event) => {
        event.preventDefault();
        dispatch(loadingActions.toggleLoading);
        const data = {
            email: loginData.email.value,
            password: loginData.password.value
        };
        
        try {
            const response = await axios({
                method: 'POST',
                url: '/auth/login',
                data
            })
            dispatch(loadingActions.toggleLoading);
            dispatch(authActions.login({
                token: response.data.token,
                userId: response.data.userId
            }))
            setError({
                status: false,
                message: ''
            });
            history.push('./dashboard');

        } catch(err) {
            dispatch(loadingActions.toggleLoading);
            setError({
                status: true,
                message: err.response.data.message
            });
        }
    };

    return (
        <section className={styles.Login}>
            <form className={styles.AuthBox} onSubmit={submitLogin}>
                <h3>Benvindo</h3>
                <hr />
                {loginForm}
                <p>Não te lembras da palavra pass? Carregue aqui.</p>
                {errorState.status ? <p className={styles.ErrorMessage}>{errorState.message}</p> : null}
                <Button>LOGIN</Button>
            </form>
        </section>
    );
};

export default Login;