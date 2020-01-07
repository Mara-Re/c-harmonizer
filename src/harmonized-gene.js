import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {Typography, TextField, IconButton, Tooltip, Box} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {exampleResults} from './example';
import { makeStyles } from '@material-ui/core/styles';

const useTextFieldStyles = makeStyles(theme => ({
    margWidth: {
        width: '400px',
        margin: '20px 20px 20px 0'
    }
}));

export default function HarmonizedGene(props) {
    const stylesTextField = useTextFieldStyles();
    const inputRef = useRef();

    const harmonizedSeq = useSelector(state => {
        console.log('state useSelector entered');
        console.log('props.example: ', props.example);
        if (props.example) {
            console.log(' if (props.example) in harmonizedSeq useSelector entered');
            return exampleResults.harmonizedGeneSeq;
        }
        return state.results && state.results.harmonizedGeneSeq;
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
            {/* <Typography variant='body1' gutterBottom>
                x codons, harmonized for organismX, source organismY
            </Typography> */}
            <Box display='flex' alignItems='center'>
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
                <Tooltip title="Copy to Clipboard" placement="right-start">
                    <IconButton aria-label="copy to clipboard"  onClick={e => copyToClipBoard(e)}>
                        <FileCopyIcon />
                    </IconButton>
                </Tooltip>
                {/* <Button variant="contained" color='primary' onClick={e => copyToClipBoard(e)}><FileCopyIcon/> Copy to Clipboard</Button> */}
            </Box>
        </>
    );
}