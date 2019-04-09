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