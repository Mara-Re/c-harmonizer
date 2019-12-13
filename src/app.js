import React from 'react';
import {Typography, Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useAppStyles} from './styles';
import Navbar from './navbar';
import TitleSection from './title-section';
import DnaInputs from './dna-inputs';

export default function App() {
    const appStyles = useAppStyles();
    return (
        <>
            <CssBaseline />
            <Navbar />
            <Container className={appStyles.marginT}>
                <TitleSection />
                <DnaInputs />
            </Container>
        </>
    );
}