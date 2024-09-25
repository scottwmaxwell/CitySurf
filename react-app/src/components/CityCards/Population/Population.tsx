import "../Weather/Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersLine,
  faPersonWalking,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Plot from "react-plotly.js";
import { useEffect, useState } from "react";

// This component displays population data using plotlyJs
export function Population({ cityData }: any) {
  const calculatePlotSize = () => {
    let width, height;

    if (window.innerWidth > 1000) {
      width = 700;
      height = 300;
    } else if (window.innerWidth > 800) {
      width = 600;
      height = 260;
    } else if (window.innerWidth > 700) {
      width = 550;
      height = 260;
    } else if (window.innerWidth > 600) {
      width = 400;
      height = 260;
    } else if (window.innerWidth > 450) {
      width = 330;
      height = 260;
    } else if (window.innerWidth > 400) {
      width = 250;
      height = 260;
    } else {
      width = 230;
      height = 260;
    }
    let dimensions = { width: width, height: height };
    return dimensions;
  };

  const [graphSize, setGraphSize] = useState(calculatePlotSize());

  useEffect(() => {
    window.addEventListener("resize", () => {
      setGraphSize(calculatePlotSize());
    });
  }, []);

  const data: any = [];
  let count = 0;
  for (let city of cityData) {
    let color;
    if (count === 0) {
      color = "rgb(189, 175, 47)";
    } else if (count === 1) {
      color = "rgb(120, 120, 120)";
    } else {
      color = "rgb(158, 110, 77)";
    }
    let trace = {
      x: Object.keys(city.population),
      y: Object.values(city.population),
      type: "scatter",
      mode: "lines+markers",
      name: city.city,
      marker: {
        color: color,
        size: 4,
      },
    };
    count += 1;
    data.push(trace);
  }

  return (
    <div className="card bg-dark">
      <h1 className="card-header">Population</h1>
      <div className="card-content">
        <div className="plot-container">
          <Plot
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
            data={data}
            layout={{
              // autosize: true,
              title: {
                text: "",
                font: {
                  size: 24,
                  color: "white",
                },
                pad: {
                  t: 0,
                },
              },
              plot_bgcolor: "#212529",
              paper_bgcolor: "#212529",
              font: {
                color: "white",
              },
              xaxis: {
                gridcolor: "gray",
                zerolinecolor: "gray",
                showgrid: false,
              },
              yaxis: {
                // zerolinecolor: 'gray',
                // showgrid: false
                gridcolor: "gray", // Keep grid lines
                zerolinecolor: "gray", // Zero line for reference
                showgrid: false, // Show grid lines
                // tickcolor: 'white', // Color of the y-axis ticks
                // tickmode: 'auto', // Automatically calculate tick marks
                // ticks: 'outside', // Display ticks outside the graph
                // tickwidth: 1, // Tick width
                // ticklen: 8, // Tick length
                // showline: true, // Display the y-axis line
                // linewidth: 1, // Thickness of the y-axis line
                // linecolor: 'white', // Color of the y-axis line
                // mirror: true, // Show line on both left and right sides
                // showticklabels:true
              },
              width: graphSize.width,
              height: graphSize.height,
              margin: { l: 30, r: 0, t: 10, b: 50 },
            }}
            config={{
              displayModeBar: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}
