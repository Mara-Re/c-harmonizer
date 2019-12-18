import React , {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';

export default function TableCodonUsage({data}) {
    console.log('data: ', data);
    const codonScoreObj = useSelector(state => {
        if (!state.results) {
            return {}
        }
        return state.results[data];
    });

    const rows = Object.keys(codonScoreObj).reduce((arr, aA) => {
        return [...arr, ...Object.keys(codonScoreObj[aA]).map(codon => {
            return {                
                aA,
                codon,
                score: (Math.floor(codonScoreObj[aA][codon] * 1000) / 1000),
            };
        })];
    }, []);
    
    useEffect(() => {
        console.log('rows: ', rows);
    }, [codonScoreObj]);

    if (codonScoreObj == {}) {
        return null;
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Amino Acid</TableCell>
                            <TableCell align="right">Codon</TableCell>
                            <TableCell align="right">Score</TableCell>                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.codon}>
                            <TableCell component="th" scope="row">
                                {row.aA}
                            </TableCell>
                            <TableCell align="right">{row.codon}</TableCell>
                            <TableCell align="right">{row.score}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};