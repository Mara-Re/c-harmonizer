import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputChange, submitInput, removeResults} from './actions';
import {Link} from 'react-router-dom';
import {TextField, Button, Tooltip, Box, IconButton, Typography} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import {inputHandling} from './input-handling';
import {exampleGene, exampleRefSource, exampleRefTarget} from './example';
import {
    geneExplanation, 
    geneExampleExplanation, 
    refSourceExplanation, 
    refSourceExampleExplanation, 
    refTargetExplanation, 
    refTargetExampleExplanation
} from './input-explanations';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margWidth: {
        width: '400px',
        margin: '20px 20px 20px 0'
    },
    expl: {
        width: '300px', 
        marginLeft: '20px'
    },
    submitBtn: {
        margin: '10px 0 60px',
        width: '400px'
    }
}));

let geneCleanedSeq;
let refSourceCleanedSeq;
let refTargetCleanedSeq;

export default function DnaInputs(props) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const [errorGene, setErrorGene] = useState({
        error: false,
        helperTxt: '',
        key: 'key1'
    });
    const [errorRefSource, setErrorRefSource] = useState({
        error: false,
        helperTxt: '',
        key: 'key2'
    });
    const [errorRefTarget, setErrorRefTarget] = useState({
        error: false,
        helperTxt: '',
        key: 'key3'
    }); 
    
    const [showGeneExplanation, setShowGeneExplanation] = useState(false);
    const [showRefSourceExplanation, setShowRefSourceExplanation] = useState(false);
    const [showRefTargetExplanation, setShowRefTargetExplanation] = useState(false);

    const gene = useSelector(state => {
        return state.gene;
    });

    const refSource = useSelector(state => {
        return state.refSource;
    });

    const refTarget = useSelector(state => {
        return state.refTarget;
    }); 
       
    let key1Nr = 0;
    let key2Nr = 0;
    let key3Nr = 0;

    useEffect(() => {
        const handledInput = inputHandling(gene);
        geneCleanedSeq = handledInput && handledInput.cleanedSeq;
        key1Nr = key1Nr + 1;
        if (handledInput && handledInput.userInputWarning) {
            setErrorGene({
                error: true,
                helperTxt: handledInput.userInputWarning,
                key: `key1${key1Nr + 1}`
            });
        } else {
            setErrorGene({
                error: false,
                helperTxt: '',
                key: `key1${key1Nr + 1}`
            });
        }
    }, [gene]);

    useEffect(() => {
        const handledInput = inputHandling(refSource);
        refSourceCleanedSeq = handledInput && handledInput.cleanedSeq;
        key2Nr = key2Nr + 1;
        if (handledInput && handledInput.userInputWarning) {
            setErrorRefSource({
                error: true,
                helperTxt: handledInput.userInputWarning,
                key: `key2${key2Nr + 1}`
            });
        } else {
            setErrorRefSource({
                error: false,
                helperTxt: '',
                key: `key2${key2Nr + 1}`
            });
        }
    }, [refSource]);

    useEffect(() => {
        const handledInput = inputHandling(refTarget);
        refTargetCleanedSeq = handledInput && handledInput.cleanedSeq;
        key3Nr = key3Nr + 1;
        if (handledInput && handledInput.userInputWarning) {
            setErrorRefTarget({
                error: true,
                helperTxt: handledInput.userInputWarning,
                key: `key3${key3Nr + 1}`
            });
        } else {
            setErrorRefTarget({
                error: false,
                helperTxt: '',
                key: `key3${key3Nr + 1}`
            });
        }
    }, [refTarget]);

    useEffect(() => {
        if (!geneCleanedSeq || !refSourceCleanedSeq || !refTargetCleanedSeq) {
            setButtonIsDisabled(true);
        } else {
            setButtonIsDisabled(false);
        }
    }, [geneCleanedSeq, refSourceCleanedSeq, refTargetCleanedSeq]);

    const handleChange = e => {
        //Put into SESSION STORAGE
        try {
            sessionStorage.setItem(e.target.id, e.target.value); 
          } catch (e) {
              //storing user input in sessionStorage not possible
          }
        //put input into REDUX STATE:
        dispatch(inputChange(e.target.id, e.target.value));
    };

    function checkAndSubmitInput(gene, refSource, refTarget) {
        //handle empty input:
        if (props.example) {
            props.history.push('/example/results');
            // dispatch(submitExampleInput(exampleGene, exampleRefSource, exampleRefTarget));
            return;
        }
        if (!gene || !refSource || !refTarget) {
            return;
        } 
        sessionStorage.removeItem('results');
        dispatch(removeResults());
        dispatch(submitInput(gene, refSource, refTarget));
        props.history.push('/results');
    }

    function toggleGeneExplanation() {
        setShowGeneExplanation(!showGeneExplanation);
    }

    function toggleRefSourceExplanation() {
        setShowRefSourceExplanation(!showRefSourceExplanation);
    }

    function toggleRefTargetExplanation() {
        setShowRefTargetExplanation(!showRefTargetExplanation);
    }

    

    return (
        <section>
            <Box display='flex' alignItems='center'>
                <TextField
                   InputProps={{
                        readOnly: props.example,
                    }}
                    error={(!props.example && errorGene.error)}
                    helperText={(!props.example && errorGene.helperTxt)}
                    key={errorGene.key}
                    autoComplete='off' 
                    variant='outlined' 
                    id='gene' 
                    label='Your gene of interest sequence'
                    defaultValue={(!props.example && gene) || (props.example && exampleGene)}
                    placeholder='ATG...'
                    multiline={true}
                    rows={6}
                    rowsMax={6}
                    className={styles.margWidth} 
                    inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                    onChange={e => {
                        !props.example && handleChange(e)
                    }}
                />
                
                <Tooltip title="Explanation" placement="top">
                    <IconButton aria-label="explanation" color='primary'  onClick={e => toggleGeneExplanation()}>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
                {showGeneExplanation && 
                    <div className={styles.expl}>
                        <Typography variant='body2' color='primary' gutterBottom>
                            {(props.example && geneExampleExplanation) || geneExplanation} 
                        </Typography>
                    </div>                
                }    
            </Box>
            
            <Box display='flex' alignItems='center'>
                <TextField
                    InputProps={{
                        readOnly: props.example,
                    }} 
                    error={(!props.example && errorRefSource.error)}
                    helperText={(!props.example && errorRefSource.helperTxt)}
                    key={errorRefSource.key}
                    autoComplete='off' 
                    variant='outlined' 
                    id='refSource' 
                    label='Reference sequences for your source organism'
                    defaultValue={(!props.example && refSource) || (props.example && exampleRefSource)}
                    placeholder='ATG...'
                    multiline={true}
                    rows={6}
                    rowsMax={6}
                    className={styles.margWidth} 
                    inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                    onChange={e => {
                        !props.example && handleChange(e)
                    }}
                />
                
                <Tooltip title="Explanation" placement="top">
                    <IconButton aria-label="explanation" color='primary' onClick={e => toggleRefSourceExplanation(e)}>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
                {showRefSourceExplanation && 
                    <div className={styles.expl}>
                        <Typography variant='body2' color='primary' gutterBottom>
                            {(props.example && refSourceExampleExplanation) || refSourceExplanation} 
                        </Typography>
                    </div>                
                }                
            </Box>
            
            <Box display='flex' alignItems='center'>
                <TextField 
                    InputProps={{
                        readOnly: props.example,
                    }}
                    error={(!props.example && errorRefTarget.error)}
                    helperText={(!props.example && errorRefTarget.helperTxt)}
                    key={errorRefTarget.key}
                    autoComplete='off' 
                    variant='outlined' 
                    id='refTarget' 
                    label='Reference sequences for your target organism'
                    defaultValue={(!props.example && refTarget) || (props.example && exampleRefTarget)}
                    placeholder='ATG...'
                    multiline={true}
                    rows={6}
                    rowsMax={6}
                    className={styles.margWidth} 
                    inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                    onChange={e => {
                        !props.example && handleChange(e)
                    }}
                />                
                <Tooltip title="Explanation" placement="top">
                    <IconButton aria-label="explanation" color='primary' onClick={e => toggleRefTargetExplanation()}>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
                {showRefTargetExplanation && 
                    <div className={styles.expl}>
                        <Typography variant='body2' color='primary' gutterBottom>
                            {(props.example && refTargetExampleExplanation) || refTargetExplanation}                         </Typography>
                    </div>                
                }                
            </Box>
            
            <Button
                variant='contained'
                color='primary'
                disabled={(!props.example && buttonIsDisabled) || false}
                className={styles.submitBtn}
                onClick={() => checkAndSubmitInput(geneCleanedSeq, refSourceCleanedSeq, refTargetCleanedSeq)}
            >
                {(props.example && 'Show Example Results') || 'Submit'}
            </Button>
        </section>
    );
};