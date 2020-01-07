import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography, CircularProgress} from '@material-ui/core';
import Graph from './graph';
import HarmonizedGene from './harmonized-gene';
import CodonUsage from './codon-usage';
import SmoothedScoreGraph from './smoothed-score-graph';

export default function Results({example}) {  

    const results = useSelector(state => {
        return state.results 
    });

    useEffect(() => {
        try {
            results && sessionStorage.setItem('results', JSON.stringify(results));
          } catch (e) {
              //setItem sessionStorage unsuccessful
          }
    }, [results]);
  
    if (!example && !results) {
        return (
            <div>
                <CircularProgress ></CircularProgress>
            </div>
        );
    }

    return (
        <>  
            <Typography variant='h4' component='h1' gutterBottom>
                {example && 'Example '}Results
            </Typography>
            <HarmonizedGene 
                example={example}
            />
            <SmoothedScoreGraph 
                example={example}
            />            
            <Graph 
                example={example}
            />
            <CodonUsage 
                example={example}
            />
        </>
    );
};