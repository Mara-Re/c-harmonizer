import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputChange, submitInput, removeResults} from './actions';
import {Link} from 'react-router-dom';
import {TextField, Box, Typography} from '@material-ui/core';
import {exampleSourceOrganism, exampleTargetOrganism, exampleGeneName} from './example';

import { makeStyles } from '@material-ui/core/styles';

const useTextFieldStyles = makeStyles(theme => ({
    margWidth: {
        width: '400px',
        margin: '20px 20px 20px 0'
    }
}));

export default function OrganismInputs(props) {
    const dispatch = useDispatch();
    const stylesTextField = useTextFieldStyles();
    const sourceOrganism = useSelector(state => {
        return state.sourceOrganism;
    });
    const targetOrganism = useSelector(state => {
        return state.targetOrganism;
    });
    const geneName = useSelector(state => {
        return state.geneName;
    });
    const handleChange = e => {
        //Put into SESSION STORAGE
        try {
            sessionStorage.setItem(e.target.id, e.target.value); 
          } catch (e) {
              //sessionStorage.setItem unsuccessful
          }
        //put input into REDUX STATE:
        dispatch(inputChange(e.target.id, e.target.value));
    };

    return(
        <section>
            <TextField
                InputProps={{
                    readOnly: props.example,
                }} 
                autoComplete='off' 
                variant='outlined' 
                id='sourceOrganism' 
                label='Your source organism'
                defaultValue={(!props.example && sourceOrganism) || (props.example && exampleSourceOrganism)}
                placeholder='e.g. Fragaria ananassa'
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace', fontStyle: 'italic'}}}
                onChange={e => {
                    !props.example && handleChange(e)
                }}
            />
            <br/>
            <TextField
                InputProps={{
                    readOnly: props.example,
                }} 
                autoComplete='off' 
                variant='outlined' 
                id='targetOrganism' 
                label='Your target organism'
                defaultValue={(!props.example && targetOrganism) || (props.example && exampleTargetOrganism)}
                placeholder='e.g. Escherichia coli'
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace', fontStyle: 'italic'}}}
                onChange={e => {
                    !props.example && handleChange(e)
                }}
            />
            <br/>
            <TextField
                InputProps={{
                    readOnly: props.example,
                }} 
                autoComplete='off' 
                variant='outlined' 
                id='geneName' 
                label='The name of your gene of interest'
                defaultValue={(!props.example && geneName) || (props.example && exampleGeneName)}
                placeholder='e.g. FAS1'
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                onChange={e => {
                    !props.example && handleChange(e)
                }}
            />

        </section>
    )
}