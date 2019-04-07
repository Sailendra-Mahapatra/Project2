
function buildBar(bardate) {//renderloc

  var svgWidth = 900
  var svgHeight = 500

//Create SVG

// axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
// var	parseDate = d3.time.format("%Y-%m").parse;
// var parseTime = d3.timeParse("%d-%b-%y");

var container = d3.selectAll("#bars")
.append("svg")
.attr("width", 500)
.attr("height", 400)
              

var svg = d3.select("svg"),
margin= {
  top: 30,
   right: 20, 
   bottom: 30, 
   left: 50},
width = container.attr("width") - margin.left - margin.right,
height = container.attr("height") -  margin.top - margin.bottom,
g = container.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var parseTime = d3.timeParse("%Y-%m");

var x = d3.scaleBand().rangeRound([0, width], .5).padding(.1);

var y = d3.scaleLinear().rangeRound([height, 0]);
// var x = d3.scaleBand()
//     .range([0, width]);
// var y = d3.scaleLinear()
//     .range([height, 0]);
              

d3.json("/imports/bars/"+bardate+"/3915").then(function(data) {
  //  console.log(data)
      // parse data
      // data.forEach(function(d){
      //     d.total = +d.total;
      //     d.month = d.Period
      // })
      console.log(data)

      x.domain(data.map(function(d) { return parseTime(d.Period)}));
      y.domain([0, d3.max(data, function(d){return d.MoValue})])

      g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")))
  
      g.append("g")
      .call(d3.axisLeft(y)
          .ticks(20)
          .tickFormat(d3.formatPrefix(".1", 1e6)))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
       .attr("x", -5)
      .attr("y", -15)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Monthly Trade Value");
  
      g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
          return x(parseTime(d.Period));
      })
      .attr("y", function (d) {
          return y(Number(d.MoValue));
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
          return  height-y(Number(d.MoValue));
      });
  });
}



function buildPie(piedate, inout, renderloc){
  // margin
  var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 400 - margin.right - margin.left,
      height = 400 - margin.top - margin.bottom,
      radius = 150;
  
  
  var color = d3.scaleOrdinal()
  .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2","#004d99","#003366","#001a33"]);
  
  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
  
  // arc for the labels position
  var labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
  
  // generate pie chart and donut chart
  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.total; });
  // define the svg for pie chart
  var svg = d3.select(renderloc).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  // import data 
  d3.json(inout+"/pie/"+piedate).then(function(data) {
    //  console.log(data)
      // parse data
      data.forEach(function(d){
          d.total = +d.total;
          d.HSC = d.HSC;
          d.Description = d.Description
          d.data 
        //  console.log(d.total)
      });
     
    // "g element is a container used to group other SVG elements"
    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");
  
    // append path 
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.HSC); })
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
        .text(function(d) { return d.data.Description; });
      
  
      
  });
  
  // Helper function for animation of pie chart and donut chart
  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function(t) { return arc(i(t)); };
  }
  
  
  };
  

function optionChanged(newdate) {
  console.log(newdate)

  // //   // Fetch new data each time a new sample is selected
  buildPie(newdate, "imports", "#import-pie")
  buildPie(newdate, "exports", "#export-pie")
  buildBar(newdate)

  console.log(newdate)

  }

function init(){
  buildPie("2018", "imports", "#import-pie")
  buildPie("2018", "exports", "#export-pie")
  buildBar("2018")

}

init()
