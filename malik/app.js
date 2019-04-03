// margin
var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 600 - margin.right - margin.left,
    height = 600 - margin.top - margin.bottom,
    radius = 200;


var color = d3.scaleOrdinal()
.range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2","#004d99","0099FF","00CCFF"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// donut chart arc
var arc2 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 10);

// arc for the labels position
var labelArc = d3.arc()
    .outerRadius(0)
    .innerRadius(radius+150);

// generate pie chart and donut chart
var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.total; });

// define the svg for pie chart
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// define the svg 2nd chart
var svg2 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// import data 
d3.csv("data_2015_export.csv", function(error, data) {
  if (error) throw error;
    
    // parse data
    data.forEach(function(d) {
        d.total = +d.total;
        d.Commodity = d.HSC;
    })

  // "g element is a container used to group other SVG elements"
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  // append path 
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.Commodity); })
    // transition 
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenPie);
        
  // append text
  g.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.Commodity; });
    

    // "g element is a container used to group other SVG elements"
//   var g2 = svg2.selectAll(".arc2")
//       .data(pie(data))
//     .enter().append("g")
//       .attr("class", "arc2");

//    // append path 
//   g2.append("path")
//       .attr("d", arc2)
//       .style("fill", function(d) { return color(d.data.Commodity); })
//     .transition()
//       .ease(d3.easeLinear)
//       .duration(2000)
//       .attrTween("d", tweenDonut);
        
//    // append text
//   g2.append("text")
//     .transition()
//       .ease(d3.easeLinear)
//       .duration(2000)
//     .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
//       .attr("dy", ".35em")
//       .text(function(d) { return d.data.Commodity; });
    
});

// Helper function for animation of pie chart and donut chart
function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

// function tweenDonut(b) {
//   b.innerRadius = 0;
//   var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
//   return function(t) { return arc2(i(t)); };
// }
