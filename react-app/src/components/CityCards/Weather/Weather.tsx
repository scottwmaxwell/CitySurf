import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersLine, faPersonWalking, faMapLocationDot} from '@fortawesome/free-solid-svg-icons'
import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';


function Weather({cityData}: any){

    const calculatePlotSize = () =>{
        let width, height;

        if(window.innerWidth > 1000){
            width = 700;
            height = 300;
        } else if(window.innerWidth > 800){
            width = 400;
            height = 260;
        }else if(window.innerWidth > 600){
            width =400;
            height=260;
        }else{
            width = 330;
            height = 260;
        }
    
        let dimensions = {width: width, height: height}
    
        return dimensions;
    }

    const [graphSize, setGraphSize] = useState(calculatePlotSize())

    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setGraphSize(calculatePlotSize());
        });
    }, [])

    const data:any = []
    let count = 0;
    for(let city of cityData){
        let color;
        if(count === 0){
            color = 'rgb(189, 175, 47)';
        }else if(count === 1){
            color = 'rgb(120, 120, 120)';
        }else{
            color = 'rgb(158, 110, 77)';
        }
        let trace = {
            x: [1, 2, 3, 4 , 6, 7, 8, 9, 10, 11, 12],
            y: city.weather.high_temps,
            type: 'scatter',
            mode: 'lines+markers',
            name: city.city,
            marker: {
                color: color,
                size: 4
            }
        }
        count += 1;
        data.push(trace);
    }


    return(
        <div className="card bg-dark">
            <h1 className="card-header">Weather</h1>
            <div className="card-content">
                <div className="plot-container">
                <Plot
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
            data={data}
            layout={{
                // autosize: true,
                title: {
                    text: '',
                    font: {
                        size: 24,
                        color: 'white'
                    },
                    pad: {
                        t: 0
                    }
                },
                plot_bgcolor: '#212529',
                paper_bgcolor: '#212529',
                font: {
                    color: 'white'
                },
                xaxis: {
                    gridcolor: 'gray',
                    zerolinecolor: 'gray',
                    showgrid: false,
                    tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    ticktext: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yaxis: {
                    gridcolor: 'gray',
                    zerolinecolor: 'gray',
                    showgrid: false
                },
                width: graphSize.width,
                height: graphSize.height,
                margin:{l:0, r:0}
            }}
            config={{
                displayModeBar: false
            }}
        />
                </div>
            </div>
        </div>
    )
}

export default Weather;