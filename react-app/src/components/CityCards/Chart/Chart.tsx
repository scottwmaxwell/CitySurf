import "./Chart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersLine,
  faPersonWalking,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Plot from "react-plotly.js";
import { useEffect, useState, useRef } from "react";

// This component displays weather data using plotlyJs
export const Chart = ({ plotData, plotType, plotName, cityNames}: any) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const baseMargin = plotType == "bar"?100:30
  const calculatePlotSize = () => {
    if (cardRef.current) {
      let width = cardRef.current.offsetWidth;
      let height = 260;
      let dimensions = { width: width, height: height };
      return dimensions;
    }
    return {width: 0, height: 0}
  };

  const [graphSize, setGraphSize] = useState(calculatePlotSize());

  useEffect(() => {
    window.addEventListener("resize", () => {
      setGraphSize(calculatePlotSize());
    });
    setGraphSize(calculatePlotSize());
  }, [cardRef]);

  const data: any = [];
  let count = 0;
  for (let city of plotData) {
    console.log(cityNames[count])
    let color;
    if (count === 0) {
      color = "rgb(189, 175, 47)";
    } else if (count === 1) {
      color = "rgb(120, 120, 120)";
    } else {
      color = "rgb(158, 110, 77)";
    }
    let trace = {
      x: Object.keys(city),
      y: Object.values(city),
      type: plotType,
      mode: "lines+markers",
      name: cityNames[count],
      marker: {
        color: color,
        size: 4,
      },
    };
    count += 1;
    data.push(trace);
  }

  return (
    <div ref={cardRef} className="card bg-dark">
      <h1 className="card-header">{plotName}</h1>
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
                gridcolor: "gray", // Keep grid lines
                zerolinecolor: "gray", // Zero line for reference
                showgrid: false // Show grid lines
              },
              width: graphSize.width,
              height: graphSize.height,
              margin: { l: 50, r: 0, t: 10, b: baseMargin },
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

