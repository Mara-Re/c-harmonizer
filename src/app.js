import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Typography, Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useAppStyles} from './styles';
import Navbar from './navbar';
import TitleSection from './title-section';
import DnaInputs from './dna-inputs';
import OrganismInputs from './organism-inputs';
import Results from './results';

import {useGlobalStyles } from './styles';


export default function App(props) {
    const globalStyles = useGlobalStyles();
    const appStyles = useAppStyles();
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <Container className={appStyles.marginT}>
                    <Route
                        exact path='/'
                        render={(props) => (
                            <>
                                <TitleSection />
                                <OrganismInputs />
                                <DnaInputs {...props} />
                            </>
                        )}
                    />
                    <Route
                        exact path='/results'
                        render={() => (
                            <>
                                <Results />
                            </>
                        )}
                    />

                </Container>
                <footer className={appStyles.foot}>
                    {/* <Container>
                        footer
                    </Container> */}
                </footer>
            </BrowserRouter>
        </>
    );
}