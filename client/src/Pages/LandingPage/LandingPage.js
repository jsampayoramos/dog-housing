import React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import ContactForm from './ContactForm/ContactForm';

import styles from './LandingPage.module.css';

const landingPage = props => {
    return (
        <React.Fragment>
            <section className={styles.LandingPage}>
                <SearchBar />
                <h1>Onde deixar o seu animal de estimação quando vai de férias?</h1>
                <hr></hr>
                <h3>Aqui conseguirá encontrar o melhor alojamento para o seu animal de estimação em Portugal</h3>
            </section>
            <ContactForm />
        </React.Fragment>
    );
};

export default landingPage;