import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography, Box, Tooltip, IconButton} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';


import Chart from "chart.js";
import {useStylesChart} from './styles.js';
import axios from 'axios';
import {exampleResults} from './example';



//--------FOR TESTING:
import {
    geneScoreSourceEx,
    geneScoreTargetEx,
    harmonizedGeneScoreTargetEx
} from './hardcoded-examples-frontend';
//^^^^^^^^FOR TESTING:

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

export default function Graph(props) {
    const stylesChart = useStylesChart();
    const chartRef = useRef();

    const geneScoreSource = useSelector(state => {
        if (props.example) {
            return exampleResults.geneScoreSource
        }
        return state.results && state.results.geneScoreSource 
    });

    const geneScoreTarget = useSelector(state => {
        if (props.example) {
            return exampleResults.geneScoreTarget
        }
        return state.results && state.results.geneScoreTarget 
    });

    const harmonizedGeneScoreTarget = useSelector(state => {
        if (props.example) {
            return exampleResults.harmonizedGeneScoreTarget
        }
        return state.results && state.results.harmonizedGeneScoreTarget 
    });
    
    const labelIndex = geneScoreSource && geneScoreSource.map((el, index) => {
        return index;
    });

    const widthOfChart = geneScoreSource && calcWidthOfChart(geneScoreSource);

    function calcWidthOfChart(dataArr) {
        if (dataArr.length < 100) {
            return '80%';
        }
        return `${dataARr.length * 8}px`;
    }

    useEffect(() => {
        
        console.log('chartRef.current: ', chartRef.current);
        if (chartRef.current) {

            const myChartRef = chartRef.current.getContext("2d");

            const datasetStyles = {
                fill: false,
                borderWidth: 1,
                pointRadius: 2
            };
            
            new Chart(myChartRef, {
                type: "line",
                lineWidth: 100,
                data: {
                    labels: labelIndex,
                    datasets: [
                        {
                            label: "Score in Source Organism",
                            data: geneScoreSource,                            
                            borderColor: 'rgb(0, 0, 0, 0.7)',
                            pointBackgroundColor: 'rgb(0, 0, 0, 0.7)',
                            ...datasetStyles                            
                        },
                        {
                            label: "Score in Target Organism without Harmonization",
                            data: geneScoreTarget,
                            borderColor: 'rgb(244, 67, 54, 0.7)',
                            pointBackgroundColor: 'rgb(244, 67, 54, 0.5)',
                            borderDash: [5, 5],
                            ...datasetStyles,
                        },
                        {
                            label: "Score for Harmonized Gene",
                            data: harmonizedGeneScoreTarget,
                            borderColor: 'rgb(69, 116, 140, 0.7)',
                            pointBackgroundColor: 'rgb(69, 116, 140, 0.7)',
                            ...datasetStyles
                        },
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
    }, [geneScoreSource]);
    
    if(!geneScoreSource) {
        return null;
    }
    
    return (
        <section className={stylesChart.sect}>
            <Box display='flex' alignItems='center'>
                <Typography variant='h6' component='h2' gutterBottom>
                    Codon Scores for Gene of Interest
                </Typography>

                {/* FORM with HIDDEN INPUT FIELDS for POST Request for FILE DOWNLOAD */}
                <form action='/api/results/gene-scores' method='post'>
                    <input 
                        type='text' name="geneScoreSource" 
                        defaultValue={geneScoreSource} 
                        style={{display: 'none'}}
                    />
                    <input 
                        type='text' name="geneScoreTarget" 
                        defaultValue={geneScoreTarget} 
                        style={{display: 'none'}}
                    />
                    <input 
                        type='text' name="harmonizedGeneScoreTarget" 
                        defaultValue={harmonizedGeneScoreTarget} 
                        style={{display: 'none'}}
                    />
                    <Tooltip title="Download scores" placement="right-start">
                        <IconButton type='submit' aria-label="download scores" style={{marginLeft: '20px'}}>
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
    );
};
