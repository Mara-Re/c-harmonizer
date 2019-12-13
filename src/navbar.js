import React from 'react';
import {useNavbarStyles} from './styles';
import { Typography, AppBar, Toolbar, Container } from '@material-ui/core';

export default function Navbar(props) {
    const navbarStyles = useNavbarStyles();
    return(
        <AppBar position="sticky" >
            <Container>
                <div className={navbarStyles.flexContainer}>
                    <Toolbar className={navbarStyles.noPadding}>
                        {/* <img className={navbarStyles.navbarLogo} src="/dna.png"></img>                        */}
                        <Typography variant="h6" >
                            c.Harmonizer
                        </Typography>
                    </Toolbar>
                    <Toolbar className={navbarStyles.noPadding}>
                        {/* LINKS TO NAVIGATE */}
                    </Toolbar>
                                
                </div>
            </Container>
        </AppBar>
    )
}