import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useTitleSectionStyles = makeStyles(theme => ({
    title: {
        width: '500px',
        marginBottom: '50px'
    }, 
    margTop: {
        marginTop: '30px'
    }
}));

export default function TitleSection() {
    const titleSectionStyles = useTitleSectionStyles();
    return (
        <section>
            <div className={titleSectionStyles.title}>
                <Typography variant='h3' component='h1'gutterBottom> 
                    Codon harmonizer tool
                </Typography>
                <Typography variant='h6' component='h2' gutterBottom className={titleSectionStyles.margTop}>
                    Optimize your gene depending on source and target organism codon usages
                </Typography>                    
            </div>
        </section>
    )
}