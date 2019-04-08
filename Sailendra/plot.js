//Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){

  //function unpack(rows, key) {
  //return rows.map(function(row) { return row[key]; });
// } 




var trace1 = {
  x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  y: [20, 14, 25, 16, 18, 22, 19, 15, 12, 16, 14, 17],
  type: 'bar',
  name: 'Primary Product',
  marker: {
    color: 'rgb(49,130,189)',
    opacity: 0.7,
  }
};

var trace2 = {
  x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  y: [19, 14, 22, 14, 16, 19, 15, 14, 10, 12, 12, 16],
  type: 'bar',
  name: 'Secondary Product',
  marker: {
    color: 'rgb(204,204,204)',
    opacity: 0.5
  }
};

var data = [trace1, trace2];

var layout = {
  title: '2013 Sales Report',
  xaxis: {
    tickangle: -45
  },
  barmode: 'group'
};

Plotly.newPlot('myDiv', data, layout);