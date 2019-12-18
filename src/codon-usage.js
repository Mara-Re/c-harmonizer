import React , {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
    Typography,
    Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    Box, Tooltip, IconButton
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import {useStylesTable} from './styles.js';




export default function CodonUsage({data}) {
    const stylesTable = useStylesTable();

    console.log('data: ', data);
    const codonScoreObjSource = useSelector(state => {
        if (!state.results) {
            return {}
        }
        return state.results.sourceCodonScores;
    });
    const codonScoreObjTarget = useSelector(state => {
        if (!state.results) {
            return {}
        }
        return state.results.targetCodonScores;
    });

    const rows = Object.keys(codonScoreObjSource).reduce((arr, aA) => {
        return [...arr, ...Object.keys(codonScoreObjSource[aA]).map(codon => {
            return {                
                aA,
                codon,
                scoreSource: (Math.floor(codonScoreObjSource[aA][codon] * 1000) / 1000),
                scoreTarget: (Math.floor(codonScoreObjTarget[aA][codon] * 1000) / 1000)                
            };
        })];
    }, []);
    
    useEffect(() => {
        console.log('rows: ', rows);
    }, [codonScoreObjSource]);

    if (Object.keys(codonScoreObjSource).length == 0) {
        return null;
    }

    return (
        <section className={stylesTable.sect}> 
            <Box display='flex' alignItems='center'>
                <Typography variant='h6' component='h2' gutterBottom>
                    Codon Scores Comparision Source and Target Organism
                </Typography>

                {/* FORM with HIDDEN INPUT FIELDS for POST Request for FILE DOWNLOAD */}
                <form action='/api/results/codon-scores' method='post'>
                    <input 
                        name="sourceCodonScores" 
                        defaultValue={rows} 
                        style={{display: 'none'}}
                    />
                    
                    <Tooltip title="Download codon scores" placement="right-start">
                        <IconButton type='submit' aria-label="download codon scores" style={{marginLeft: '20px'}}>
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                </form> 
                
            </Box>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Amino Acid</TableCell>
                            <TableCell align="right">Codon</TableCell>
                            <TableCell align="right">Score Source Organism</TableCell>                            
                            <TableCell align="right">Score Target Organism</TableCell>                            
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
        </section>
    );
};