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
    }
}));

export const useAppStyles = makeStyles(theme => ({
    marginT: {
        marginTop: '30px'
    }
}));

export const useTitleSectionStyles = makeStyles(theme => ({
    logo: {
        width: '150px'
    }
}));

export const useTextFieldStyles = makeStyles(theme => ({
    margWidth: {
        width: '400px',
        margin: '20px 0'
    }
}));

export const useBtnStyles = makeStyles(theme => ({
    submitBtn: {
        margin: '0 0 20px'
    }
}));