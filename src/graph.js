import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import {Typography} from '@material-ui/core';
import Chart from "chart.js";
import {
    geneScoreSourceEx,
    geneScoreTargetEx,
    harmonizedGeneScoreTargetEx
} from './hardcoded-examples-frontend';
// import {useStylesChart} from './styles.js';

export default function Graph() {
    // const stylesChart = useStylesChart();
    const chartRef = useRef();
    // const geneScoreSource = useSelector(state => {
    //     return state.results && state.results.geneScoreSource;
    // });
    const labelIndex = geneScoreSourceEx && geneScoreSourceEx.map((el, index) => {
        return index;
    });

    useEffect(() => {
        console.log('chartRef.current: ', chartRef.current);
        const myChartRef = chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labelIndex,
                datasets: [
                    {
                        label: "Score Source",
                        data: geneScoreSourceEx,
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }, []);
    
    return (
        <>
            <Typography variant='h5' component='h1' gutterBottom>
                Graph Component
            </Typography>
            <canvas
                id="myChart"
                ref={chartRef}
                // styles={{height: '100px'}} //does not affect the style!
            />
        </>
    )
}

// export default class Graph extends React.Component {
//     // chartRef = React.createRef();
//     componentDidMount() {
//         // const myChartRef = this.chartRef.current.getContext("2d");
        
//         // new Chart(myChartRef, {
//         //     type: "line",
//         //     data: {
//         //         //Bring in data
//         //         labels: ["Jan", "Feb", "March"],
//         //         datasets: [
//         //             {
//         //                 label: "Sales",
//         //                 data: [86, 67, 91],
//         //             }
//         //         ]
//         //     },
//         //     options: {
//         //         //Customize chart options
//         //     }
//         // });
//     }
//     render () {
        
//         return (
//             <>
//                 <Typography variant='h5' component='h1' gutterBottom>
//                     Graph Component
//                 </Typography>
//                 {/* <canvas
//                     id="myChart"
//                     ref={this.chartRef}
//                 /> */}
//             </>
//         )
//     } 
// }