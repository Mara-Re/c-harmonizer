import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography, Grid} from '@material-ui/core';

import TableCodonUsage from './table-codon-usage';
import {useStylesTable} from './styles.js';

export default function CodonUsage() {
    const stylesTable = useStylesTable();
    return(
        <section className={stylesTable.sect}> 
            <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                    <Typography variant='h6' component='h2'>
                        Codon Usage Scores Source Organism
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} >
                    <Typography variant='h6' component='h2'>
                        Codon Usage Scores Target Organism
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <div className={stylesTable.container}>
                        <TableCodonUsage data='sourceCodonScores'/>
                    </div>
                </Grid>
                <Grid item md={6} xs={12}>
                    <div className={stylesTable.container}>
                        <TableCodonUsage data='targetCodonScores'/>
                    </div>
                </Grid>
            </Grid>
        </section>
    )
}