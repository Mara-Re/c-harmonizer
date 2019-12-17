import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputChange, submitInput} from './actions';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import {useTextFieldStyles, useBtnStyles} from './styles';

export default function DnaInputs() {
    const stylesTextField = useTextFieldStyles();
    const stylesBtn = useBtnStyles();
    const dispatch = useDispatch();

    const handleChange = e => {
        console.log('handleChang runs, e.target.value: ', e.target.value);
        //ADD changes to Input here, e.g. display of Codons?
        if (e.target.id == 'gene' ||e.target.id == 'refSource' ||e.target.id == 'refTarget') {
            //remove spaces and newlines
            //change display of codons with spaces and capital letters
            //warnings if input contains characters other than ATCG
            //warnings if not divisible by 3
        }
        //Put into SESSION STORAGE
        try {
            sessionStorage.setItem(e.target.id, e.target.value);
            console.log('sessionStorage.getItem(e.target.id): ', sessionStorage.getItem(e.target.id));  
          } catch (e) {
            console.log('Error sessionStorage: ', e);
          }
        //put input into redux state:
        dispatch(inputChange(e.target.id, e.target.value));
    };

    useEffect(() => {

    }, []);

    //USER DNA INPUT WARNING
    //Does entered DNA sequence start with ATG? -> warning if not
    //Is entered DNAseq.length % 3 === 0? -> warning if not
    //if entered DNA contains stop codons -> warn user and ask whether they want to proceed

    //USER DNA INPUT HANDLING
    //handle that user might ender rna or dna sequences U or T!
    //handle that user might enter upper or lowercase dna sequences
    //handle that user might enter dna/rna in fasta format
    //ignore new line characters and spaces!


    const gene = useSelector(state => {
        return state.gene;
    });

    const refSource = useSelector(state => {
        return state.refSource;
    });

    const refTarget = useSelector(state => {
        return state.refTarget;
    });

    
    return (
        <section>
            <TextField 
                autoComplete='off' 
                variant='outlined' 
                id='gene' 
                label='Your gene of interest'
                defaultValue={gene}
                placeholder='ATG...'
                multiline={true}
                rows={6}
                rowsMax={6}
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                onChange={e => handleChange(e)}
            />
            <br/>
            <TextField 
                autoComplete='off' 
                variant='outlined' 
                id='refSource' 
                label='Reference genes for your source organism'
                defaultValue={refSource}
                placeholder='ATG...'
                multiline={true}
                rows={6}
                rowsMax={6}
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                onChange={e => handleChange(e)}
            />
            <br/>
            <TextField 
                autoComplete='off' 
                variant='outlined' 
                id='refTarget' 
                label='Reference genes for your target organism'
                defaultValue={refTarget}
                placeholder='ATG...'
                multiline={true}
                rows={6}
                rowsMax={6}
                className={stylesTextField.margWidth} 
                inputProps={{style: {fontFamily:'Roboto mono, monospace'}}}
                onChange={e => handleChange(e)}
            />
            <br/>
            <Link to='/results'>
                <Button
                    className={stylesBtn.submitBtn}
                    onClick={() => dispatch(submitInput(gene, refSource, refTarget))}
                >
                    Submit
                </Button>
            </Link>
        </section>
    );
};