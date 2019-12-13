import React from 'react';
import {Typography, TextField} from '@material-ui/core';
import {useDnaInputStyles} from './styles';

export default function DnaInputs() {
    const stylesDnaInputs = useDnaInputStyles();
    return (
        <section>
            <TextField 
                autoComplete='off' 
                variant='outlined' 
                id='gene' 
                label='Your gene of interest'
                multiline={true}
                rows={6}
                rowsMax={6}
                className={stylesDnaInputs.textArea} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                // onChange={e => this.handleChange(e)}
            />
            <br/>
            <TextField 
                autoComplete='off' 
                variant='outlined' 
                id='refsource' 
                label='Reference genes for your source organism'
                multiline={true}
                rows={6}
                rowsMax={6}
                className={stylesDnaInputs.textArea} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                // onChange={e => this.handleChange(e)}
            />
            <br/>
            <TextField 
                autoComplete='off' 
                variant='outlined' 
                id='reftarget' 
                label='Reference genes for your target organism'
                multiline={true}
                rows={6}
                rowsMax={6}
                className={stylesDnaInputs.textArea} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                // onChange={e => this.handleChange(e)}
            />

            
            <br/>
        </section>
    );
};