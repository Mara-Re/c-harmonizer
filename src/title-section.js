import React from 'react';
import {Typography, Box} from '@material-ui/core';
import {useTitleSectionStyles} from './styles';

export default function TitleSection() {
    const titleSectionStyles = useTitleSectionStyles();
    return (
        <section>
            <Box display='flex'>
                <div className={titleSectionStyles.title}>
                    <Typography variant='h3' component='h1'gutterBottom>
                        c.Harmonizer
                    </Typography>
                    <Typography variant='h6' component='h2' gutterBottom>
                        Codon harmonizer tool - optimize your gene depending on source and target organism codon usages
                    </Typography>                    
                </div>                
                <img className={titleSectionStyles.logo} style={{height: '130px'}} src="/dna.png"></img>                       

            </Box>

        </section>
    )
}