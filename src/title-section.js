import React from 'react';
import {Typography} from '@material-ui/core';
import {useTitleSectionStyles} from './styles';

export default function TitleSection() {
    const titleSectionStyles = useTitleSectionStyles();
    return (
        <section>
            {/* <Box display='flex'>

            </Box> */}
            <Typography variant='h3' component='h1'gutterBottom>
                c.Harmonizer
            </Typography>
            <Typography variant='h6' component='h2'gutterBottom>
                My description of c.harmonizer
            </Typography>
            
            <img className={titleSectionStyles.logo} src="/dna.png"></img>                       

        </section>
    )
}