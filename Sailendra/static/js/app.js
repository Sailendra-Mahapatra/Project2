//D3..
 var svgWidth = 960;
 var svgHeight = 660;

// // Define the chart's margins as an object
 var chartMargin = {
   top: 30,
   right: 30,
   bottom: 30,
   left: 30
 };

// // Define dimensions of the chart area
 var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
 var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // Select body, append SVG area to it, and set the dimensions
 var svg = d3.select("#bars")
   .append("svg")
   .attr("height", svgHeight)
   .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
 var chartGroup = svg.append("g")
   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// var url1 = "/imports/tooltip";  

// Load data from url
d3.json("/imports/bars/2015").then(function(data) {
//d3.json("/imports/bars/2015-12").then(function(data) {
  console.log(data);

  var keys = data.columns.slice(1)

//   // Cast the hours value to a number for each piece of data
   data.forEach(function(d) {
//.Year = +d.Year;
//   });

//   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
   var xBandScale = d3.scaleBand()
     .domain(data.map(d => d.YTDValue))
     .range([0, chartWidth])
     .padding(0.1);

//   // Create a linear scale for the vertical axis.
   var yLinearScale = d3.scaleLinear()
     .domain([0, d3.max(data, d => d.Period)])
     .range([chartHeight, 0]);

//   // Create two new functions passing our scales in as arguments
//   // These will be used to create the chart's axes
   var bottomAxis = d3.axisBottom(xBandScale);
   var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

//   // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them
   chartGroup.append("g")
     .call(leftAxis);

   chartGroup.append("g")
     .attr("transform", `translate(0, ${chartHeight})`)
     .call(bottomAxis);

    var color = d3.scaleOrdinal()
     .domain(keys)
     .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])
     
    var stackedData = d3.stack()
     .keys(keys)
     (data)
//   // Create one SVG rectangle per piece of data
//   // Use the linear and band scales to position each rectangle within the chart
   chartGroup.selectAll(".bar")
      .data(stackedData)
      .enter()
      .append("path")
      .style("fill", function(d) { console.log(d.key) ; return color(d.key); })
      .attr("d", d3.area())
      .x(function(d, i) { return x(d.data.Period); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[1]); });
//      .append("rect")
//      .attr("class", "bar")
//      .attr("x", d => xBandScale(d.YTDValue))
//      .attr("y", d => yLinearScale(d.Period))
//      .attr("width", xBandScale.bandwidth())
//      .attr("height", d => chartHeight - yLinearScale(d.Period));

});
});
