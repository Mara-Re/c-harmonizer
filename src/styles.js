import { makeStyles } from '@material-ui/core';

export const useGlobalStyles = makeStyles(theme => ({
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

export const useNavbarStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    // navbarLogo: {
    //     height: '40px',
    //     // width: '40px',
    //     paddingRight: '10px',
    // },
    flexContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    navbarTop: {
        background: theme.palette.primary.dark,
        width: '100vw',
        height: '14px'
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

export const useAppStyles = makeStyles(theme => ({
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

export const useTitleSectionStyles = makeStyles(theme => ({
    title: {
        width: '500px',
        marginBottom: '50px'
    }, 
    margTop: {
        marginTop: '30px'
    }
}));

export const useTextFieldStyles = makeStyles(theme => ({
    margWidth: {
        width: '400px',
        margin: '20px 20px 20px 0'
    }
}));

export const useBtnStyles = makeStyles(theme => ({
    submitBtn: {
        margin: '10px 0 60px',
        width: '400px'
    }
}));

export const useStylesChart = makeStyles(theme => ({
    container: {
        height: '250px',
        width: '100%',
        overflowX: 'scroll',
        padding: '5px 0'
    },
    sect: {
        padding: '50px 0 0'
    }
}));

export const useStylesTable = makeStyles(theme => ({
    container: {
        width: '60%',
        minWidth: '400px',
        overflowY: 'scroll',
        padding: '10px 0'      
    },
    sect: {
        padding: '50px 0'
    }
}));


