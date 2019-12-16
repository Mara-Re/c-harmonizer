import { makeStyles } from '@material-ui/core';


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

export const useDnaInputStyles = makeStyles(theme => ({
    textArea: {
        width: '400px',
        margin: '20px 0'
    },
    submitBtn: {
        margin: '0 0 20px'
    }
}));