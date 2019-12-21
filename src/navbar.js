import React from 'react';
import {useNavbarStyles} from './styles';
import { Typography, AppBar, Toolbar, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function Navbar(props) {
    const navbarStyles = useNavbarStyles();
    return(
        <AppBar position="sticky" >
            <Container>
                <div className={navbarStyles.flexContainer}>
                    <Toolbar className={navbarStyles.noPadding}>
                        {/* <img className={navbarStyles.navbarLogo} src="/dna.png"></img>                        */}
                        <Link to='/' className={navbarStyles.noTextDec}>
                            <Typography variant="h6" className={navbarStyles.navbarText}>
                                c.Harmonizer
                            </Typography>
                        </Link>
                    </Toolbar>
                    <Toolbar className={navbarStyles.noPadding}>
                        <Link to='/example' className={navbarStyles.noTextDec}>
                            <Typography variant="button" className={navbarStyles.navbarText}>
                                Example
                            </Typography>                 
                        </Link>
                        
                    </Toolbar>
                                
                </div>
            </Container>
        </AppBar>
    )
}