import React , {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
// import {Typography, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

export default function TableCodonUsage() {

    const scoreObj = useSelector(state => {
        if (!state.results) {
            return {}
        }
        return state.results.sourceCodonScores;
    });

    // const scoreArr = Object.keys(scoreObj);
    // const spans = scoreArr.map(el => {
    //     return Object.keys(scoreObj[el]).length;
    // });

    // function createData(name, calories, fat, carbs, protein) {
    //     return { name, calories, fat, carbs, protein };
    //   }
      
    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];

    const rows = Object.keys(scoreObj).reduce((arr, aA) => {
        return [...arr, ...Object.keys(scoreObj[aA]).map(codon => {
            return {                
                aA,
                codon,
                score: scoreObj[aA][codon],
            };
        })];
    }, []);
    
    useEffect(() => {
        console.log('rows: ', rows);
    }, [scoreObj]);

    return (
        <>
            <Typography variant='h5' component='h1' gutterBottom>
                Codon Usage Scores Source Organism
            </Typography>
            <TableContainer component={Paper}>
                <Table>
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

            {/* <TableContainer component={Paper}>
                <Table aria-label="simple table"> */}
                    {/* <TableHead>
                        <TableRow>
                            <TableCell>Amino Acid</TableCell>
                            <TableCell align="right">Codon</TableCell>
                            <TableCell align="right">Score</TableCell>                            
                        </TableRow>
                    </TableHead> */}
                    {/* <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.codon}>
                            <TableCell component="th" scope="row">
                                {row.aA}
                            </TableCell>
                            <TableCell align="right">{row.codon}</TableCell>
                            <TableCell align="right">{row.score}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody> */}
                {/* </Table>
            </TableContainer> */}
        </>
    );
};