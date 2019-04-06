// var svgWidth = 960;
// var svgHeight = 660;

// // Define the chart's margins as an object
// var chartMargin = {
//   top: 50,
//   right: 50,
//   bottom: 50,
//   left: 50
// };

// // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // Select body, append SVG area to it, and set the dimensions
// var svg = d3.select("body")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// // Load data from hours-of-tv-watched.csv
// d3.csv("total_import_export.csv", function(error, data) {
//   if (error) throw error;

//   console.log(data);

//   data.forEach(function(d) {
//     d.import = +d.import/100000000;
//     d.import = +d.import/100000000;
//     console.log(d.import);
//   });


//   // // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
//   var xBandScale = d3.scaleBand()
//     .domain(data.map(d => d.year))
//     .range([0, chartWidth])
//     .padding(0.1);

//   // // Create a linear scale for the vertical axis.
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.import)])
//     .range([chartHeight, 0]);

//   // // Create two new functions passing our scales in as arguments
//   // // These will be used to create the chart's axes
//   var bottomAxis = d3.axisBottom(xBandScale);
//   var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

//   // // Append two SVG group elements to the chartGroup area,
//   // // and create the bottom and left axes inside of them
//   chartGroup.append("g")
//     .call(leftAxis);

//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(bottomAxis);

//   // // Create one SVG rectangle per piece of tvData
//   // // Use the linear and band scales to position each rectangle within the chart
//   chartGroup.selectAll(".bar")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", d => xBandScale(d.year))
//     .attr("y", d => yLinearScale(d.import))
//     .attr("width", xBandScale.bandwidth())
//     .attr("height", d => chartHeight - yLinearScale(d.import));

// });

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 50, left: 50},
    width1 = +svg.attr("width") - margin.left - margin.right,
    height1 = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x0 = d3.scaleBand()
    .rangeRound([0, width1])
    .paddingInner(0.3);
var x1 = d3.scaleBand()
    .padding(0.05);
var y = d3.scaleLinear()
    .rangeRound([height1, 0]);
var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6","#6b486b"]);

// monthly chart
var svg2 = d3.select(".month"),
margin = {top: 20, right: 10, bottom: 50, left: 40},
width = 1200 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom,
g1 = svg2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x2 = d3.scaleBand()
.rangeRound([0, width])
.paddingInner(0.3);
var x3 = d3.scaleBand()
.padding(0.05);
var y1 = d3.scaleLinear()
.rangeRound([height, 0]);
var z1 = d3.scaleOrdinal()
.range(["#4cb2cc", "#b8a3ff","red", "#808080"])


d3.csv("total_import_export.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;
  var keys = data.columns.slice(1);
  x0.domain(data.map(function(d) { return d.year; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height1 - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });
  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(d3.axisBottom(x0));
  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("US Trade in Dollars");
  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend.append("rect")
      .attr("x", width1 - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);
  legend.append("text")
      .attr("x", width1 - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
      
});

d3.csv("monthly_import_export.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, Data) {
  if (error) throw error;
  var keys1 = Data.columns.slice(1);
  x2.domain(Data.map(function(d) { return d.month; }));
  x3.domain(keys1).rangeRound([0, x2.bandwidth()]);
  y1.domain([0, d3.max(Data, function(d) { return d3.max(keys1, function(key) { return d[key]; }); })]).nice();
  g1.append("g")
    .selectAll("g")
    .data(Data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x2(d.month) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys1.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
      .attr("x", function(d) { return x3(d.key); })
      .attr("y", function(d) { return y1(d.value); })
      .attr("width", x3.bandwidth())
      .attr("height", function(d) { return height - y1(d.value); })
      .attr("fill", function(d) { return z1(d.key); });
  g1.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2));
  g1.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y1).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y1(y1.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("US Trade in Dollars");
  var legend1 = g1.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys1.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend1.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z1);
  legend1.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
      
});
    