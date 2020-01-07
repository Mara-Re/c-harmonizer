import React from 'react';
import { Typography, AppBar, Toolbar, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useNavbarStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    flexContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    noPadding: {
        padding: '0'
    },
    navbarText: {
        paddingRight: '20px',
        cursor: 'pointer',
        '&:hover': {
            color: '#cfd8dc',
            textDecoration: 'none'
        },
        color: theme.palette.primary.contrastText,
        textDecoration: 'none'
    },
    noTextDec: {
        textDecoration: 'none'
    }
}));

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