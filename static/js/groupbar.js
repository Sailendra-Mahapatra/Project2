
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var x0 = d3.scaleOrdinal()
//     .rangeRoundBands([0, width], .1);

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.3);

var x1 = d3.scaleBand()
    .padding(0.05)


var y = d3.scaleLinear()
     .rangeRound([height, 0]);

var xAxis = d3.axisBottom(x0)
    .tickSize(0)
    // .orient("bottom");

var yAxis = d3.axisLeft(y)
    // .orient("left");

    var color = d3.scaleOrdinal()
    .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

var svg = d3.select('#plot').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var url = "/imports/bars/2015/3915"

d3.json(url).then(function(data) {
    var month = data.map(function(d) { return d.Period; });
    // var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    console.log(month);
    var value = data.map(function(d) { return d.MoValue; });
    console.log(value);

    x0.domain(month);
    x1.domain(value).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, d => d.MoValue)])

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    
    svg.append("g")
    .attr("class", "y axis")
    .style('opacity','0')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .style('font-weight','bold')
    .text("Value");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = svg.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.Period) + ",0)"; });

        slice.selectAll("rect")
        .data(function(d) { return d.MoValue; })
        .enter().append("rect")
        .attr("width", x1.bandwidth())
        .attr("x", function(d) { return x1(d.MoValue); })
        .style("fill", function(d) { return color(d.MoValue) })
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d.MoValue)).darker(2));
        })
        // .on("mouseout", function(d) {
        //     d3.select(this).style("fill", color(d.MoValue));
        // });
    
    });
        
    




function groupBar(bardate) {//renderloc

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
  
  var y=  d3.scaleLinear().rangeRound([height, 0]);
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
  
        d3.select("#search")
        .on("keyup", function (){
          var search_data = data,
            text= this.value.trim();
          var searchResults = search_data.map(function(r) {
            var regex = new RegExp("^"+ text+ ".*");
            if (regex.test(r.Description)) {
              return regex.exec(r.Description)[0]
            }
        console.log(data)
        searchedData = data.filter(d => d.Description == searchResults)
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
        })  
    });
  }
