import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography} from '@material-ui/core';

import Graph from './graph';
import HarmonizedGene from './harmonized-gene';
import CodonUsage from './codon-usage';
import SmoothedScoreGraph from './smoothed-score-graph';

export default function Results() {  

    const results = useSelector(state => {
        return state.results 
    });

    useEffect(() => {
        try {
            results && sessionStorage.setItem('results', JSON.stringify(results));
          } catch (e) {
            console.log('Error sessionStorage results: ', e);
          }
    }, [results]);
  

    return (
        <>  
            <Typography variant='h4' component='h1' gutterBottom>
                Results
            </Typography>
            <HarmonizedGene />
            <SmoothedScoreGraph />            
            <Graph />
            <CodonUsage />
        </>
    );
};