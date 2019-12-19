import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputChange, submitInput} from './actions';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import {useTextFieldStyles, useBtnStyles} from './styles';

let geneCleanedSeq;
let refSourceCleanedSeq;
let refTargetCleanedSeq;

export default function DnaInputs(props) {
    const stylesTextField = useTextFieldStyles();
    const stylesBtn = useBtnStyles();
    const dispatch = useDispatch();

    // function cleanSequence(userInput) {
    //     if (userInput == '' || userInput.trim() == '') {
    //         return;
    //     }
        
    // }

    const handleChange = e => {
        console.log('handleChang runs, e.target.value: ', e.target.value);
        //ADD changes to Input here, e.g. display of Codons?

        if (e.target.id == 'gene' ||e.target.id == 'refSource' ||e.target.id == 'refTarget') {
            if (e.target.value !== '') {
                
                //THIS HANDLING SHOULD BE MOVED TO useEffect!!?
                
                //if input is not empty:
    
                //-----FASTA handling---- do not modify input for the state, just do analysis for Warnings
                let seqArr = e.target.value.split('\n'); //split on new lines -> to check for fasta
                let geneArr;
                let joinedGenes;
                if (seqArr[0].startsWith('>')) {        //if gene or ref genes are entered in fasta format
                    geneArr = seqArr.reduce((acc, el) => {
                        if (el.startsWith('>')) {
                            return [...acc, []];
                        } else {                //returns an array of all the genes
                            return [...acc.splice(0, acc.length -1), acc[acc.length -1] + el];
                        }
                    }, []);
                    console.log('geneArr: ', geneArr);                    
                    joinedGenes = geneArr.join('');
                } else {    
                    joinedGenes = e.target.value;
                }
                //replace whitespace characters, convert to upper case and replace rna (U) to dna (T)
                joinedGenes = joinedGenes.replace(/\s/g,"").toUpperCase().replace(/U/g, 'T');

                
                //------USER DNA INPUT WARNINGS

                //WARNING if input contains characters other than ATCG (U)
                if ((/[^atgcu]/i).test(joinedGenes)) {
                    console.log('WARNING: does not match atgcu!');
                    //--> warning that these characters will be removed
                    //REMOVE CHARACTERS
                    joinedGenes = joinedGenes.replace(/[^atgcu]/ig, '');
                    console.log('characters replaced!: ', joinedGenes);
                }

                //WARNING: input DNA sequence is not divisible by 3
                if (joinedGenes.length % 3 != 0) {
                    console.log('warning: not devisible by 3!');     
                    //WARNING that these characters will be ignored;   
                    //REMOVE x characters at the end of the sequence!
                    const x = joinedGenes.length % 3;
                    joinedGenes = joinedGenes.slice(0, joinedGenes.length - x);
                    console.log('joinedGenes after char removing: ', joinedGenes);
                }
                
                //WARNING: input DNA sequence does not start with A
                if (!joinedGenes.startsWith('ATG')) {
                    console.log('WARNING: sequence does not start with a start codon');
                }

                //FOR GENE, optional
                // if (e.target.id == 'gene') {
                //     //if entered DNA contains stop codons -> warn user and ask whether they want to proceed
                // } 
                //FOR REFS, optional
                //Checking for Start/Stop codons only if fasta format was entered!
                console.log('joinedGenes: ', joinedGenes);
                if (e.target.id == 'gene') {
                    console.log('e.target.id == gene')
                    geneCleanedSeq = joinedGenes;
                } else if (e.target.id == 'refSource') {
                    refSourceCleanedSeq = joinedGenes;
                } else if (e.target.id == 'refTarget') {
                    refTargetCleanedSeq = joinedGenes;
                }
                
            }
        }
        //Put into SESSION STORAGE
        try {
            sessionStorage.setItem(e.target.id, e.target.value);
            console.log('sessionStorage.getItem(e.target.id): ', sessionStorage.getItem(e.target.id));  
          } catch (e) {
            console.log('Error sessionStorage: ', e);
          }
        //put input into REDUX STATE:
        dispatch(inputChange(e.target.id, e.target.value));
    };

    


    const gene = useSelector(state => {
        return state.gene;
    });

    const refSource = useSelector(state => {
        return state.refSource;
    });

    const refTarget = useSelector(state => {
        return state.refTarget;
    });

    function checkAndSubmitInput(gene, refSource, refTarget) {
        //handle empty input:
        console.log('gene: ', gene);
        console.log('refSource: ', refSource);
        console.log('refTarget: ', refTarget);
        if (!gene || !refSource || !refTarget) {
            console.log('gene empty!');
            return;
        }
        props.history.push('/results');
        dispatch(submitInput(gene, refSource, refTarget));
    }
    

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
                <Button
                    variant='contained'
                    color='primary'
                    className={stylesBtn.submitBtn}
                    onClick={() => checkAndSubmitInput(geneCleanedSeq, refSourceCleanedSeq, refTargetCleanedSeq)}
                >
                    Submit
                </Button>
        </section>
    );
};