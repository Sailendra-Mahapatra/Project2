function buildBar(bardate) {//renderloc

    var svgWidth = 900
    var svgHeight = 500

//Create SVG

// axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
// var	parseDate = d3.time.format("%Y-%m").parse;
// var parseTime = d3.timeParse("%d-%b-%y");

var container = d3.selectAll("#bars")

var svg = container.append("svg"),
margin= {
    top: 30,
     right: 20, 
     bottom: 30, 
     left: 50},
width = svg.attr("width") - svgWidth ,
height = svg.attr("height") - svgHeight,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var parseTime = d3.timeParse("%Y-%m");
  
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);

var y = d3.scaleLinear().rangeRound([height, 0]);
// var x = d3.scaleBand()
//     .range([0, width]);
// var y = d3.scaleLinear()
//     .range([height, 0]);
                

d3.json("/imports/bars/2018").then(function(data) {
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
        .call(d3.axisBottom(x))
    
        g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
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
            return  y(Number(d.MoValue)) + 100;
        });
    });
}
buildBar(2016)


// svg.selectAll(".bar")
// .data(data)
// .enter()
// .append("rect")
// .attr("class", "bar")
// .attr("x", function(d){ return x(d.Period)})
// .attr("width", x.bandwidth())
// .attr("y", function(d){return y(d.total)})
// .attr("height", function(d) { return y(d.total)})

// svg.append("g")
// .attr("transform", "translate(0,"+height+")")
// .call(d3.axisBottom(x));

// svg.append("g")
// .call(d3.axisLeft(y))

// OLD CODE
// margin
var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 700 - margin.right - margin.left,
    height = 700 - margin.top - margin.bottom,
    radius = 250;


var color = d3.scaleOrdinal()
.range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2","#004d99","#003366","#001a33"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// donut chart arc
// var arc2 = d3.arc()
//     .outerRadius(radius - 10)
//     .innerRadius(radius - 70);

// arc for the labels position
var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

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

// define the svg donut chart
// var svg2 = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//   .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// import data 
d3.json("/pie/data_2015.csv", function(error, data) {
  if (error) throw error;
    
    // parse data
    data.forEach(function(d) {
        d.total = +d.total;
        d.Commodity = d.Commodity;
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
