
function buildBar(bardate, hsc, renderloc, optionChanged) {//renderloc

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
var parseTime = d3.timeParse("%Y-%m");

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
        var x = d3.scaleBand().rangeRound([0, width], .5).padding(.1);

      var y=  d3.scaleLinear().rangeRound([height, 0]);
        d3.json("/imports/bars/"+bardate+"/3915").then(function(data) {


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
   
} 
 


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
  function buildS(){
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
   }
 // BAR OF TOTAL IMPORTS AND EXPORTS
function malikBuild() {
  var totalImp = [];
  var totalExp = [];
  var bothData = [];
  
  d3.json("/imports/main/bars",function(data) {
      data.forEach(d => {
          bothData.push(d)
          
          if (d.type === "import") {
              totalImp.push(d)
          }
          if(d.type === "export"){
              totalExp.push(d)
          }
          
      });
  })
      console.log(totalExp);
      
  // functions for toggling between data
  function change(value){
  
    if(value === 'import'){
      update(totalImp);
    }else if(value === 'export'){
      update(totalExp);
    }else{
      update(bothData);
    }
  }
  
  function update(data){
    //set domain for the x axis
    xChart.domain(["jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]);
    //set domain for y axis
      yChart.domain( [0, d3.max(data, function(d){ return +d.total; })] );
      
      //get the width of each bar 
    var barWidth = width / data.length;
    
    //select all bars on the graph, take them out, and exit the previous data set. 
    //then you can add/enter the new data set
    var bars = svg.selectAll(".bar")
            .remove()
            .exit()
            .data(data)		
    //now actually give each rectangle the corresponding data
    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i){ return i * barWidth + 1 })
      .attr("y", function(d){ return yChart( d.total); })
      .attr("height", function(d){ return height - yChart(d.total); })
      .attr("width", barWidth - 1)
      .attr("fill", function(d){ 
        if(d.type === "import"){
          return "rgb(251,180,174)";
        }else{
          return "rgb(179,205,227)";
        }
          });
          //left axis
    svg.select('.y')
      .call(yAxis)
  //bottom axis
  svg.select('.xAxis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d){
            return "rotate(-65)";
        });
        
  }//end update
  
  //set up svg
  var margin = {top: 20, right: 20, bottom: 95, left: 50};
  var width = 800;
  var height = 500;
  
  var svg = d3.select("#bars")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var xChart = d3.scaleBand()
          .range([0, width]);
          
  var yChart = d3.scaleLinear()
          .range([height, 0]);
  
  var xAxis = d3.axisBottom(xChart);
  var yAxis = d3.axisLeft(yChart);
  
  //set up axes
  //left axis
  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  
  //bottom axis
  svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d){
        return "rotate(-65)";
    });
  
  //add labels
  svg
  .append("text")
  .attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
  .text("% of total watch time");
  
  svg
  .append("text")
  .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
  .text("age group");
  
  //use bothData to begin with
  update(bothData);
  }

// function optionChanged(newdate) {
//   console.log(newdate)

//   // //   // Fetch new data each time a new sample is selected
//   buildPie(newdate, "imports", "#import-pie")
//   buildPie(newdate, "exports", "#export-pie")
//   buildBar("2018", "3915", "#bars")
//   console.log(newdate)

//   }

function init(){
  buildPie("2018", "imports", "#import-pie")
  buildPie("2018", "exports", "#export-pie")
  buildBar("2018", "3915", "#bars")
  buildS()
}

init()
