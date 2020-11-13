import React from 'react';

import styles from './Input.module.css';

const input = props => {
    switch(props.elementType) {
        case 'input':
            return <input className={styles.Input} style={props.style} {...props.config} value={props.value} />;
        case 'select':
            return (
                <select className={styles.Select} style={props.style} {...props.config}>
                    {props.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            );
        default: return null;
    };
};

export default input;