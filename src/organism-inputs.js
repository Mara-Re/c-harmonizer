import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputChange, submitInput, removeResults} from './actions';
import {Link} from 'react-router-dom';
import {TextField, Box, Typography} from '@material-ui/core';


import {useTextFieldStyles} from './styles';

export default function OrganismInputs() {
    const dispatch = useDispatch();
    const stylesTextField = useTextFieldStyles();
    const sourceOrganism = useSelector(state => {
        return state.sourceOrganism;
    });
    const targetOrganism = useSelector(state => {
        return state.targetOrganism;
    });
    const handleChange = e => {
        //Put into SESSION STORAGE
        try {
            sessionStorage.setItem(e.target.id, e.target.value); 
          } catch (e) {
            console.log('Error sessionStorage: ', e);
          }
        //put input into REDUX STATE:
        dispatch(inputChange(e.target.id, e.target.value));
    };

    return(
        <section>
            <TextField
                autoComplete='off' 
                variant='outlined' 
                id='sourceOrganism' 
                label='Your source organism'
                defaultValue={sourceOrganism}
                placeholder='e.g. Fragaria ananassa'
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace', fontStyle: 'italic'}}}
                onChange={e => handleChange(e)}
            />
            <br/>
            <TextField
                autoComplete='off' 
                variant='outlined' 
                id='targetOrganism' 
                label='Your target organism'
                defaultValue={targetOrganism}
                placeholder='e.g. Escherichia coli'
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace', fontStyle: 'italic'}}}
                onChange={e => handleChange(e)}
            />

        </section>
    )
}