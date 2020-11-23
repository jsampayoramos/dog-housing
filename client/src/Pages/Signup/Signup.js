import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as loadingActions from '../../store/actions/loadingActions';
import * as validators from '../../utilities/validators';

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
            options: ['Anfitrião', 'Hóspede'],
            value: 'Anfitrião'
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
                name: 'password',
                minLength: 8,
            },
            value: ''
        },
        confirmPassword: {
            label: 'Confirm password',
            type: 'input',
            config: {
                type: 'password',
                required: true,
                name: 'confirmPassword',
                minLength: 8
            },
            value: ''
        }
    });

    const [errorState, setError] = useState({
        status: false,
        message: ''
    });

    const dispatch = useDispatch();

    const history = useHistory();

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
    
    const setFormToEmpty = () => {
        const signupFormCopy = {
            ...signupForm
        };

        for(let key in signupFormCopy) {
            if(key === 'type') {
                signupFormCopy[key].value = 'Anfitrião';    
            } else {
                signupFormCopy[key].value = '';
            }
        }

        setSignupForm(signupFormCopy);
    }

    const onSignup = async event => {
        event.preventDefault();
        dispatch(loadingActions.toggleLoading);

        let data = {
            name: signupForm.name.value,
            accountType: signupForm.type.value,
            birthday: signupForm.birthday.value,
            email: signupForm.email.value,
            password: signupForm.password.value,
            confirmPassword: signupForm.confirmPassword.value
        };

        try {
            const passwordConfirmation = validators.passwordCheck(data.password, data.confirmPassword);

            if(!passwordConfirmation) {
                const error = new Error('Validação falhou');
                error.response = {
                    data: {
                        message: 'Palavras pass não são condizentes' 
                    }
                }
                throw error;
            }

            await axios({
                method: 'PUT',
                url: '/auth/signup',
                data: data
            });

            dispatch(loadingActions.toggleLoading);
            setError({status: false, message: ''});
            setFormToEmpty();
            history.push('/login');
        } catch (error) {
            dispatch(loadingActions.toggleLoading);
            setError({ status: true, message: error.response.data.message });
        };
    };

    return (
        <section className={styles.Signup}>
            <form className={styles.SignupBox} onSubmit={onSignup}>
                <h3>Junte-se à nossa comunidade</h3>
                <hr />
                {signupFormArray}
                {errorState ? <p>{errorState.message}</p> : null}
                <Button>Signup</Button>
            </form>
        </section>
    );
};

export default Signup;