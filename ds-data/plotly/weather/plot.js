var trace1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [50, 64, 75, 80, 95, 100, 88, 75, 60, 53, 45, 40],
    type: 'scatter',
    name: "Prescott, AZ",
    marker: {
      color: 'rgb(120, 120, 120)',
      size: 4
    }
  };
  
  var trace2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [65, 78, 85, 90, 105, 110, 98, 85, 70, 66, 60, 55],
    type: 'scatter',
    name: "Florence, AZ",
    marker: {
        color: 'rgb(189, 175, 47)',
        size: 4
      }
  };

  var trace3 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [100, 103, 102, 106, 108, 112, 114, 119, 110, 103, 99, 80],
    type: 'scatter',
    name: "Phoenix, AZ",
    marker: {
        color: 'rgb(158, 110, 77)',
        size: 4
      }
  }
  
  var data = [trace1, trace2, trace3];
  
  var layout = {
    title: {
        text: 'Monthly Temperature Comparison',
        font: {
            size: 24, /* Adjust font size */
            color: 'white' /* Adjust font color */
        },
        pad: {
            t: 0 /* Padding from the top */
        }
    },
    plot_bgcolor: '#181b1f',
    paper_bgcolor: '#181b1f',
    font: {
      color: 'white'
    },
    xaxis: {
      gridcolor: 'gray',
      zerolinecolor: 'gray',
      showgrid: false,  // This line removes the vertical gridlines
      tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      ticktext: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      gridcolor: 'gray',
      zerolinecolor: 'gray',
      showgrid: false  // This line removes the vertical gridlines
    },
    width: 800,
    height: 300
  };
  
  var config = {
    displayModeBar: false
  };
  
  Plotly.newPlot('myDiv', data, layout, config);