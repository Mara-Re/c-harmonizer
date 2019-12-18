import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {Typography, TextField, Button} from '@material-ui/core';
import {useTextFieldStyles } from './styles';

export default function HarmonizedGene() {
    const stylesTextField = useTextFieldStyles();
    const inputRef = useRef();

    const harmonizedSeq = useSelector(state => {
        return state.results && state.results.harmonizedGeneSeq
    });

    const copyToClipBoard = function(e) {
        inputRef.current.children[1].children[0].select();
        document.execCommand('copy');
        inputRef.current.children[1].children[0].click();
        e.target.focus();
    };
    
    if (!harmonizedSeq) {
        return null //OR SPINNER!
    }

    return (
        <>
            <Typography variant='h6' component='h2' gutterBottom>
                Harmonized Gene of Interest
            </Typography>
            <Typography variant='body1' gutterBottom>
                x codons, harmonized for organismX, source organismY
            </Typography>
            <TextField 
                InputProps={{
                    readOnly: true,
                }}
                variant='outlined' 
                id='harmonizedSeq' 
                label='Harmonized sequence'
                ref={inputRef}
                defaultValue={harmonizedSeq}
                multiline={true}
                rows={6}
                rowsMax={6}
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}

            />
            <Button onClick={e => copyToClipBoard(e)}>Copy to Clipboard</Button>
        </>
    );
}