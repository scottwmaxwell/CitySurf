import "./Chart.css";
import Plot from "react-plotly.js";
import { useEffect, useState, useRef } from "react";

// This component displays weather data using plotlyJs
export const Chart = ({ plotData, plotType, plotName, cityNames}: any) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const baseMargin = plotType == "bar"?100:30 // Detemines space below chart based on type (bar or scatter)
  // Dynamically changes size of plot depending on card element's size
  const calculatePlotSize = () => {
    if (cardRef.current) {
      let width = cardRef.current.offsetWidth; // current width of card
      let height = 260; // static height of plot
      let dimensions = { width: width, height: height }; // Set determined dimensions
      return dimensions;
    }
    return {width: 0, height: 0}
  };

  const [graphSize, setGraphSize] = useState(calculatePlotSize());

  useEffect(() => {
    // Detect resize of window
    window.addEventListener("resize", () => {
      setGraphSize(calculatePlotSize());
    });
    setGraphSize(calculatePlotSize()); // Modify size of plot
  }, [cardRef]);

  const data: any = [];
  let count = 0;
  for (let city of plotData) {
    // Determine color of line/bar
    let color;
    if (count === 0) {
      color = "rgb(189, 175, 47)";
    } else if (count === 1) {
      color = "rgb(120, 120, 120)";
    } else {
      color = "rgb(158, 110, 77)";
    }
    // Plot x, y
    let trace = {
      x: Object.keys(city),
      y: Object.values(city),
      type: plotType, // Bar or Scatter?
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
              plot_bgcolor: "#212529", // Background color of plot (should match cardRef)
              paper_bgcolor: "#212529",
              font: {
                color: "white", // color of text
              },
              xaxis: {
                gridcolor: "gray", // If grid is displayed, make it gray
                zerolinecolor: "gray", // Color of zero lines
                showgrid: false, // Do not show grid
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

