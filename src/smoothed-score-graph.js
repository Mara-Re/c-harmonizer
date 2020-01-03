import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography, Box, Tooltip, IconButton} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import Chart from "chart.js";
import {useStylesChart} from './styles.js';
import {exampleResults} from './example';


Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif"
// Chart.defaults.global.elements.line.tension = 0;

export default function SmoothedScoreGraph(props) {
    const stylesChart = useStylesChart();
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
        
        console.log('chartRef.current: ', chartRef.current);
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
                            label: "Smoothed Score in Source Organism",
                            data: geneScoreSourceSmooth,
                            borderColor: 'rgb(0, 0, 0)',
                            ...smothedStyles
                        },
                        {
                            label: "Smoothed Score in Target Organism without Harmonization",
                            data: geneScoreTargetSmooth,
                            borderColor: 'rgb(244, 67, 54)',
                            ...smothedStyles,
                            borderDash: [2, 2],

                        },
                        {
                            label: "Smoothed Score for Harmonized Gene",
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
        <section className={stylesChart.sect}>
            <Box display='flex' alignItems='center'>
                <Typography variant='h6' component='h2' gutterBottom>
                    Smoothed Codon Scores for Gene of Interest
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
                        <IconButton type='submit' aria-label="download smoothed scores" style={{marginLeft: '20px'}}>
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                </form> 
                
            </Box>
            
            <div className={stylesChart.container}>
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
