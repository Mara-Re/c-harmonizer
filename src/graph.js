import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography} from '@material-ui/core';
import Chart from "chart.js";
import {useStylesChart} from './styles.js';

//--------FOR TESTING:
import {
    geneScoreSourceEx,
    geneScoreTargetEx,
    harmonizedGeneScoreTargetEx
} from './hardcoded-examples-frontend';
//^^^^^^^^FOR TESTING:

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif"

export default function Graph() {
    const stylesChart = useStylesChart();
    const chartRef = useRef();
    const geneScoreSource = useSelector(state => {
        return state.results && state.results.geneScoreSource 
    });
    const geneScoreTarget = useSelector(state => {
        return state.results && state.results.geneScoreTarget 
    });
    const harmonizedGeneScoreTarget = useSelector(state => {
        return state.results && state.results.harmonizedGeneScoreTarget 
    });

    
    const labelIndex = geneScoreSource && geneScoreSource.map((el, index) => {
        return index;
    });
    const widthOfChart = geneScoreSource && `${geneScoreSource.length * 8}px`;

    useEffect(() => {
        
        console.log('chartRef.current: ', chartRef.current);
        if (chartRef.current) {

            const myChartRef = chartRef.current.getContext("2d");

            const datasetStyles = {
                fill: false,
                borderWidth: 1,
                pointRadius: 2
            }
            
            new Chart(myChartRef, {
                type: "line",
                lineWidth: 100,
                data: {
                    //Bring in data
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
    }, [geneScoreSource]);
    
    if(!geneScoreSource) {
        return null;
    }
    
    return (
        <>
            <Typography variant='h5' component='h1' gutterBottom>
                Graph Component
            </Typography>
            <div className={stylesChart.container}>
                <div style={{height: '100%', width: widthOfChart}}>
                    <canvas
                        id="myChart"
                        ref={chartRef}
                        style={{textAlign: 'left'}}
                    />
                </div>
            </div>
        </>
    )
}
