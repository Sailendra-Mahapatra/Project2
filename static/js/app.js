var parseTime = d3.timeParse("%Y-%m");

var tooltip = d3.select("body")
.append("div")
.attr("class", "tooltip")
.style("opacity", 0);       
function clicker(d){
  var svg = d3.select("#bars");
  svg.selectAll("svg").remove()
  buildBar("2018", d.data.HSC, "#bars")

console.log(d)     
}

function buildSelector(date) {
d3.json("/imports/bars/"+date).then(function(response){
  selection= d3.select("#filter")
  selection.html("");
  var table = slection
                .append("table")
                .append("tbody")
Object.entries(respose).forEach(([key, value]) => {
    var row = table.append("tr")
    row.append("td").text(key, ": ")
    row.append("td").text(value)
});              
})
}
function buildBar(bardate, hsc, renderloc) {//renderloc

  var svgWidth = 900
  var svgHeight = 500

//Create SVG

// axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
// var	parseDate = d3.time.format("%Y-%m").parse;
// var parseTime = d3.timeParse("%d-%b-%y");

var container = d3.selectAll(renderloc)
.append("svg")
.attr("width", 600)
.attr("height", 600)
              

var svg = d3.select("svg"),
margin= {
  top: 30,
   right: 20, 
   bottom: 30, 
   left: 50},
width = container.attr("width") - margin.left - margin.right,
height = container.attr("height") -  margin.top - margin.bottom,
g = container.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().rangeRound([0, width], .5).padding(.1);

var y=  d3.scaleLinear().rangeRound([height, 0]);
// var x = d3.scaleBand()
//     .range([0, width]);
// var y = d3.scaleLinear()
//     .range([height, 0]);
  

d3.json("/imports/bars/"+bardate+"/"+hsc).then(function(data) {
  console.log(data)
console.log(bardate)
  if (data != null){
    d3.json("/exports/bars/"+bardate+"/"+hsc).then(function(data){
console.log()

      x.domain(data.map(function(d) { return parseTime(d.Period)}));
      y.domain([0, d3.max(data, function(d){return d.MoValue})])
              
      g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")))
      data.forEach(function(d){
        Period = d.Period
        Description = d.Description
      });
      g.append("g")
      .call(d3.axisLeft(y)
          .ticks(20)
          .tickFormat(d3.formatPrefix(".1", 1e6)))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
       .attr("x", -100)
      .attr("y", -50)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .text("Monthly Trade Value")
     
      g.append("text")
        .attr("x", (width /2))
        .attr("y", 0-(margin.top/2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        // .style("text-decoration", "underline")
        .html("Commodity: "+Description+"<BR>  "+ (Period))

      g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .transition().duration(3000)
      .delay( function(d,i) { return i * 200; })
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
      })
      .on("mouseover", function(d){tooltip.transition()
        .duration(200)
        .style("opacity", 9);
        tooltip.html("Monthly Value:<BR><strong>$ "+(d.MoValue/1e6).toLocaleString('en', {useGrouping:true})+" Million")
          .style("left", (d3.event.pageX)+ "px")
          .style("top", (d3.event.pageY - 100) + "px")})
          .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
      });
    });  
  };
      })  ;

      function optionChanged(bardate){

        var svgWidth = 900
        var svgHeight = 500
      
      //Create SVG
      
      // axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
      // var	parseDate = d3.time.format("%Y-%m").parse;
      // var parseTime = d3.timeParse("%d-%b-%y");
      
      // var container = d3.selectAll("#bars")
      // .append("svg")
      // .attr("width", 500)
      // .attr("height", 400)
                    
      
      // var svg = d3.select("svg"),
      // margin= {
      //   top: 30,
      //    right: 20, 
      //    bottom: 30, 
      //    left: 50},
      // width = container.attr("width") - margin.left - margin.right,
      // height = container.attr("height") -  margin.top - margin.bottom,
      // g = container.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      // var parseTime = d3.timeParse("%Y-%m");
      //   var x = d3.scaleBand().rangeRound([0, width], .5).padding(.1);
      
      // var y=  d3.scaleLinear().rangeRound([height, 0]);
        d3.json("/imports/bars/"+bardate+"/3915").then(function(data) {
      
            return data   
      })
      return data
      }    
}

function buildGrouped() {// bardate, hsc, renderloc
//   var container = d3.selectAll("#timeseries")
//   .append("svg")
//   .attr("width", 500)
//   .attr("height", 400)
//   var svg = d3.select("svg"),
//   margin = {top: 20, right: 20, bottom: 50, left: 50},
//   width1 = container.attr("width") - margin.left - margin.right,
//   height1 = container.attr("height") - margin.top - margin.bottom,
//   g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// var x0 = d3.scaleBand()
//   .rangeRound([0, width1])
//   .paddingInner(0.3);
// var x1 = d3.scaleBand()
//   .padding(0.05);
// var y = d3.scaleLinear()
//   .rangeRound([height1, 0]);

// monthly chart
// var svg2 = d3.select(".month"),
// margin1 = {top: 20, right: 100, bottom: 50, left: 100},
// width = 960 - margin1.left - margin1.right,
// height = 500 - margin1.top - margin1.bottom,
// g1 = svg2.append("g").attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
// var x0 = d3.scaleBand()
// .rangeRound([0, width])
// .paddingInner(0.3);
// var x1 = d3.scaleBand()
// .padding(0.05);
// var y = d3.scaleLinear()
// .rangeRound([height, 0]);
// var z = d3.scaleOrdinal()
// .range(["#4cb2cc", "#b8a3ff","red", "#808080"])

// var y=  d3.scaleLinear().rangeRound([height, 0]);
// var x = d3.scaleBand()
//     .range([0, width]);
// var y = d3.scaleLinear()
//     .range([height, 0]);

// d3.json("imports/grouped/8528").then(function(data) {
//   var categories = function(d){return +d.MoValue}
//   console.log(data)
//   console.log(categories)

// x0.domain(data.map(function(d) { return d.year; }));
// x1.domain(keys).rangeRound([0, x0.bandwidth()]);
// y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
// g.append("g")
//   .selectAll("g")
//   .data(data)
//   .enter().append("g")
//     .attr("transform", function(d) { return "translate(" + x0(d.year) + ",0)"; })
//   .selectAll("rect")
//   .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
//   .enter().append("rect")
//   .transition().duration(3000)
//   .delay( function(d,i) { return i * 200; })
//     .attr("x", function(d) { return x1(d.key); })
//     .attr("y", function(d) { return y(d.value); })
//     .attr("width", x1.bandwidth())
//     .attr("height", function(d) { return height1 - y(d.value); })
//     .attr("fill", function(d) { return z(d.key); });
// g.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(0," + height1 + ")")
//     .call(d3.axisBottom(x0));
// g.append("g")
//     .attr("class", "axis")
//     .call(d3.axisLeft(y).ticks(null, "s"))
//   .append("text")
//     .attr("x", 2)
//     .attr("y", y(y.ticks().pop()) + 0.5)
//     .attr("dy", "0.32em")
//     .attr("fill", "#000")
//     .attr("font-weight", "bold")
//     .attr("text-anchor", "start")
//     .text("US Trade in Dollars");
// var legend = g.append("g")
//     .attr("font-family", "sans-serif")
//     .attr("font-size", 12)
//     .attr("text-anchor", "end")
//     .attr("font-weight", "bold")
//   .selectAll("g")
//   .data(keys.slice().reverse())
//   .enter().append("g")
//     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
// legend.append("rect")
//     .attr("x", width1 - 10)
//     .attr("width", 19)
//     .attr("height", 19)
//     .attr("fill", z);
// legend.append("text")
//     .attr("x", width1 - 18)
//     .attr("y", 9.5)
//     .attr("dy", "0.32em")
//     .text(function(d) { return d; });
    
// });

// d3.csv("../data/monthly_import_export.csv", function(d, i, columns) {
// for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
// return d;
// }, function(error, Data) {
// if (error) throw error;
// var keys1 = Data.columns.slice(1);
// x2.domain(Data.map(function(d) { return d.month; }));
// x3.domain(keys1).rangeRound([0, x2.bandwidth()]);
// y1.domain([0, d3.max(Data, function(d) { return d3.max(keys1, function(key) { return d[key]; }); })]).nice();
// g1.append("g")
//   .selectAll("g")
//   .data(Data)
//   .enter().append("g")
//     .attr("transform", function(d) { return "translate(" + x2(d.month) + ",0)"; })
//   .selectAll("rect")
//   .data(function(d) { return keys1.map(function(key) { return {key: key, value: d[key]}; }); })
//   .enter().append("rect")
//   .transition().duration(3000)
//   .delay( function(d,i) { return i * 200; })
//     .attr("x", function(d) { return x3(d.key); })
//     .attr("y", function(d) { return y1(d.value); })
//     .attr("width", x3.bandwidth())
//     .attr("height", function(d) { return height - y1(d.value); })
//     .attr("fill", function(d) { return z1(d.key); });
// g1.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x2));
// g1.append("g")
//     .attr("class", "axis")
//     .call(d3.axisLeft(y1).ticks(null, "s"))
//   .append("text")
//     .attr("x", 2)
//     .attr("y", y1(y1.ticks().pop()) + 0.5)
//     .attr("dy", "0.32em")
//     .attr("fill", "#000")
//     .attr("font-weight", "bold")
//     .attr("text-anchor", "start")
//     .text("US Trade in Dollars");
// var legend1 = g1.append("g")
//     .attr("font-family", "sans-serif")
//     .attr("font-size", 12)
//     .attr("text-anchor", "end")
//     .attr("font-weight", "bold")
//   .selectAll("g")
//   .data(keys1.slice().reverse())
//   .enter().append("g")
//     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
// legend1.append("rect")
//     .attr("x", width + 55)
//     .attr("width", 19)
//     .attr("height", 19)
//     .attr("fill", z1);
// legend1.append("text")
//     .attr("x", width +48)
//     .attr("y", 9.5)
//     .attr("dy", "0.32em")
//     .text(function(d) { return d; });
    
// });
  
}      

function buildPie(piedate, inout, renderloc){
  // margin
  var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 400 - margin.right - margin.left,
      height = 400 - margin.top - margin.bottom,
      radius = 150;
  
  var color = d3.scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])
  
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
  
 
  // svg.call(tip);
  // import data 
  d3.json(inout+"/pie/"+piedate).then(function(data) {
      d3.selectAll("input")
        .on("change", update)
        // console.log(data)

      data.forEach(function(d){
          d.total = d.total;
          d.HSC = d.HSC;
          d.Description = d.Description
          d.data 
      });
     function update(piedate = this.value){
        console.log(piedate)}
//Pie Slices
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on("mouseover", function(d){tooltip.transition()
                                            .duration(200)
                                            .style("opacity", 9);
                                            tooltip.html("Products:<strong> "+d.data.Description+"</strong></BR>Value:<strong> $"+(d.data.total/1e9).toLocaleString('en', {useGrouping:true})+" Billion USD</strong>")
                                              .style("left", (d3.event.pageX)+ "px")
                                              .style("top", (d3.event.pageY - 100) + "px")})
	                                            .on("mouseout", function(d) {
                                            tooltip.transition()
                                                .duration(500)
                                                .style("opacity", 0);
                                          })
        
    // append path 
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.HSC); })
        .on("click",function(d) { clicker(d) })

      // transition 
      .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .attrTween("d", tweenPie);
          
    // append text
    g.append("text")    
      .transition()
        .ease(d3.easeLinear)
        .duration(2000)
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")        
        .text(function(d) { return (d.data.total/1e9).toLocaleString('en', {useGrouping:true})+" Billion" })
                     
  });

  // Helper function for animation of pie chart and donut chart
  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function(t) { return arc(i(t)); };
  }
  
  
  };

 // BAR OF TOTAL IMPORTS AND EXPORTS
 function totalBuild(){
 var svgWidth = 900
 var svgHeight = 500


axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
var	parseDate = d3.time.format("%Y-%m").parse;
var parseTime = d3.timeParse("%d-%b-%y");
var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];

var container = d3.selectAll(renderloc)
.append("svg")
.attr("width", 800)
.attr("height", 600)
             


var svg = d3.select("svg"),
margin= {
 top: 30,
  right: 20, 
  bottom: 30, 
  left: 50},
width = container.attr("width") - margin.left - margin.right,
height = container.attr("height") -  margin.top - margin.bottom,
g = container.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().rangeRound([0, width], .5).padding(.1);

var y=  d3.scaleLinear().rangeRound([height, 0]);

d3.json("/imports/bars/totals").then(function(data) {
  d3.json("/imports/bars/totals").then(function(data){
  x.domain(data.map(function(d) { return parseTime(d.Period)}));
  y.domain([0, d3.max(data, function(d){return d.MoValue})])
console.log(d3.max(data, function(d){return d.MoValue}))
          
  g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")))
  data.forEach(function(d){

    Description = d.Description
    console.log(data)
  });
  g.append("g")
  .call(d3.axisLeft(y)
      .ticks(20)
      .tickFormat(d3.formatPrefix(".1", 1e6)))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
   .attr("x", -100)
  .attr("y", -50)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .style("font-size", "12px")
  .text("Monthly Trade Value")
 
  g.append("text")
    .attr("x", (width /2))
    .attr("y", 0-(margin.top/2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Commodity: "+Description)

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
  })
  .on("mouseover", function(d){tooltip.transition()
    .duration(200)
    .style("opacity", 9);
    tooltip.html("Monthly Value:<BR><strong>$ "+(d.MoValue/1e6).toLocaleString('en', {useGrouping:true})+" Million")
      .style("left", (d3.event.pageX)+ "px")
      .style("top", (d3.event.pageY - 100) + "px")})
      .on("mouseout", function(d) {
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
  });
});
})
 }

  function make_treemap(){
  //   d3.json("/imports/tree/2018").then(function(data) {
  //     console.log(data)
     
  //  var vizio = d3plus.viz()
  //   .container(d3.select("#plots"))  // container DIV to hold the visualization
  //   .data(data)  // data to use with the visualization
  //   .type("tree_map")   // visualization type
  //   .id(HSC)         // key for which our data is unique on    
  //   .size(total)      // sizing of blocks
  //   .draw()             // finally, draw the visualization!
   
  //   })

  }

function optionChanged(newdate) {
  var svg = d3.select("#bars");
  var exportPie = d3.select("#export-pie")
  var importPie = d3.select("#import-pie")
  svg.selectAll("svg").remove()
  exportPie.selectAll("svg").remove()
  importPie.selectAll("svg").remove()

  console.log(newdate)
        // CLEAR THE OLD GRAPHS!!!!
  // //   // Fetch new data each time a new sample is selected
  buildPie(newdate, "imports", "#import-pie")
  buildPie(newdate, "exports", "#export-pie")
  buildBar(newdate, "3915", "#bars")
  console.log(newdate)

  }

  
function init(){
  buildPie("2018", "imports", "#import-pie")
  buildPie("2018", "exports", "#export-pie")
  buildBar("2018", "3915", "#bars")
  buildGrouped()

}

init()
