import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 

import Graph from './graph';
import HarmonizedGene from './harmonized-gene';
import TableCodonUsage from './table-codon-usage';

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
            <HarmonizedGene />            
            <Graph />
            <TableCodonUsage />
        </>
    );
};