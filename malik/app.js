

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
margin1 = {top: 20, right: 100, bottom: 50, left: 100},
width = 960 - margin1.left - margin1.right,
height = 500 - margin1.top - margin1.bottom,
g1 = svg2.append("g").attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
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
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .attr("font-weight", "bold")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend.append("rect")
      .attr("x", width1 - 10)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);
  legend.append("text")
      .attr("x", width1 - 18)
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
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .attr("font-weight", "bold")
    .selectAll("g")
    .data(keys1.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend1.append("rect")
      .attr("x", width + 55)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z1);
  legend1.append("text")
      .attr("x", width +48)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
      
});
    