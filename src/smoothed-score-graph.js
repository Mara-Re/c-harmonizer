import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography, Box, Tooltip, IconButton} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import Chart from "chart.js";
import {exampleResults, exampleGeneName, exampleSourceOrganism, exampleTargetOrganism} from './example';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        height: '250px',
        width: '100%',
        overflowX: 'scroll',
        padding: '5px 0'
    },
    sect: {
        padding: '50px 0 0'
    },
    margL: {
        marginLeft: '20px'
    }
}));

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif"
// Chart.defaults.global.elements.line.tension = 0;

export default function SmoothedScoreGraph(props) {
    const styles = useStyles();
    const chartRef = useRef();
    
    const geneScoreSourceSmooth = useSelector(state => {
        if (props.example) {
            return exampleResults.geneScoreSourceSmooth
        }
        return state.results && state.results.geneScoreSourceSmooth 
    });

    const geneScoreTargetSmooth = useSelector(state => {
        if (props.example) {
            return exampleResults.geneScoreTargetSmooth
        }
        return state.results && state.results.geneScoreTargetSmooth 
    });

    const harmonizedGeneScoreTargetSmooth = useSelector(state => {
        if (props.example) {
            return exampleResults.harmonizedGeneScoreTargetSmooth
        }
        return state.results && state.results.harmonizedGeneScoreTargetSmooth 
    });

    const geneName = useSelector(state => {
        if (props.example) {
            return exampleGeneName;
        }
        return state.geneName && state.geneName.trim();
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
    
    const labelIndex = geneScoreSourceSmooth && geneScoreSourceSmooth.map((el, index) => {
        return index;
    });

    const widthOfChart = geneScoreSourceSmooth && calcWidthOfChart(geneScoreSourceSmooth);

    function calcWidthOfChart(dataArr) {
        if (dataArr.length < 1000) {
            return '80%';
        }
        return `${dataArr.length}px`;
    }

    useEffect(() => {        
        if (chartRef.current) {

            const myChartRef = chartRef.current.getContext("2d");

            const smothedStyles = {
                fill: false,
                borderWidth: 2,
                pointRadius: '0'
            }
            
            new Chart(myChartRef, {
                type: "line",
                lineWidth: 100,
                data: {
                    labels: labelIndex,
                    datasets: [
                        {
                            label: `Smoothed Scores in ${sourceOrganism || 'Source Organism'}`,
                            data: geneScoreSourceSmooth,
                            borderColor: 'rgb(0, 0, 0)',
                            ...smothedStyles
                        },
                        {
                            label: `Smoothed Scores in ${targetOrganism || 'Target Organism'} without Harmonization`,
                            data: geneScoreTargetSmooth,
                            borderColor: 'rgb(244, 67, 54)',
                            ...smothedStyles,
                            borderDash: [2, 2],

                        },
                        {
                            label: `Smoothed Scores for Harmonized Gene in ${targetOrganism || 'Target Organism'}`,
                            data: harmonizedGeneScoreTargetSmooth,
                            borderColor: 'rgb(69, 116, 140)',
                            ...smothedStyles
                        }
                    ]
                },
                options: {
                    //Customize chart options
                    legend: {
                        align: 'start'
                    },
                    maintainAspectRatio: false,
                }
            });
        }
    }, [geneScoreSourceSmooth]);
    
    if(!geneScoreSourceSmooth) {
        return null;
    }
    
    return (
        <section className={styles.sect}>
            <Box display='flex' alignItems='center'>
                <Typography variant='h6' component='h2' gutterBottom>
                    Smoothed Codon Scores for {geneName || 'Gene of Interest'}
                </Typography>

                {/* FORM with HIDDEN INPUT FIELDS for POST Request for FILE DOWNLOAD */}
                <form action='/api/results/gene-scores-smoothed' method='post'>
                    <input 
                        type='text' name="geneScoreSourceSmooth" 
                        defaultValue={geneScoreSourceSmooth} 
                        style={{display: 'none'}}
                    />
                    <input 
                        type='text' name="geneScoreTargetSmooth" 
                        defaultValue={geneScoreTargetSmooth} 
                        style={{display: 'none'}}
                    />
                    <input 
                        type='text' name="harmonizedGeneScoreTargetSmooth" 
                        defaultValue={harmonizedGeneScoreTargetSmooth} 
                        style={{display: 'none'}}
                    />
                    <Tooltip title="Download smoothed scores" placement="right-start">
                        <IconButton type='submit' aria-label="download smoothed scores" className={styles.margL}>
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                </form> 
                
            </Box>
            
            <div className={styles.container}>
                <div style={{height: '100%', width: widthOfChart}}>
                    <canvas
                        id="myChart"
                        ref={chartRef}
                        style={{textAlign: 'left'}}
                    />
                </div>
            </div>
        </section>
    )
}
