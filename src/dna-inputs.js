import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputChange, submitInput, removeResults} from './actions';
import {Link} from 'react-router-dom';
import {TextField, Button, Tooltip, Box, IconButton, Typography} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import {exampleGene, exampleRefSource, exampleRefTarget} from './example';
import {
    geneExplanation, 
    geneExampleExplanation, 
    refSourceExplanation, 
    refSourceExampleExplanation, 
    refTargetExplanation, 
    refTargetExampleExplanation
} from './input-explanations';


import {useTextFieldStyles, useBtnStyles} from './styles';

let geneCleanedSeq;
let refSourceCleanedSeq;
let refTargetCleanedSeq;

export default function DnaInputs(props) {
    const stylesTextField = useTextFieldStyles();
    const stylesBtn = useBtnStyles();
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
        const data = cleanSequence(gene);
        geneCleanedSeq = data && data.cleanedSeq;
        key1Nr = key1Nr + 1;
        if (data && data.errors && data.errors.length > 0) {
            setErrorGene({
                error: true,
                helperTxt: data.errors.join(' '),
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
        const data = cleanSequence(refSource);
        refSourceCleanedSeq = data && data.cleanedSeq;
        key2Nr = key2Nr + 1;
        if (data && data.errors.length > 0) {
            setErrorRefSource({
                error: true,
                helperTxt: data.errors.join(' '),
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
        const data = cleanSequence(refTarget);
        refTargetCleanedSeq = data && data.cleanedSeq;
        key3Nr = key3Nr + 1;
        if (data && data.errors.length > 0) {
            setErrorRefTarget({
                error: true,
                helperTxt: data.errors.join(' '),
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
            console.log('Error sessionStorage: ', e);
          }
        //put input into REDUX STATE:
        dispatch(inputChange(e.target.id, e.target.value));
    };

    function cleanSequence(userInput) {
        if (!userInput || userInput == '' || userInput.trim() == '') {
            return undefined;
        }
        //if input is not empty:    
        //-----FASTA handling--------- 
        let seqArr = userInput.trim().split('\n'); //split on new lines -> to check for fasta
        let geneArr;
        let joinedGenes;
        let errors = [];
        if (seqArr[0].startsWith('>')) {        //if gene or ref genes are entered in fasta format
            geneArr = seqArr.reduce((acc, el) => {
                if (el.startsWith('>')) {
                    return [...acc, []];
                } else {                //returns an array of all the genes
                    return [...acc.splice(0, acc.length -1), acc[acc.length -1] + el];
                }
            }, []);           
            joinedGenes = geneArr.join('');
        } else {    
            joinedGenes = userInput;
        }
        //replace whitespace characters, convert to upper case and replace rna (U) to dna (T)
        joinedGenes = joinedGenes.replace(/\s/g,"").toUpperCase().replace(/U/g, 'T');

        
        //------USER DNA INPUT WARNINGS

        //WARNING if input contains characters other than ATCG (U)
        if ((/[^atgcu]/i).test(joinedGenes)) {
            errors.push('Your sequence contains characters other than ATGC/AUGC which will be ignored.')
            //REMOVE CHARACTERS
            joinedGenes = joinedGenes.replace(/[^atgcu]/ig, '');
        }

        //WARNING: input DNA sequence is not divisible by 3
        if (joinedGenes.length % 3 != 0) {
            //REMOVE x characters at the end of the sequence
            const x = joinedGenes.length % 3;
            errors.push('Your gene sequence is not divisible by 3. Therefore, the last ' + x + ' bases will be ignored.');     
            joinedGenes = joinedGenes.slice(0, joinedGenes.length - x);
        }
        
        //WARNING: input DNA sequence does not start with A
        if (!joinedGenes.startsWith('ATG')) {
            errors.push('Your sequence does not start with a start codon.');
        }
        return {
            cleanedSeq: joinedGenes,
            errors: errors
        };

        //FOR GENE, optional
        //if entered DNA contains stop codons -> warn user and ask whether they want to proceed
        //FOR REFS, optional
        //Checking for Start/Stop codons only if fasta format was entered!
    }    

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
                    label='Your gene of interest'
                    defaultValue={(!props.example && gene) || (props.example && exampleGene)}
                    placeholder='ATG...'
                    multiline={true}
                    rows={6}
                    rowsMax={6}
                    className={stylesTextField.margWidth} 
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
                    <div style={{width: '300px', marginLeft: '20px'}}>
                        <Typography variant='body2' color='primary' gutterBottom>
                            {(props.example && geneExampleExplanation) || geneExplanation} 
                        </Typography>
                    </div>                
                }    
            </Box>
            
            <br/>
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
                    label='Reference genes for your source organism'
                    defaultValue={(!props.example && refSource) || (props.example && exampleRefSource)}
                    placeholder='ATG...'
                    multiline={true}
                    rows={6}
                    rowsMax={6}
                    className={stylesTextField.margWidth} 
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
                    <div style={{width: '300px', marginLeft: '20px'}}>
                        <Typography variant='body2' color='primary' gutterBottom>
                            {(props.example && refSourceExampleExplanation) || refSourceExplanation} 
                        </Typography>
                    </div>                
                }                
            </Box>
        
            <br/>
            
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
                    label='Reference genes for your target organism'
                    defaultValue={(!props.example && refTarget) || (props.example && exampleRefTarget)}
                    placeholder='ATG...'
                    multiline={true}
                    rows={6}
                    rowsMax={6}
                    className={stylesTextField.margWidth} 
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
                    <div style={{width: '300px', marginLeft: '20px'}}>
                        <Typography variant='body2' color='primary' gutterBottom>
                            {(props.example && refTargetExampleExplanation) || refTargetExplanation}                         </Typography>
                    </div>                
                }                
            </Box>
            
            <br/>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={buttonIsDisabled}
                    className={stylesBtn.submitBtn}
                    onClick={() => checkAndSubmitInput(geneCleanedSeq, refSourceCleanedSeq, refTargetCleanedSeq)}
                >
                    {(props.example && 'Show Example Results') || 'Submit'}
                </Button>
        </section>
    );
};