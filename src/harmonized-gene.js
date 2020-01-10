import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {Typography, TextField, IconButton, Tooltip, Box, CircularProgress} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {exampleResults, exampleGeneName, exampleSourceOrganism, exampleTargetOrganism} from './example';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margWidth: {
        width: '400px',
        margin: '20px 20px 20px 0'
    },    
    spinner: {
        paddingTop: '30px',
        paddingLeft: '30px'
    }
}));

export default function HarmonizedGene(props) {
    const styles = useStyles();
    const inputRef = useRef();

    const harmonizedSeq = useSelector(state => {
        if (props.example) {
            return exampleResults.harmonizedGeneSeq;
        }
        return state.results && state.results.harmonizedGeneSeq;
    });

    const geneName = useSelector(state => {
        if (props.example) {
            return exampleGeneName;
        }
        return state.geneName && state.geneName.trim();
    });

    const sourceOrganism = useSelector(state => {
        if (props.example) {
            return exampleSourceOrganism;
        }
        return state.sourceOrganism && state.sourceOrganism.trim();
    });

    const targetOrganism = useSelector(state => {
        if (props.example) {
            return exampleTargetOrganism;
        }
        return state.targetOrganism && state.targetOrganism.trim();
    });

    const copyToClipBoard = function(e) {
        inputRef.current.children[1].children[0].select();
        document.execCommand('copy');
        inputRef.current.children[1].children[0].click();
        e.target.focus();
    };
    
    if (!harmonizedSeq) {
        return (
            <div className={styles.spinner}>
                <CircularProgress></CircularProgress>
            </div>
        );
    }

    return (
        <>
            <Typography variant='h6' component='h2' gutterBottom>
                {(geneName && `Harmonized ${geneName} sequence`) || 'Harmonized Sequence for Your Gene of Interest'}
            </Typography>            
            
            <Typography variant='body1' gutterBottom>
                {harmonizedSeq && `${harmonizedSeq.length / 3} codons`}
                {targetOrganism && `, harmonized for `}
                {targetOrganism && (<em>{targetOrganism}</em>)}
                {sourceOrganism && ` (source organism: `}
                {sourceOrganism && (<em>{sourceOrganism}</em>)}
                {sourceOrganism && `)`}
            </Typography> 
            
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
                    className={styles.margWidth} 
                    inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}

                />
                <Tooltip title="Copy to Clipboard" placement="right-start">
                    <IconButton aria-label="copy to clipboard"  onClick={e => copyToClipBoard(e)}>
                        <FileCopyIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
}