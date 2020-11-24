import React from 'react';
import DatePicker from 'react-datepicker';

import styles from './Input.module.css';
import './Input.css';

const input = props => {
    switch(props.elementType) {
        case 'input':
            return <input className={styles.Input} style={props.style} {...props.config} value={props.value} onChange={props.action} />;
        case 'select':
            return (
                <select className={styles.Select} style={props.style} {...props.config}>
                    {props.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            );
        case 'date':
            return (
                <DatePicker {...props.config} selected={props.value} className={props.className} onChange={props.action} />
            );
        case 'textarea':
            return <textarea className={styles.Textarea}>{props.value}</textarea>;
        case 'checkbox':
            return <input {...props.config} value={props.value} onChange={props.action} />
        default: return null;
    };
};

export default input;