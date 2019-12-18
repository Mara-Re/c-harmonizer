import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography} from '@material-ui/core';
import Chart from "chart.js";
import {useStylesChart} from './styles.js';

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif"
// Chart.defaults.global.elements.line.tension = 0;

export default function SmoothedScoreGraph() {
    const stylesChart = useStylesChart();
    const chartRef = useRef();
    
    const geneScoreSourceSmooth = useSelector(state => {
        return state.results && state.results.geneScoreSourceSmooth 
    });

    const geneScoreTargetSmooth = useSelector(state => {
        return state.results && state.results.geneScoreTargetSmooth 
    });

    const harmonizedGeneScoreTargetSmooth = useSelector(state => {
        return state.results && state.results.harmonizedGeneScoreTargetSmooth 
    });
    
    const labelIndex = geneScoreSourceSmooth && geneScoreSourceSmooth.map((el, index) => {
        return index;
    });

    const widthOfChart = geneScoreSourceSmooth && `${geneScoreSourceSmooth.length}px`;

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
            <Typography variant='h6' component='h2' gutterBottom>
                Smoothed Codon Scores for Gene of Interest
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
        </section>
    )
}
