var parseTime = d3.timeParse("%Y-%m");

function buildBar(bardate, hsc, renderloc) {//renderloc

  var svgWidth = 900
  var svgHeight = 500

//Create SVG

// axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
// var	parseDate = d3.time.format("%Y-%m").parse;
// var parseTime = d3.timeParse("%d-%b-%y");

var container = d3.selectAll(renderloc)
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

var x = d3.scaleBand().rangeRound([0, width], .5).padding(.1);

var y=  d3.scaleLinear().rangeRound([height, 0]);
// var x = d3.scaleBand()
//     .range([0, width]);
// var y = d3.scaleLinear()
//     .range([height, 0]);
              

d3.json("/imports/bars/"+bardate+"/"+hsc).then(function(data) {
  //  console.log(data)
      // parse data
      // data.forEach(function(d){
      //     d.total = +d.total;
      //     d.month = d.Period
      // })

      // d3.select("#search")
      // .on("keyup", function (event){
      //   if (event.keyCode === 13){}
      //   var search_data = data,
      //     text= this.value.trim();

      //   var searchResults = search_data.map(function(r) {
      //     var regex = new RegExp("^"+ text+ ".*");
      //     if (regex.test(r.Description)) {
      //       return regex.exec(r.Description)[0]
      //     }
      //   })
      console.log(data)
      // searchedData = data.filter(d => d.Description == searchResults)
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

 
        
      })  

      
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

function buildGrouped(bardate, hsc, renderloc) {//renderloc

  var svgWidth = 900
  var svgHeight = 500

//Create SVG

// axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
// var	parseDate = d3.time.format("%Y-%m").parse;
// var parseTime = d3.timeParse("%d-%b-%y");

var container = d3.selectAll(renderloc)
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

var x = d3.scaleBand().rangeRound([0, width], .5).padding(.1);

var y=  d3.scaleLinear().rangeRound([height, 0]);
// var x = d3.scaleBand()
//     .range([0, width]);
// var y = d3.scaleLinear()
//     .range([height, 0]);
              

d3.json("/imports/bars/"+bardate+"/"+hsc).then(function(data) {
  //  console.log(data)
      // parse data
      // data.forEach(function(d){
      //     d.total = +d.total;
      //     d.month = d.Period
      // })

      // d3.select("#search")
      // .on("keyup", function (event){
      //   if (event.keyCode === 13){}
      //   var search_data = data,
      //     text= this.value.trim();

      //   var searchResults = search_data.map(function(r) {
      //     var regex = new RegExp("^"+ text+ ".*");
      //     if (regex.test(r.Description)) {
      //       return regex.exec(r.Description)[0]
      //     }
      //   })
      console.log(data)
      // searchedData = data.filter(d => d.Description == searchResults)
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

 
        
      })  

      
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
function buildTimeseries(){
var url1 =  "/exports/total"
var url2 =  "/imports/total"
TexportMoValue=[]
TexportPeriod=[]
TimportMoValue=[]
TimportPeriod=[]

d3.json(url1).then(function(data) {
    data.forEach(d => {
      
      TexportMoValue.push(+d.MoValue),
      TexportPeriod.push(d.Period)
    })
        });

d3.json(url2).then(function(data) {
    data.forEach(d => {
    //   console.log(d.MoValue);
      TimportMoValue.push(+d.MoValue),
      TimportPeriod.push(d.Period)
    }) 
});  

console.log(TimportMoValue);
console.log(TimportPeriod);

var bar1 = {
  x: TexportPeriod,
  y: TexportMoValue,
  type: 'bar',
  name: '$ Export',
  // marker: {
  //   color: 'rgb(0,0,255)',
  //   opacity: 0.7,
  // }
};

var bar2 = {
  x: TimportPeriod,
  y: TimportMoValue,
  type: 'bar',
  name: '$ Import',
  // marker: {
  //   color: 'rgb(255,0,0)',
  //   opacity: 0.5
  // }
};
console.log(TexportPeriod);
console.log(TexportMoValue);
var data = [bar1, bar2];
console.log(data)
var layout = {
  title: 'US Export & Import',
  "titlefont": {
    "size": 15,
  },
  xaxis: {
    tickangle: -45,
    bargap: 0.001,
  },
  
  barmode: 'stack'
};

Plotly.newPlot('timeseries', data, layout);
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
  
      var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
 
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
        .duration(2000)
        .attrTween("d", tweenPie);
          
    // append text
    g.append("text")    
      .transition()
        .ease(d3.easeLinear)
        .duration(2000)
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")        
        .text(function(d) { return d.data.HSC; })
                     
  });

  // Helper function for animation of pie chart and donut chart
  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function(t) { return arc(i(t)); };
  }
  
  
  };
  function clicker(d){
    var svg = d3.select("#bars");
    svg.selectAll("svg").remove()
    buildBar("2018", d.data.HSC, "#bars")

  console.log(d)     
  }
 // BAR OF TOTAL IMPORTS AND EXPORTS


  function make_treemap(){
    d3.json("/imports/tree/2018").then(function(data) {
      console.log(data)
     
   var vizio = d3plus.viz()
    .container(d3.select("#plots"))  // container DIV to hold the visualization
    .data(data)  // data to use with the visualization
    .type("tree_map")   // visualization type
    .id(HSC)         // key for which our data is unique on    
    .size(total)      // sizing of blocks
    .draw()             // finally, draw the visualization!
   
    })

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
  // buildTimeseries()
}

init()
