import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Typography, Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './navbar';
import TitleSection from './title-section';
import DnaInputs from './dna-inputs';
import OrganismInputs from './organism-inputs';
import Results from './results';
import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles(theme => ({
    '@global': {
        //SCROLL BAR DISPLAY:
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.3)',
          outline: '1px solid slategrey'
        }
    }
}));

const useAppStyles = makeStyles(theme => ({
    marginT: {
        marginTop: '30px'
    },
    foot: {
        background: '#45748C',
        color: '#FFFFFF',
        height: '40px',
        display:'flex',
        alignItems: 'center', 
        position: 'absolute',
        bottom: '0'
    }
}));


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
                    <Route
                        exact path='/example'
                        render={(props) => (
                            <>
                                <TitleSection />
                                <OrganismInputs example={true}/>
                                <DnaInputs 
                                    {...props} 
                                    example={true}
                                />
                            </>
                        )}
                    />
                    <Route
                        exact path='/example/results'
                        render={() => (
                            <>
                                <Results example={true}/>
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