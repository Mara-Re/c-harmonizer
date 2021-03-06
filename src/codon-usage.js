import React , {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
    Typography,
    Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    Box, Tooltip, IconButton
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import {exampleResults,  exampleSourceOrganism, exampleTargetOrganism} from './example';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        width: '60%',
        minWidth: '400px',
        overflowY: 'scroll',
        padding: '10px 0'      
    },
    sect: {
        padding: '50px 0'
    },
    margL: {
        marginLeft: '20px'
    }
}));


export default function CodonUsage(props) {
    const styles = useStyles();

    const codonScoreObjSource = useSelector(state => {
        if (props.example) {
            return exampleResults.sourceCodonScores;
        }
        if (!state.results) {
            return {}
        }
        return state.results.sourceCodonScores;
    });
    const codonScoreObjTarget = useSelector(state => {
        if (props.example) {
            return exampleResults.targetCodonScores;
        }
        if (!state.results) {
            return {}
        }
        return state.results.targetCodonScores;
    });

    const sourceOrganism = useSelector(state => {
        if (props.example) {
            return exampleSourceOrganism;
        }
        return state.sourceOrganism && state.sourceOrganism.trim();
    });

    const targetOrganism = useSelector(state => {
        if (props.example) {
            return exampleTargetOrganism;
        }
        return state.targetOrganism && state.targetOrganism.trim();
    });

    const rows = codonScoreObjSource &&
     Object.keys(codonScoreObjSource).reduce((arr, aA) => {
        return [...arr, ...Object.keys(codonScoreObjSource[aA]).map(codon => {
            return {                
                aA,
                codon,
                scoreSource: (Math.floor(codonScoreObjSource[aA][codon] * 1000) / 1000).toFixed(3),
                scoreTarget: (Math.floor(codonScoreObjTarget[aA][codon] * 1000) / 1000).toFixed(3)             
            };
        })];
    }, []);
    
    useEffect(() => {
    }, [codonScoreObjSource]);

    if (!codonScoreObjSource || Object.keys(codonScoreObjSource).length == 0) {
        return null;
    }

    return (
        <section className={styles.sect}> 
            <Box display='flex' alignItems='center'>
                <Typography variant='h6' component='h2' gutterBottom>
                    Codon Scores Comparision {sourceOrganism || 'Source'} and {targetOrganism || 'Target Organism'}
                </Typography>

                {/* FORM with HIDDEN INPUT FIELDS for POST Request for FILE DOWNLOAD */}
                <form action='/api/results/codon-scores' method='post'>
                    <input 
                        name="codonScores" 
                        defaultValue={JSON.stringify(rows)} 
                        style={{display: 'none'}}
                    />
                    
                    <Tooltip title="Download codon scores" placement="right-start">
                        <IconButton type='submit' aria-label="download codon scores" className={styles.margL}>
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                </form> 
                
            </Box>
            <div className={styles.container}>

                <TableContainer component={Paper} >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Amino Acid</TableCell>
                                <TableCell align="right">Codon</TableCell>
                                <TableCell align="right">Score {sourceOrganism || 'Source Organism'}</TableCell>                            
                                <TableCell align="right">Score {targetOrganism || 'Target Organism'}</TableCell>                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.codon}>
                                <TableCell component="th" scope="row">
                                    {row.aA}
                                </TableCell>
                                <TableCell align="right">{row.codon}</TableCell>
                                <TableCell align="right">{row.scoreSource}</TableCell>
                                <TableCell align="right">{row.scoreTarget}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    );
};